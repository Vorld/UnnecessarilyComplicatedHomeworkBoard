import { GET_SUBJECTS } from '../actions/types';

const initialState = {
  subjects: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };
    default:
      return state;
  }
}
