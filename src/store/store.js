import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    address: '',
    dooplications: [],
    assets: {},
    leaderboard: [],
    feed: [],
    leaderboardSort: 'totalDoops'
  }
});

export default store;