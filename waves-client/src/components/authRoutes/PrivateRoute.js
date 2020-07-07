import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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

export default PrivateRoute;