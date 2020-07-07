import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Comp, user, restricted, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            restricted ?
                (user ?
                    <Redirect to='/' />
                    :
                    <Comp {...props} />
                )
                :
                <Comp {...props} />
        } />
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps, null)(PublicRoute);
