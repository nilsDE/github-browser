import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import debounce from 'lodash.debounce';
import RepoList from './components/list/RepoList';
import RepoDetails from './components/details/RepoDetails';
import { Repository } from './components/list/repo.model';
import Header from './components/header/Header';
import { getPublicRepos, getReposBySearchValue } from './app.service';
import { extractNextLink } from './app.helpers';

import './app.css';

const App: React.FC = () => {
    const componentUnmounted = useRef(false);
    const nextLinkRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [repos, setRepos] = useState<Repository[]>([]);

    const getRepos = async (initialPage = false) => {
        setIsLoading(true);
        const {
            data,
            hasError,
            headerLinks,
        } = await getPublicRepos(initialPage, nextLinkRef.current);
        if (!componentUnmounted.current) {
            setRepos(data);
            setIsError(hasError);
            if (headerLinks) nextLinkRef.current = extractNextLink(headerLinks);
            setIsLoading(false);
        }
    };

    const getSearchedRepos = async (search: string) => {
        try {
            setIsLoading(true);
            const { data, hasError } = await getReposBySearchValue(search);
            if (!componentUnmounted.current) {
                setRepos(data);
                setIsError(hasError);
                nextLinkRef.current = '';
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

    useEffect(() => () => {
        componentUnmounted.current = true;
    }, []);

    const debounced = useRef(debounce((search) => getSearchedRepos(search), 350));

    useEffect(() => {
        if (!searchString) {
            getRepos();
        } else {
            debounced.current(searchString);
        }
    }, [searchString]);

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
                                isSearch={!!searchString}
                                repos={repos}
                                searchString={searchString}
                                setSearchString={setSearchString}
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
