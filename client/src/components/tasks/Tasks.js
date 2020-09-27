import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTasks, deleteTask, addTask } from '../../actions/task';

import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Tasks = ({
  getTasks,
  addTask,
  deleteTask,
  task: { tasks, loading },
  profile: { profile },
}) => {
  useEffect(() => {
    getTasks(profile.subjects);
  }, [getTasks]);

  const [open, setOpen] = useState(false);
  const [taskSubject, setTaskSubject] = useState(profile.subjects[0]);
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

  return loading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <Alert />

      <button
        className='btn black hoverable waves-effect'
        style={{ width: '100%' }}
        onClick={() => handleClickOpen()}
      >
        Add Task
      </button>

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
        <ul className='collection with-header'>
          {tasks.map((task) => (
            <li className='collection-item'>
              <div>
                {task.name}
                <span className='new badge' data-badge-caption=''>
                  {task.subject}
                </span>
                <Link
                  to='#!'
                  onClick={(e) => deleteTask(task._id)}
                  className='secondary-content right'
                >
                  <i className='material-icons black-text'>clear</i>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className='container valign-wrapper'>
          <p className='center-align'>
            Rejoice! You are (temporarily) free from the clutches of the
            education system!
          </p>
        </div>
      )}
    </div>
  );
};

Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
  profile: state.profile,
});

export default connect(mapStateToProps, { getTasks, deleteTask, addTask })(
  Tasks
);
