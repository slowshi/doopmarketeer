import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    ethPrice: 0,
    flowPrice: 0,
    address: '',
    dooplications: [],
    doopMarket: [],
    assets: {},
    leaderboard: [],
    feed: [],
    activeMarketTab: '',
    leaderboardSort: 'totalDoops'
  }
});

export default store;