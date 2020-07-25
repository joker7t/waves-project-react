import React from 'react';
import UserLayout from './UserLayout';
import Button from '../../../utils/Button';
import { connect } from 'react-redux';
import Loader from '../../../utils/Loader';
import UserHistory from './UserHistory';

const UserDashboard = ({ userDetails }) => {

    return (
        <div>
            <UserLayout>
                {userDetails ?
                    <div>
                        <div className='user_nfo_panel'>
                            <h1>User Information</h1>
                            <div>
                                <span>{userDetails.name}</span>
                                <span>{userDetails.lastname}</span>
                                <span>{userDetails.email}</span>
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
                                <UserHistory products={userDetails.histories} />
                            </div>
                        </div>
                    </div>
                    :
                    <Loader />
                }
            </UserLayout>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.userDetails
});

export default connect(mapStateToProps, null)(UserDashboard);
