import {cacheService} from './cacheService';

class CacheFetch {
    async fetch(url, extra={}, clearCache=false) {

      if (cacheService.has(url) && !clearCache && !cacheService.isExpired(url, 180)) {
        return cacheService.get(url);
      }
      const  res = this.fetchWithRetry(url, extra)
      cacheService.set(url, res);

      return res;
    }
    async fetchWithRetry(url, retries = 5, timeout = 50) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        if (retries > 0) {
          console.error(`Failed to fetch data: ${error.message}. Retrying...`);
          await new Promise((resolve) => setTimeout(resolve, timeout));
          return await this.fetchWithRetry(url, retries - 1);
        } else {
          throw error;
        }
      }
    }
}

const cacheFetch = new CacheFetch();

export {
  cacheFetch
}
