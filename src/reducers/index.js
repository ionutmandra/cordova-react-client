import { combineReducers } from 'redux';
import todos from './todos';
import credentials from './credentials';
import images from './images';

export default combineReducers({
  todos,
  credentials, 
  images
});
