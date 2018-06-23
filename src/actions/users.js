import * as SESSION from '../constants/session'
import * as USER from '../constants/user'
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

export function list() {
  return (dispatch, getState) => fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().session.tokens.access,
    },
    credentials: 'include',
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => {
      dispatch({
        type: USER.LIST,
        payload: response,
      })
    })
    .catch(error => error.then(response => { throw response }))
}

export function add(data) {
  return (dispatch, getState) => fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().session.tokens.access,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => {
      dispatch({
        type: USER.ADD,
        payload: response,
      })

      return response
    })
    .catch(error => error.then(response => { throw response }))
}

export function update(data) {
  return (dispatch, getState) => fetch(`${process.env.REACT_APP_API_URL}/users/${data.id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().session.tokens.access,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => {
      dispatch({
        type: USER.UPDATE,
        payload: response,
      })
    })
    .catch(error => error.then(response => { throw response }))
}

export function remove(data) {
  return (dispatch, getState) => fetch(`${process.env.REACT_APP_API_URL}/users/${data.id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getState().session.tokens.access,
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then(response => checkStatus(response, dispatch))
    .then(response => {
      dispatch({
        type: USER.REMOVE,
        payload: response,
      })
    })
    .catch(error => error.then(response => { throw response }))
}
