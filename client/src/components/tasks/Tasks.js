import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks, deleteTask, addTask } from '../../actions/task';
import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Chip,
  Select,
  MenuItem,
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
  addTask,
  deleteTask,
  getCurrentProfile,
  task: { tasks, loading: taskLoading },
  profile: { profile, loading: profileLoading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    console.log(profileLoading, profile);
    if (profile) {
      console.log('yey');
      getTasks(profile.subjects);
    }
  }, [profile, getTasks]);

  const [open, setOpen] = useState(false);
  const [taskSubject, setTaskSubject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskSubjectChange = (e) => {
    setTaskSubject(e.target.value);
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleTaskDateChange = (e) => {
    setTaskDate(e.target.value);
  };

  const handleSubmitTask = (e) => {
    addTask(taskName, taskSubject, taskDate);
    setOpen(false);
  };

  return (profileLoading && profile === null) || taskLoading ? (
    <Box display='flex' justifyContent='center' m={1} p={1}>
      <CircularProgress />
    </Box>
  ) : (
    <Container>
      {profile ? (
        <Fragment>
          <Box mt={2} mb={2}>
            <Alert />
          </Box>

          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => handleClickOpen()}
          >
            Add Task
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
          >
            <DialogTitle id='form-dialog-title'>Add Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id='name'
                label='Name'
                style={{ marginBottom: '20px' }}
                fullWidth
                onChange={handleTaskNameChange}
              />

              <Select
                value={taskSubject}
                onChange={handleTaskSubjectChange}
                fullWidth
                margin='normal'
                style={{ marginBottom: '20px' }}
              >
                {profile.subjects.map((subject) => (
                  <MenuItem value={subject}>{subject}</MenuItem>
                ))}
              </Select>

              <TextField
                id='date'
                label='Due Date'
                type='date'
                fullWidth
                onChange={handleTaskDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleSubmitTask} color='primary'>
                Add Task
              </Button>
            </DialogActions>
          </Dialog>

          {tasks.length > 0 ? (
            <List>
              {tasks.map((task) => (
                <ListItem className='collection-item'>
                  <ListItemText primary={task.name} />
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
};

const mapStateToProps = (state) => ({
  task: state.task,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getTasks,
  deleteTask,
  addTask,
  getCurrentProfile,
})(Tasks);
