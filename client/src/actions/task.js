import axios from 'axios';
import { setAlert } from './alert';

import { GET_TASKS, TASK_ERROR, DELETE_TASK, ADD_TASK } from './types';

//Get Tasks
export const getTasks = (subjects) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ subjects });

  try {
    const res = await axios.post('/api/tasks/me', body, config);
    console.log(res);

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
    const res = await axios.delete(`/api/tasks/${id}`);

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
export const addTask = (name, subject, date) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, subject, date });

  try {
    const res = await axios.post('/api/tasks', body, config);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.request.statusText, status: err.request.status },
    });
  }
};
