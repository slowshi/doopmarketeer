
import store from '../store/store';
import {sortFilters} from '../utils/constants';

const formatURL = (state) => {
  let params = {};
  if(state.app.address !== '') {
    params = {
      address: Object.keys(state.app.address).toString()
    }
  }

  if(Object.keys(params).length === 0) return '/';

  const searchParams = new URLSearchParams(params);
  const url = `/?${searchParams}`;
  return url;
};

const pageLoad = (clearCache = false)=> {
  const state = store.getState();
  const url = formatURL(state);
  window.history.replaceState(null, null, url);

  console.log('pageLoad');
  // stakingInfo.init(clearCache);
};

export default pageLoad;
