import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Grid, Button } from '@material-ui/core';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    // <Grid
    //   container
    //   direction='row'
    //   justify='center'
    //   alignItems='center'
    //   spacing={3}
    //   style={{ height: '75vh' }}
    // >
    //   <Grid item xs={6} style={{ backgroundColor: '#eeeeee' }}>
    //     Hi.
    //   </Grid>
    //   <Grid item xs={3} style={{ backgroundColor: '#eeeeee' }}>
    //     <Button>Hi</Button>
    //   </Grid>
    //   <Grid item xs={3} style={{ backgroundColor: '#aaaaaa' }}>
    //     Hi
    //   </Grid>
    // </Grid>
    <div style={{ height: '75vh' }} className='container valign-wrapper'>
      <div className='row'>
        <div className='col s12 center-align'>
          <h4>Hello.</h4>
          <br />
          <div className='col s6'>
            <Link
              to='/register'
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className='btn btn-large waves-effect waves-light hoverable black'
            >
              Register
            </Link>
          </div>
          <div className='col s6'>
            <Link
              to='/login'
              style={{
                width: '140px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className='btn btn-large btn-flat waves-effect white black-text'
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, [])(Landing);
