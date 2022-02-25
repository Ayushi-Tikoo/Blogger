import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ViewBlog from './components/blog/ViewBlog';
import Blog from './components/blog/Blogs';
import AddBlog from './components/blog/AddBlog';
import EditBlog from './components/blog/EditBlog';
import store from '../src/redux/store';
import Alert from './components/layout/Alert';
import { loadUser } from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import PageNotFound from './components/layout/PageNotFound';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Route path='/' component={Landing} exact />
        <section className='container'>
          <Alert />
          <Switch>
            <Route path='/login' component={Login} exact />
            <Route path='/register' component={Register} exact />
            <PrivateRoute path='/blog' component={Blog} exact />
            <PrivateRoute path='/addBlog' component={AddBlog} exact />
            <PrivateRoute path='/viewBlog/:id' component={ViewBlog} exact />
            <PrivateRoute path='/editBlog/:id' component={EditBlog} exact />
            <PrivateRoute path='/deleteBlog/:id' component={Blog} exact />
            <Route path='*' component={PageNotFound} exact />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
