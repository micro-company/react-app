import * as EVENT from '../constants/event'

export const remove = index => dispatch => {
  dispatch({
    type: EVENT.REMOVE,
    payload: index,
  })
}

export const check = () => dispatch => {
  dispatch({
    type: EVENT.CHECK,
    payload: null,
  })
}
