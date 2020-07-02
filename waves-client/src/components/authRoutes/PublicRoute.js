import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Comp, user, setUser, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            (user ?
                <Redirect to='/' />
                :
                <Comp {...props} user={user} setUser={setUser} />
            )
        } />
    );
}

export default PublicRoute;
