import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepoList from './components/list/RepoList';
import RepoDetails from './components/details/RepoDetails';
import { Repository } from './components/list/repo.model';
import Header from './components/header/Header';
import axiosInstance from './axios';

import './app.css';

const App: React.FC = () => {
    const componentUnmounted = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [nextLink, setNextLink] = useState('');
    const [repos, setRepos] = useState<Repository[]>([]);

    const getRepos = async (initialPage = false) => {
        try {
            setIsLoading(true);
            const url = initialPage ? 'repositories' : `repositories${nextLink ? `?since=${nextLink}` : ''}`;
            const res = await axiosInstance.get(url);
            if (!componentUnmounted.current) {
                setRepos(res.data);
                const linkHeader = res.headers.link;
                const links = linkHeader.split(', ');
                links.forEach((link) => {
                    if (link.includes('rel="next"')) {
                        const newNextLink = link.match(/(&|\?)since=(.*?)(>|&)/)?.[2] || '';
                        setNextLink(newNextLink);
                    }
                });
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const getInitialPage = (isReload = false) => {
        if (isReload) setIsError(false);
        getRepos(true);
    };

    const getNextPage = () => {
        getRepos();
    };

    useEffect(() => {
        getRepos();
        return () => {
            componentUnmounted.current = true;
        };
    }, []);

    return (
        <div id='GithubBrowser'>
            <Router>
                <Header />
                <Routes>
                    <Route path='/:user/:repo' element={<RepoDetails />} />
                    <Route
                        path='/'
                        element={(
                            <RepoList
                                isLoading={isLoading}
                                isError={isError}
                                repos={repos}
                                getInitialPage={getInitialPage}
                                getNextPage={getNextPage}
                            />
                        )}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
