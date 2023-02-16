import {cacheServiceInstance} from './cacheService';

class CacheFetch {
    async fetch(url, extra={}, clearCache=false) {

      if (cacheServiceInstance.has(url) && !clearCache && !cacheServiceInstance.isExpired(url, 600)) {
        return cacheServiceInstance.get(url);
      }
      const  res = await fetch(url, extra)
      const resJSON = await res.json()
      cacheServiceInstance.set(url, resJSON);

      return resJSON;
    }
}

const cacheFetch = new CacheFetch();

export {
  cacheFetch
}
