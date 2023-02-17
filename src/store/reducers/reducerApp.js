const initialState = Object.freeze({
  dooplications: [],
  assets: {},
  leaderboard: [],
  feed: [],
  leaderboardSort: 'totalDoops'
})

const appReducer = (state = initialState, action) => {
  switch (action.type) {
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


