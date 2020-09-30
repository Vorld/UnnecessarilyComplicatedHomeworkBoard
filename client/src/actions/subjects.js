import axios from 'axios';
import { GET_SUBJECTS } from './types';

export const loadSubjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/subjects');
    dispatch({ type: GET_SUBJECTS, payload: res.data });
  } catch (err) {
    console.log(err);
    //TODO HANDLE THIS ERROR
  }
};
