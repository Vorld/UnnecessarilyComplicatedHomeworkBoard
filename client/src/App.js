import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import Tasks from './components/tasks/Tasks';
import NotFound from './components/layout/NotFound';

import PrivateRoute from './components/routing/PrivateRoute';

//Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import setAuthToken from './utils/SetAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

//Material Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/tasks' component={Tasks} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
