// environment variables eventually
const API_URL = 'https://api.doopmarketeer.app'
// const API_URL = 'https://test-api.doopmarketeer.app'
// const API_URL = 'https://doopmarketeer-api.vercel.app'
// const API_URL = 'http://localhost:8000'
const ETH_RPC_URL = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
const DOOPLICATOR_URL = 'https://metadata.artlab.xyz/0185fa75-ba04-8156-9fbe-bb39dc263392';
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

const marketTabs = {
  LEADERBOARD: 'leaderboard',
  FEED: 'feed',
  DOOPMARKET: 'doopmarket',
  SEARCH: 'search',
  UNDOOPED: 'undooped'
}
const palette = {
  PINK_100: '#FFD2EA',
  PINK_200: '#FFC2DF',
  PINK_300: '#FFA4D4',
  ORANGE_100: '#FFCC99',
  YELLOW_100: '#FFE98A',
  GREEN_100: '#B3FFC7',
  GREEN_200: '#79E8B3',
  BLUE_100: '#BBEFFF',
  BLUE_200: '#99E2FF',
  BLUE_300: '#80B1FF',
  PURPLE_100: '#C5C5FF',
  PURPLE_200: '#A4A4F4',
  SKIN_100: '#FFF5EB',
  SKIN_200: '#FFEAD2',
  SKIN_300: '#F9E0D7',
  SKIN_400: '#FFD0B8',
  SKIN_500: '#E5CBCA',
  SKIN_600: '#E1A175',
  SKIN_700: '#D1B6B6',
  SKIN_800: '#D18C79',
}

const searchTypes = {
  ADDRESS: 'address',
  DOOPLICATOR: 'dooplicator',
  DOODLE: 'doodle',
  GENESIS_BOX: 'genesisBox'
}

const undoopedTypes = {
  DOODLES: 'doodles',
  VERY_COMMON: 'veryCommon',
  COMMON: 'common',
  RARE: 'rare',
}

const searchColors = {
  [searchTypes.ADDRESS]: {
    light: palette.PURPLE_100,
    dark: palette.PURPLE_200
  },
  [searchTypes.DOODLE]: {
    light: palette.BLUE_200,
    dark: palette.BLUE_300
  },
  [searchTypes.DOOPLICATOR]: {
    light: palette.GREEN_100,
    dark: palette.GREEN_200
  },
  [searchTypes.GENESIS_BOX]: {
    light: palette.PINK_100,
    dark: palette.PINK_200
  }
}

export {
  API_URL,
  ETH_RPC_URL,
  DOOPLICATOR_URL,
  IPFS_GATEWAY,
  currencyMap,
  marketTabs,
  palette,
  undoopedTypes,
  searchTypes,
  searchColors
}