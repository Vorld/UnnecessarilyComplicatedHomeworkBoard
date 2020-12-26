import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks, deleteTask, addTask } from '../../actions/task';
import { getCurrentProfile } from '../../actions/profile';

import Moment from 'react-moment';

import Alert from '../layout/Alert';
import AddTask from './AddTask';

import {
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Container,
  Box,
  Typography,
  Icon,
} from '@material-ui/core/';

const Tasks = ({
  getTasks,
  deleteTask,
  getCurrentProfile,
  task: { tasks, loading: taskLoading },
  profile: { profile, loading: profileLoading },
  grade,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (profile) {
      getTasks(profile.subjects, grade);
    }
  }, [getTasks, profile, grade]);

  return (profileLoading && profile === null) || (taskLoading && profile) ? (
    <Box display='flex' justifyContent='center' m={1} p={1}>
      <CircularProgress />
    </Box>
  ) : (
    <Container>
      {profile ? (
        <Fragment>
          <Box mt={2} mb={2}>
            <AddTask />
          </Box>
          <Alert />

          {tasks.length > 0 ? (
            <List>
              {tasks.map((task) => (
                <ListItem className='collection-item'>
                  <ListItemText
                    primary={task.name}
                    secondary={
                      <Moment
                        calendar={{
                          sameDay: '[Today]',
                          nextDay: '[Tomorrow]',
                          nextWeek: '[This] dddd',
                          lastDay: '[Yesterday]',
                          lastWeek: '[Last] dddd',
                          sameElse: 'DD MMM YYYY',
                        }}
                      >
                        {new Date(task.due)}
                      </Moment>
                    }
                  />
                  <Chip label={task.subject} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      onClick={(e) => deleteTask(task._id)}
                      className='secondary-content right'
                    >
                      <Icon>clear</Icon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box m={1} p={1}>
              <Typography align='center' variant='subtitle1'>
                Rejoice! You are (temporarily) free from the clutches of the
                education system!
              </Typography>
            </Box>
          )}
        </Fragment>
      ) : (
        <Box display='flex' justifyContent='center' m={1} p={1}>
          <Typography>Set up your subjects!</Typography>
        </Box>
      )}
    </Container>
  );
};

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
  profile: state.profile,
  grade: state.auth.user.grade,
});

export default connect(mapStateToProps, {
  getTasks,
  deleteTask,
  addTask,
  getCurrentProfile,
})(Tasks);
