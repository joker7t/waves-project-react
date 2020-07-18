import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

const admin = [
    {
        name: 'Site Info',
        linkTo: '/admin/site_info'
    },
    {
        name: 'Add Products',
        linkTo: '/admin/add_product'
    },
    {
        name: 'Manage Categories',
        linkTo: '/admin/manage_categories'
    }
];

const generateLinks = () => links.map((link, i) =>
    <Link to={link.linkTo} key={i}>
        {link.name}
    </Link>
);

const generateAdminLinks = () => admin.map((link, i) =>
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
                    {
                        props.user.role ?
                            <div>
                                <h2>Admin</h2>
                                <div className='links'>
                                    {generateAdminLinks()}
                                </div>
                            </div>
                            : null
                    }
                </div>
                <div className='user_right'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(UserLayout);
