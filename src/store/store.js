import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    dooplications: [],
    assets: {},
    leaderboard: [],
    leaderboardSort: 'totalDoops'
  }
});

export default store;