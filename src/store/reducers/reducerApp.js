const initialState = Object.freeze({
  dooplications: [],
  assets: {}
})

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDooplications":
      return {
        ...state,
        dooplications: [...action.payload]
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


