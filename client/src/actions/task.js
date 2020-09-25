import axios from 'axios';
import { setAlert } from './alert';

import { GET_TASKS, TASK_ERROR, DELETE_TASK } from './types';

//Get Tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/tasks');

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

export const deleteTask = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/tasks/${id}`);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    dispatch(setAlert('Task Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
