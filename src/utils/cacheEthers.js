import {cacheService} from './cacheService';
import { Contract, JsonRpcProvider, formatUnits } from 'ethers';
import {abi as CurrencyAbi} from './Currency.json';
import { ETH_RPC_URL, currencyMap } from './constants';
class CacheEthers {
    /**
   *
   *
   * @param {String} rpcURL
   * @return {JsonRpcProvider}
   */
     provider(rpcURL) {
      const key = `Provider`;
      if (cacheService.has(key)) {
        return cacheService.get(key);
      }
      const provider = new JsonRpcProvider(rpcURL);
      cacheService.set(key, provider);
      return provider;
    }

    /**
     *
     *
     * @param {String} address
     * @param {String} abi
     * @return {Contract}
     */
    contract(address, abi, rpcURL) {
      const key = `Contract/${address}`;
      const provider = this.provider(rpcURL);
      if (cacheService.has(key)) {
        return cacheService.get(key);
      }
      const contract = new Contract(address, abi, provider);
      cacheService.set(key, contract);
      return contract;
    }

    /**
     *
     *
     * @param {Contract} contract
     * @param {String} method
     * @param {Array} [params=[]]
     * @param {Boolean} [clearCache=false]
     * @return {mixed}
     */
    async contractCall(contract, method, params=[], clearCache=false) {
      const contractCallKey = `Contract/${contract.target}/${method}/${JSON.stringify(params)}`;
      if (cacheService.has(contractCallKey) && !clearCache && !cacheService.isExpired(contractCallKey, 600)) {
        return cacheService.get(contractCallKey);
      }
      const response = await contract[method](...params);
      cacheService.set(contractCallKey, response);

      return response;
    }

    async getCurrencyConversion(currencyKey='usd', clearCache=false) {
      if(currencyKey === 'usd') return 1;
      const currencyAddress = currencyMap[currencyKey].address
      const currenyContract = this.contract(currencyAddress, CurrencyAbi, ETH_RPC_URL);
      let latestAnswer = await this.contractCall(
        currenyContract,
        'latestAnswer',
        [],
        clearCache
      );
      latestAnswer = Number(formatUnits(latestAnswer, 8));
      return latestAnswer;
    }
}
const cacheEthers = new CacheEthers();

export {
  cacheEthers
}
