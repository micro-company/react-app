import jwt from 'jsonwebtoken'
import * as SESSION from '../constants/session'

const initialState = {
  isAuthenticated: false,
  tokens: {
    access: null,
    refresh: null,
  },
  request: {
    refreshToken: false,
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
    case SESSION.LOGOUT: {
      return initialState
    }
    case SESSION.REQUEST_REFRESH_TOKEN: {
      return {
        ...state,
        request: {
          ...state.request,
          refreshToken: action.payload,
        },
      }
    }
    default:
      return state
  }
}
