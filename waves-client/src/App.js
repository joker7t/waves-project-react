import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PublicRoute from './components/authRoutes/PublicRoute';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setJwtToken from './utils/setJwtToken';
import Header from './components/layouts/header/Header';
import Footer from './components/layouts/footer/Footer';
import UserDashboard from './components/auth/user/UserDashboard';

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.token;
  //   if (token) {
  //     setJwtToken(token);
  //     const decodedToken = jwt_decode(token);
  //     const currentTime = Date.now() / 1000;
  //     if (decodedToken.exp < currentTime) {
  //       handleExpireToken();
  //     } else {
  //       setUser(decodedToken.user);
  //         store.dispatch
  //     }
  //   }

  //   //eslint-disable-next-line
  // }, []);

  // const handleExpireToken = () => {
  //   localStorage.removeItem("token");
  //   setJwtToken(false);
  //   setUser(null);
  //  window.location.href = LOGIN;
  // }

  return (
    <Provider store={store}>
      <Header />
      <Router>
        <div className="App">
          <Switch>

            {
              // <PublicRoute user={user} setUser={setUser} exact path='/login' component={Login} />
              // <PublicRoute user={user} setUser={setUser} exact path='/register' component={Register} />

              // <PrivateRoute user={user} exact path='/' component={Home} />
            }
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/user/dashboard' component={UserDashboard} />
            <Route exact path='/' component={Home} />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;