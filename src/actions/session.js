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

function formError(error) {
  if (error && typeof error.then === 'function') {
    return error.then(response => { throw response })
  }

  throw { error: { _error: ['Problem with connect to server'] } } // eslint-disable-line
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
    .catch(error => formError(error))
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
    .catch(error => formError(error))
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
    .then(() => dispatch({
      type: SESSION.LOGOUT,
      payload: null,
    }))
    .catch(error => {
      dispatch({
        type: SESSION.LOGOUT,
        payload: null,
      })

      formError(error)
    })
}
