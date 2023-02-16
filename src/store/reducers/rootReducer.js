import {combineReducers} from 'redux';
import reducerApp from './reducerApp';

const rootReducer = combineReducers({
  app: reducerApp
});

export default rootReducer;