import * as COUNTER from '../constants/counter'

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTER.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true,
      }

    case COUNTER.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing,
      }

    case COUNTER.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true,
      }

    case COUNTER.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing,
      }

    default:
      return state
  }
}
