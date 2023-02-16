import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    dooplications: []
  }
});

export default store;