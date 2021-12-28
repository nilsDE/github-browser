import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Repository } from './repo.model';
import Error from '../error/Error';

interface ListProps {
    isLoading: boolean;
    isError: boolean;
    repos: Repository[];
    getInitialPage: () => void;
    getNextPage: () => void;
}

const RepoList: React.FC<ListProps> = (props) => {
    const {
        isLoading,
        isError,
        repos,
        getInitialPage,
        getNextPage,
    } = props;
    const navigate = useNavigate();

    return (
        <div className='mx-2 mt-4'>
            <div className='d-flex justify-content-between'>
                <Button
                    variant='secondary'
                    disabled={isLoading}
                    onClick={getInitialPage}
                >
                    {isLoading ? 'Loading...' : 'Initial page'}
                </Button>
                <Button
                    variant='secondary'
                    disabled={isLoading}
                    onClick={getNextPage}
                >
                    {isLoading ? 'Loading...' : 'Next page'}
                </Button>
            </div>
            {isError && (
                <Error
                    callback={getInitialPage}
                    btnText='Reload'
                    msg='Click the button below to reload the content of this page:'
                />
            )}
            {repos.map((repo: Repository) => (
                <Card key={repo.id} className='my-4 cursor-pointer' onClick={() => navigate(`/${repo.owner.login}/${repo.name}`)}>
                    <Card.Header as='h5'>{repo.name}</Card.Header>
                    <Card.Body>
                        <Card.Title as='p' className='font-italic'>
                            By:
                            {repo.owner.login}
                        </Card.Title>
                        <Card.Text>
                            {repo.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default RepoList;
