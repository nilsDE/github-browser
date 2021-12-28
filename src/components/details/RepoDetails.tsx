/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { RepositoryDetails } from './repo-details.model';
import Error from '../error/Error';

import './repo-details.css';

const RepoDetails: React.FC = () => {
    const { user, repo } = useParams();
    const navigate = useNavigate();
    const componentUnmounted = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [repoDetails, setRepoDetails] = useState<RepositoryDetails>();
    const [otherRepos, setOtherRepos] = useState<RepositoryDetails[]>();

    const getReposOfUser = async (repoToGet = repo) => {
        try {
            setIsLoading(true);
            const [currRepo, allRepos] = await Promise.all([
                axiosInstance.get(`repos/${user}/${repoToGet}`),
                axiosInstance.get(`users/${user}/repos?per_page=10`),
            ]);

            if (!componentUnmounted.current) {
                setRepoDetails(currRepo.data);
                setOtherRepos(allRepos.data);
                setIsLoading(false);
            }
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getReposOfUser();

        return () => {
            componentUnmounted.current = true;
        };
    }, []);

    const goBack = () => navigate('/');

    if (isError) {
        return (
            <div className='mx-2 mt-4'>
                <Error
                    callback={goBack}
                    btnText='Back'
                    msg='The requested repo could not be loaded. Use the button below to return to the main screen.'
                />
            </div>
        );
    }

    return (
        <div className='mx-2 mt-4'>
            <Button className='mb-4' variant='secondary' onClick={goBack}>
                {isLoading ? 'Loading...' : 'Back'}
            </Button>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <Card>
                    <Card.Header as='h5'>Repository Details</Card.Header>
                    <Card.Body>
                        <div className='d-flex flex-column flex-sm-row'>
                            <div className='d-flex flex-column align-items-center mb-3 mb-sm-0'>
                                <Image className='GithubBrowser-avatar mb-1' src={repoDetails?.owner.avatar_url} roundedCircle />
                                <span className='font-italic text-nowrap'>{`Created by: ${repoDetails?.owner.login}`}</span>
                            </div>
                            <div className='d-flex flex-column ms-sm-5'>
                                <h1>{repoDetails?.name}</h1>
                                <p>{repoDetails?.description}</p>
                                <span className='mb-1'>
                                    <strong>Written in: </strong>
                                    {repoDetails?.language}
                                </span>
                                <span className='mb-1'>
                                    <strong>Created at: </strong>
                                    {new Date(repoDetails?.created_at || '').toDateString()}
                                </span>
                                <span className='mb-1'>
                                    <strong>Is archived: </strong>
                                    {repoDetails?.archived ? 'Yes' : 'No'}
                                </span>
                                <span className='mb-1'>
                                    <strong># of open issues: </strong>
                                    {repoDetails?.open_issues_count || 0}
                                </span>
                                <span className='mb-1'>
                                    <strong># of forks: </strong>
                                    {repoDetails?.forks_count || 0}
                                </span>
                                <span className='mb-1'>
                                    <strong># of watchers: </strong>
                                    {repoDetails?.watchers_count || 0}
                                </span>
                                <p className='mt-4 mb-2 medium-text'><strong>Other repos of this user (max 10 shown) that might be interesting:</strong></p>
                                {otherRepos?.map((otherRepo) => (
                                    <span
                                        key={otherRepo.id}
                                        className='mb-1 medium-text cursor-pointer'
                                        onClick={() => getReposOfUser(otherRepo.name)}
                                    >
                                        {otherRepo.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default RepoDetails;
