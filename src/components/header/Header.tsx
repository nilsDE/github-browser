import React from 'react';
import { useNavigate } from 'react-router-dom';

import './header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='p-3 GithubBrowser-header'>
            <span className='mb-0 cursor-pointer' onClick={() => navigate('/')}>GitHub Browser</span>
        </div>
    )
}

export default Header;