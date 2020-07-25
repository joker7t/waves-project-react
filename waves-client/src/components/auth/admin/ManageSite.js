import React from 'react';
import UserLayout from '../user/UserLayout';
import SiteInfo from './SiteInfo';

const ManageSite = () => {
    return (
        <div>
            <UserLayout>
                <SiteInfo />
            </UserLayout>
        </div>
    );
}

export default ManageSite;
