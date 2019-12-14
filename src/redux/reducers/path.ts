const STATE = {
  path: ''
}
const path = (state = STATE, action: any) => {
  switch (action.type) {
    case 'setPath': {
      state.path = action.path
      return {
        path: action.path,
        ...state
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default path