import * as SESSION from '../constants/session'
import * as EVENT from '../constants/event'
import { history } from '../store/configureStore'

function checkStatus(response, dispatch) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  if (response.status === 401) {
    dispatch({
      type: SESSION.LOGOUT,
      payload: response,
    })

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
    .then(response => checkStatus(response, dispatch))
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
    .then(response => checkStatus(response, dispatch))
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
    .then(response => checkStatus(response, dispatch))
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

export function recovery(data) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/auth/recovery`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => checkStatus(response, dispatch))
    .catch(error => formError(error))
}

export function recoveryPassword(data) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/auth/recovery/${data.recoveryToken}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => checkStatus(response, dispatch))
    .catch(error => formError(error))
}

export function refresh(tokenRefresh) {
  return dispatch => {
    dispatch({
      type: SESSION.REQUEST_REFRESH_TOKEN,
      payload: true,
    })

    return fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: tokenRefresh,
      },
    })
      .then(response => checkStatus(response, dispatch))
      .then(response => {
        dispatch({
          type: SESSION.REQUEST_REFRESH_TOKEN,
          payload: false,
        })

        dispatch({
          type: SESSION.LOGIN,
          payload: response,
        })
      })
      .catch(error => {
        dispatch({
          type: SESSION.REQUEST_REFRESH_TOKEN,
          payload: false,
        })

        formError(error)
      })
  }
}

export function oauthRequest(type) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/oauth/${type}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => response)
    .catch(error => {
      dispatch({
        type: SESSION.REQUEST_REFRESH_TOKEN,
        payload: false,
      })

      formError(error)
    })
}

export function oauthGetProtectedResources({ name, code }) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/oauth/callback/${name}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => response)
    .catch(error => {
      dispatch({
        type: SESSION.REQUEST_REFRESH_TOKEN,
        payload: false,
      })

      formError(error)
    })
}

export function oauthLogin(data) {
  return dispatch => dispatch({
    type: SESSION.LOGIN,
    payload: data,
  })
}
