import * as EVENT from '../constants/event'

const initialState = {
  loaded: false,
  event: [],
}

export default function update(state: Object = initialState, action: Object): Object {
  switch (action.type) {
    case EVENT.ADD: {
      return {
        ...state,
        event: [
          ...state.event,
          action.payload,
        ],
      }
    }
    case EVENT.REMOVE: {
      return {
        ...state,
        event: [
          ...state.event.slice(0, action.payload),
          ...state.event.slice(action.payload + 1),
        ],
      }
    }
    default:
      return state
  }
}
