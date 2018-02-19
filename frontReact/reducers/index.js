import { combineReducers } from 'redux';
import company from './company';
import user from './user';
import access from './access';


const recommender = combineReducers({
  company,
  access,
  user
});

export default recommender;
