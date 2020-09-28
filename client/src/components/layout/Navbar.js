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
} from '@material-ui/core';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Fragment>
      <Link style={{ textDecoration: 'none' }} to='/dashboard'>
        <Button color='primary'>Dashboard</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} to='/tasks'>
        <Button color='primary'>Tasks</Button>
      </Link>
      <Link style={{ textDecoration: 'none' }} onClick={logout} to='/#!'>
        <Button color='primary'>Log Out</Button>
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
    // <div className='navbar-fixed'>
    //   <nav className='z-depth-0'>
    //     <div className='nav-wrapper white'>
    //       <Link
    //         to='/'
    //         style={{
    //           fontFamily: 'raleway',
    //           fontWeight: 500,
    //         }}
    //         className='col s5 brand-logo center black-text'
    //       >
    //         <i className='material-icons'>check</i>
    //         TASKS
    //       </Link>
    //       {!loading && (
    //         <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    //       )}
    //     </div>
    //   </nav>
    // </div>
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
