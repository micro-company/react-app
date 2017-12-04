import * as EVENT from '../constants/event'

export const remove = index => dispatch => {
  dispatch({
    type: EVENT.REMOVE,
    payload: index,
  })
}
