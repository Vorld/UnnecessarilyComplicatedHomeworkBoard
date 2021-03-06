import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

//Material UI imports
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Icon,
  IconButton,
} from '@material-ui/core';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Link style={{ textDecoration: 'none' }} to='/tasks'>
        <Button color='primary'>Tasks</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} to='/create-profile'>
        <Button color='primary'>Subjects</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} onClick={logout} to='/#!'>
        <IconButton color='primary'>
          <Icon>exit_to_app</Icon>
        </IconButton>
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link style={{ textDecoration: 'none' }} to='/register'>
        <Button color='primary'>Register</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} to='/login'>
        <Button color='primary'>Log In</Button>
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar color='secondary'>
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant='h4'>
              <Icon>check</Icon> TASKS
            </Typography>
          </Box>

          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
