const initialState = Object.freeze({
  dooplications: [],
  assets: {},
  leaderboard: [],
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
    default:
    return state
  }
}

export default appReducer


