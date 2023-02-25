import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    ethPrice: 0,
    flowPrice: 0,
    address: '',
    dooplications: [],
    assets: {},
    leaderboard: [],
    feed: [],
    leaderboardSort: 'totalDoops'
  }
});

export default store;