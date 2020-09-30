import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Alert from '../layout/Alert';

import {
  Container,
  Box,
  TextField,
  CssBaseline,
  Typography,
  Button,
  Link as MaterialLink,
  Icon,
} from '@material-ui/core';

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
      setAlert('Passwords do not match!', 'error');
    } else {
      register(name, email, password);
    }
  };

  //Login Redirect
  if (isAuthenticated) {
    return <Redirect to='/tasks' />;
  }

  return (
    <Container maxWidth='xs' style={{ height: '80vh', marginTop: '32px' }}>
      <CssBaseline />
      <Box display='flex' flexDirection='column' style={{ height: '80vh' }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button startIcon={<Icon>keyboard_backspace</Icon>}>
            Back to home
          </Button>
        </Link>
        <Box fontSize='h4.fontSize'>
          <b>Register</b> below
        </Box>
        <p>
          <Typography variant='subtitle1'>
            Already have an account?
            <Link to='/register' style={{ textDecoration: 'none' }}>
              <MaterialLink style={{ color: '#757ce8' }}> Log In</MaterialLink>
            </Link>
          </Typography>
        </p>
        <Alert />
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoComplete='name'
            autoFocus
            value={name}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password2'
            label='Confirm Password'
            type='password'
            id='password'
            value={password2}
            onChange={(e) => onChange(e)}
          />
          <Box mt={2} mb={2}>
            <Button
              size='large'
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
            >
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
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
