import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTask } from '../../actions/task';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core/';

const AddTask = ({ addTask, profile: { profile }, grade }) => {
  const [open, setOpen] = useState(false);
  const [taskSubject, setTaskSubject] = useState('Personal');
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
    addTask(taskName, taskSubject, taskDate, grade, profile.subjects);
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={() => handleClickOpen()}
      >
        <Box letterSpacing={1.5}>Add Task</Box>
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
            <MenuItem value={'Personal'}>{'Personal'}</MenuItem>
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
    </Fragment>
  );
};

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  grade: state.auth.user.grade,
});

export default connect(mapStateToProps, { addTask })(AddTask);
