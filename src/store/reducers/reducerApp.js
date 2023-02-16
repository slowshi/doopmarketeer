const initialState = Object.freeze({
  dooplications: []
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDooplications":
      return {
        ...state,
        dooplications: [...action.payload]
      }
    default:
    return state
  }
}

export default appReducer;


