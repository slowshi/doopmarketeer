import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer,
{
  app: {
    ethPrice: 0,
    flowPrice: 0,
    address: '',
    searchValue: '',
    searchType: 'address',
    searchLoading: false,
    dooplications: [],
    doopMarket: [],
    assets: {},
    dooplicatorAssets: {},
    leaderboard: [],
    undoopedDoodles: [],
    feed: [],
    activeMarketTab: '',
    leaderboardSort: 'totalDoops'
  }
});

export default store;