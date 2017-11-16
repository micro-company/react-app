import * as USER from '../constants/user'
import { arrayListToObjectArray } from '../utils/structure'

const initialState = {
  loaded: false,
  users: {},
}

export default function update(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case USER.LIST: {
      return {
        ...state,
        users: arrayListToObjectArray(action.payload),
      }
    }
    case USER.UPDATE:
    case USER.ADD: {
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.id]: action.payload,
        },
      }
    }
    case USER.REMOVE: {
      const STATE = state
      delete STATE.users[action.payload.id]
      return STATE
    }
    default:
      return state
  }
}
