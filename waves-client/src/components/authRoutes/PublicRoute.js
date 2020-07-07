import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Comp, user, setUser, restricted, auth, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            restricted ?
                (user ?
                    <Redirect to='/' />
                    :
                    (auth ?
                        <Comp {...props} setUser={setUser} />
                        :
                        <Comp {...props} />
                    )
                )
                :
                <Comp {...props} />
        } />
    );
}

export default PublicRoute;
