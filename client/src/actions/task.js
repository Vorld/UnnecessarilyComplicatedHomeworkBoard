import axios from 'axios';
import { setAlert } from './alert';

import { GET_TASKS, TASK_ERROR, DELETE_TASK } from './types';

//Get Tasks
export const getTasks = (subjects, grade) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ subjects, grade });
  console.log(grade);

  try {
    const res = await axios.post('/api/tasks/me', body, config);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete a certain task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    dispatch(setAlert('Task Deleted', 'success', 1000));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Tasks
export const addTask = (name, subject, due, grade, subjects) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, subject, due, grade });

  try {
    await axios.post('/api/tasks', body, config);

    dispatch(getTasks(subjects, grade));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.request.statusText, status: err.request.status },
    });
  }
};
