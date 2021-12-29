import React from 'react';
import { Button, Card } from 'react-bootstrap';

interface ErrorProps {
    callback: (isReload: boolean) => void;
    btnText: string;
    msg: string;
}

const Error = ({ callback, btnText, msg }: ErrorProps): JSX.Element => (
    <Card bg='warning' text='white' className='my-4 cursor-pointer'>
        <Card.Header as='h5'>An error has occurred!</Card.Header>
        <Card.Body>
            <Card.Text>
                {msg}
            </Card.Text>
            <Button variant='secondary' onClick={() => callback(true)}>{btnText}</Button>
        </Card.Body>
    </Card>
);

export default Error;
