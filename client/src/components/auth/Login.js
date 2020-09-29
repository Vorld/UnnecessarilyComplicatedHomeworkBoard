import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import '../../App.css';

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

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Login Redirect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
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
          <b>Log in</b> below
        </Box>
        <p>
          <Typography variant='subtitle1'>
            Don't have an account?
            <Link to='/register' style={{ textDecoration: 'none' }}>
              <MaterialLink style={{ color: '#757ce8' }}>
                {' '}
                Register
              </MaterialLink>
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
          <Box mt={2}>
            <Button
              size='large'
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
            >
              Log in
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
    // <div className='container'>
    //   <div className='row'>
    //     <div className='col s8 offset-s2'>
    //       <Link to='/' className='btn-flat waves-effect'>
    //         <i className='material-icons left'>keyboard_backspace</i> Back to
    //         home
    //       </Link>
    //       <div className='col s12' style={{ paddingLeft: '11.250px' }}>
    //         <h4>
    //           <b>Log in</b> below
    //         </h4>
    //         <p className='grey-text text-darken-1'>
    //           Don't have an account? <Link to='/register'>Register</Link>
    //         </p>
    //       </div>
    //       <Alert />
    //       <form onSubmit={(e) => onSubmit(e)}>
    //         <div className='input-field col s12'>
    //           <input
    //             type='email'
    //             name='email'
    //             value={email}
    //             onChange={(e) => onChange(e)}
    //             required
    //           />
    //           <label htmlFor='email'>Email</label>
    //         </div>
    //         <div className='input-field col s12'>
    //           <input
    //             type='password'
    //             name='password'
    //             value={password}
    //             onChange={(e) => onChange(e)}
    //             minLength='6'
    //             required
    //           />
    //           <label htmlFor='password'>Password</label>
    //         </div>
    //         <div className='col s12' style={{ paddingLeft: '11.250px' }}>
    //           <button
    //             style={{
    //               width: '150px',
    //               borderRadius: '3px',
    //               letterSpacing: '1.5px',
    //               marginTop: '1rem',
    //             }}
    //             type='submit'
    //             value='Login'
    //             className='btn btn-large waves-effect waves-light hoverable black'
    //           >
    //             Login
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
