import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import subjects from './subjects';

export default combineReducers({ alert, auth, profile, subjects });
