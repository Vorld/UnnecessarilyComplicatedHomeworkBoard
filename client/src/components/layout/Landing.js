import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Grid, Button, Container } from '@material-ui/core';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/tasks' />;
  }

  return (
    <Container>
      <Grid
        container
        justify='center'
        alignItems='center'
        spacing={3}
        style={{ height: '80vh' }}
      >
        <Grid item xs={2}>
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <Button fullWidth variant='contained' color='primary' size='large'>
              Register
            </Button>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button fullWidth size='large'>
              Log In
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
    // <div style={{ height: '75vh' }} className='container valign-wrapper'>
    //   <div className='row'>
    //     <div className='col s12 center-align'>
    //       <h4>Hello.</h4>
    //       <br />
    //       <div className='col s6'>
    //         <Link
    //           to='/register'
    //           style={{
    //             width: '140px',
    //             borderRadius: '3px',
    //             letterSpacing: '1.5px',
    //           }}
    //           className='btn btn-large waves-effect waves-light hoverable black'
    //         >
    //           Register
    //         </Link>
    //       </div>
    //       <div className='col s6'>
    //         <Link
    //           to='/login'
    //           style={{
    //             width: '140px',
    //             borderRadius: '3px',
    //             letterSpacing: '1.5px',
    //           }}
    //           className='btn btn-large btn-flat waves-effect white black-text'
    //         >
    //           Log In
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, [])(Landing);
