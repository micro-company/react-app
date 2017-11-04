import * as COUNTER from '../constants/counter'

export const increment = () => (dispatch) => {
  dispatch({
    type: COUNTER.INCREMENT_REQUESTED,
  })

  dispatch({
    type: COUNTER.INCREMENT,
  })
}

export const incrementAsync = () => (dispatch) => {
  dispatch({
    type: COUNTER.INCREMENT_REQUESTED,
  })

  return setTimeout(() => {
    dispatch({
      type: COUNTER.INCREMENT,
    })
  }, 3000)
}

export const decrement = () => (dispatch) => {
  dispatch({
    type: COUNTER.DECREMENT_REQUESTED,
  })

  dispatch({
    type: COUNTER.DECREMENT,
  })
}

export const decrementAsync = () => (dispatch) => {
  dispatch({
    type: COUNTER.DECREMENT_REQUESTED,
  })

  return setTimeout(() => {
    dispatch({
      type: COUNTER.DECREMENT,
    })
  }, 3000)
}
