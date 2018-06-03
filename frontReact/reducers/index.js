import { combineReducers } from 'redux';
import company from './company';
import user from './user';
import access from './access';
import discussion from './discussion';


const recommender = combineReducers({
  company,
  access,
  user,
  discussion
});

export default recommender;
