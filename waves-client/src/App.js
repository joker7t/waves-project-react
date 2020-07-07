import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
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
import { LOGIN } from './actions/type';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      setJwtToken(token);
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        handleExpireToken();
      } else {
        setUser(decodedToken.user);
        store.dispatch({
          type: LOGIN,
          payload: decodedToken.user
        });
      }
    }

    //eslint-disable-next-line
  }, []);

  const handleExpireToken = () => {
    localStorage.removeItem("token");
    setJwtToken(false);
    setUser(null);
    store.dispatch({
      type: LOGIN,
      payload: null
    });
    window.location.href = '/login';
  }

  return (
    <Provider store={store}>
      <Header />
      <Router>
        <div className="App">
          <Switch>

            <PublicRoute user={user} setUser={setUser} restricted={true} auth={true} exact path='/login' component={Login} />
            <PublicRoute user={user} setUser={setUser} restricted={true} auth={true} exact path='/register' component={Register} />

            <PrivateRoute user={user} needAdminRole={false} exact path='/' component={Home} />
            <PrivateRoute user={user} needAdminRole={false} exact path='/user/dashboard' component={UserDashboard} />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;