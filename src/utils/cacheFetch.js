import {cacheService} from './cacheService';

class CacheFetch {
    async fetch(url, extra={}, clearCache=false) {

      if (cacheService.has(url) && !clearCache && !cacheService.isExpired(url, 600)) {
        return cacheService.get(url);
      }
      const  res = await fetch(url, extra)
      const resJSON = await res.json()
      cacheService.set(url, resJSON);

      return resJSON;
    }
}

const cacheFetch = new CacheFetch();

export {
  cacheFetch
}
