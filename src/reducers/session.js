import * as SESSION from '../constants/session'

const initialState = {
  isAuthenticated: false,
  tokens: {
    access: null,
    refresh: null,
  },
}

export default function update(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case SESSION.LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        tokens: action.payload,
      }
    }
    default:
      return state
  }
}
