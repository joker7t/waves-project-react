import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Comp, user, needAdminRole, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            user ?
                (
                    needAdminRole ?
                        (
                            user.role === 1 ?
                                <Comp {...props} />
                                :
                                <Redirect to='/user/dashboard' />
                        )
                        :
                        <Comp {...props} />
                )
                :
                <Redirect to='/login' />
        } />
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(PrivateRoute);
