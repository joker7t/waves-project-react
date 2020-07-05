import React from 'react';
import { Link } from 'react-router-dom';

const links = [
    {
        name: 'My Account',
        linkTo: '/user/dashboard'
    },
    {
        name: 'User Information',
        linkTo: '/user/user_profile'
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart'
    }
];

const generateLinks = () => links.map((link, i) =>
    <Link to={link.linkTo} key={i}>
        {link.name}
    </Link>
);

const UserLayout = (props) => {
    return (
        <div className='container'>
            <div className='user_container'>
                <div className='user_left_nav'>
                    <h2>My Account</h2>
                    <div className='links'>
                        {generateLinks()}
                    </div>
                </div>
                <div className='user_right'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default UserLayout;