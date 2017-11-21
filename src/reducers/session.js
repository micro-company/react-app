import jwt from 'jsonwebtoken'
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
        ...action.payload,
        user: jwt.decode(action.payload.tokens.access),
        isAuthenticated: true,
      }
    }
    default:
      return state
  }
}
