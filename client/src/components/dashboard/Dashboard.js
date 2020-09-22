import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []); // eslint-disable-line

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='row'>
          <h4>
            <b>
              DASHBOARD <i className='material-icons'>face</i>
            </b>
          </h4>
          <p>Hello {user && user.name}</p>
          {profile != null ? (
            <Fragment>
              <Link to='/create-profile'>Make changes to your subjects</Link>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not set up your subjects</p>
              <Link to='/create-profile'>Set up subjects</Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
