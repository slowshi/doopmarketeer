const initialState = Object.freeze({
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
})

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setActiveMarketTab':
      return {
        ...state,
        activeMarketTab: action.payload
      }
    case 'setEthPrice':
      return {
        ...state,
        ethPrice: action.payload
      }
    case 'setFlowPrice':
      return {
        ...state,
        flowPrice: action.payload
      }
    case 'setAddress':
      return {
        ...state,
        address: action.payload
      }
    case "setDoopMarket":
      return {
        ...state,
        doopMarket: [...action.payload]
      }
    case "setDooplications":
      return {
        ...state,
        dooplications: [...action.payload]
      }
    case "setLeaderboard":
      return {
        ...state,
        leaderboard: [...action.payload]
      }
    case "sortLeaderboard":
      return {
        ...state,
        leaderboardSort: action.payload
      }
    case "addAssets":
      return {
        ...state,
        assets: {
          ...state.assets,
          [action.payload.tokenId]: action.payload.data
        }
      }
    case "setFeed":
        return {
          ...state,
          feed: [...action.payload]
      }
    case "appendFeed":
        return {
          ...state,
          feed: [
            ...state.feed,
            ...action.payload
          ]
      }
    case "prependFeed":
      return {
        ...state,
        feed: [
          ...action.payload,
          ...state.feed
        ]
    }
    default:
    return state
  }
}

export default appReducer


