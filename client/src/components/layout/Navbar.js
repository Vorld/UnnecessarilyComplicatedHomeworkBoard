import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <li>
        <Link className='black-text' to='/dashboard'>
          Dashboard
        </Link>
      </li>
      <li>
        <Link className='black-text' onClick={logout} to='/#!'>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <li>
        <Link className='black-text' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='black-text' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <div className='navbar-fixed'>
      <nav className='z-depth-0'>
        <div className='nav-wrapper white'>
          <Link
            to='/'
            style={{
              fontFamily: 'raleway',
              fontWeight: 500,
            }}
            className='col s5 brand-logo center black-text'
          >
            <i className='material-icons'>check</i>
            TASKS
          </Link>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
    </div>
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
