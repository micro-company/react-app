import * as SESSION from '../constants/session'
import * as EVENT from '../constants/event'
import { history } from '../store/configureStore'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  if (response.status === 401) {
    history.push('/auth')
    throw response.json()
  }

  throw response.json()
}

export function login(data) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/auth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(response => {
      dispatch({
        type: SESSION.LOGIN,
        payload: response,
      })

      history.push('/')
    })
    .catch(error => error.then(response => { throw response }))
}

export function registration(data) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/auth/new`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(() => {
      dispatch({
        type: EVENT.ADD,
        payload: {
          message: 'Success registration. Need log in.',
          created_at: new Date(),
        },
      })
    })
    .catch(error => error.then(response => { throw response }))
}

export function logout() {
  return (dispatch, getState) => fetch(`${process.env.REACT_APP_API_URL}/auth`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().session.tokens.access,
    },
  })
    .then(checkStatus)
    .then(() => {
      const timeout = new Date(new Date().getTime() + (1 * 10000))

      dispatch({
        type: EVENT.ADD,
        payload: {
          message: 'Goodbuy',
          created_at: new Date(),
          timeout,
        },
      })

      dispatch({
        type: SESSION.LOGOUT,
        payload: null,
      })
    })
    .catch(error => {
      dispatch({
        type: EVENT.ADD,
        payload: {
          message: 'Goodbuy',
          created_at: new Date(),
          timeout: 60,
        },
      })

      dispatch({
        type: SESSION.LOGOUT,
        payload: null,
      })

      error.then(response => { throw response })
    })
}
