// environment variables eventually
const API_URL = 'https://doopmarketeer-api.vercel.app';
// const API_URL = 'http://localhost:8000'
const ETH_RPC_URL = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const currencyMap = {
  usd: {
    label: 'USD',
    address: '',
    toLocaleString: {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  },
  eth: {
    label: 'ETH',
    address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    toLocaleString: {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }
  },
  flow: {
    label: 'FLOW',
    address: '0xd9bdd9f5ffa7d89c846a5e3231a093ae4b3469d2',
    toLocaleString: {
      style: 'currency',
      currency: 'ETH',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  }
}


export {
  API_URL,
  ETH_RPC_URL,
  currencyMap
}