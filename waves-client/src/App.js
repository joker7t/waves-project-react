import React from 'react';
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
import { LOGIN, SET_USER_DETAILS } from './actions/type';
import Shop from './components/shop/Shop';
import AddProduct from './components/products/AddProduct';
import ManageCategories from './components/auth/user/ManageCategories';
import Product from './components/product/Product';

function App() {

  const handleExpireToken = () => {
    localStorage.removeItem("token");
    setJwtToken(false);
    store.dispatch({
      type: LOGIN,
      payload: null
    });
    store.dispatch({
      type: SET_USER_DETAILS,
      payload: null
    });
  }

  const token = localStorage.token;
  if (token) {
    setJwtToken(token);
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      handleExpireToken();
    } else {
      store.dispatch({
        type: LOGIN,
        payload: decodedToken.user
      });
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App">
          <Switch>

            <PublicRoute restricted={true} exact path='/login' component={Login} />
            <PublicRoute restricted={true} exact path='/register' component={Register} />

            <PrivateRoute needAdminRole={false} exact path='/product_detail/:id' component={Product} />
            <PrivateRoute needAdminRole={false} exact path='/' component={Home} />
            <PrivateRoute needAdminRole={false} exact path='/shop' component={Shop} />
            <PrivateRoute needAdminRole={false} exact path='/user/dashboard' component={UserDashboard} />

            <PrivateRoute needAdminRole={true} exact path='/admin/add_product' component={AddProduct} />
            <PrivateRoute needAdminRole={true} exact path='/admin/manage_categories' component={ManageCategories} />

            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;