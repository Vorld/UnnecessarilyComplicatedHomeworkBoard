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
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, [])(Landing);
