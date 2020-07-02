import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Comp, user, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            user ?
                <Comp {...props} user={user} />
                :
                <Redirect to='/login' />
        } />
    );
}

export default PrivateRoute;