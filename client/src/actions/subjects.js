import axios from 'axios';
import { GET_SUBJECTS } from './types';

export const loadSubjects = (grade) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ grade });

  try {
    const res = await axios.post('/api/subjects/me', body, config);
    dispatch({ type: GET_SUBJECTS, payload: res.data });
  } catch (err) {
    console.log(err);
    //TODO HANDLE THIS ERROR
  }
};
