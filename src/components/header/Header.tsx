/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './header.css';

const Header = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className='p-3 GithubBrowser-header'>
            <span className='mb-0 cursor-pointer' onClick={() => navigate('/')}>GitHub Browser</span>
        </div>
    );
};

export default Header;
