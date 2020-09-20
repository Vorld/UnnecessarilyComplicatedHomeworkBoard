import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Alert from '../layout/Alert';

import '../../App.css';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match!', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  //Login Redirect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s8 offset-s2'>
          <Link to='/' className='btn-flat waves-effect'>
            <i className='material-icons left'>keyboard_backspace</i> Back to
            home
          </Link>
          <div className='col s12' style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className='grey-text text-darken-1'>
              Already have an account? <Link to='/login'>Log in</Link>
            </p>
          </div>
          <Alert />
          <form noValidate onSubmit={(e) => onSubmit(e)}>
            <div className='input-field col s12'>
              <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <label htmlFor='name'>Name</label>
            </div>
            <div className='input-field col s12'>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <label htmlFor='email'>Email</label>
            </div>
            <div className='input-field col s12'>
              <input
                type='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
                required
              />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input-field col s12'>
              <input
                type='password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
                minLength='6'
                required
              />
              <label htmlFor='password2'>Confirm Password</label>
            </div>
            <div className='col s12' style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type='submit'
                value='Register'
                className='btn btn-large waves-effect waves-light hoverable black'
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
