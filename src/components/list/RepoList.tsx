import React from 'react';
import {
    Button,
    Card,
    FormControl,
    InputGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Repository } from './repo.model';
import Error from '../error/Error';

interface ListProps {
    isLoading: boolean;
    isError: boolean;
    isSearch: boolean;
    repos: Repository[];
    searchString: string;
    setSearchString: (val: string) => void;
    getInitialPage: () => void;
    getNextPage: () => void;
}

const RepoList = (props: ListProps): JSX.Element => {
    const {
        isLoading,
        isError,
        isSearch,
        repos,
        searchString,
        setSearchString,
        getInitialPage,
        getNextPage,
    } = props;
    const navigate = useNavigate();

    return (
        <div className='mx-2 mt-4'>
            <div className='d-flex flex-column flex-sm-row justify-content-between'>
                <Button
                    variant='secondary'
                    disabled={isLoading || isSearch}
                    onClick={getInitialPage}
                >
                    <span className='text-nowrap'>{isLoading ? 'Loading...' : 'Initial page'}</span>
                </Button>
                <InputGroup className='mx-sm-2 my-2 my-sm-0'>
                    <InputGroup.Text id='search-field'>Search repos</InputGroup.Text>
                    <FormControl
                        placeholder='Repo name'
                        aria-label='Repo name'
                        aria-describedby='search-field'
                        onChange={(e) => setSearchString(e.target.value)}
                        value={searchString}
                    />
                </InputGroup>
                <Button
                    variant='secondary'
                    disabled={isLoading || isSearch}
                    onClick={getNextPage}
                >
                    <span className='text-nowrap'>{isLoading ? 'Loading...' : 'Next page'}</span>
                </Button>
            </div>
            {isError && (
                <Error
                    callback={getInitialPage}
                    btnText='Reload'
                    msg='Click the button below to reload the content of this page:'
                />
            )}
            {isSearch && (
                <p className='mt-4'>
                    <strong>Please note: </strong>
                    The search only ever returns the first 30 results!
                </p>
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
