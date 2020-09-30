import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert as MaterialAlert } from '@material-ui/lab';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <MaterialAlert key={alert.id} severity={alert.alertType}>
      {alert.msg}
    </MaterialAlert>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
