import React from 'react';
import UserLayout from './UserLayout';
import Button from '../../../utils/Button';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                <div className='user_nfo_panel'>
                    <h1>User Information</h1>
                    <div>
                        <span>name</span>
                        <span>lastname</span>
                        <span>email</span>
                    </div>
                    <Button
                        type='default'
                        title='Edit account info'
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                        linkTo='/user/user_profile'
                    />
                </div>

                <div className='user_nfo_panel'>
                    <h1>History purchases</h1>
                    <div className='user_product_block'>
                        history
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default UserDashboard;
