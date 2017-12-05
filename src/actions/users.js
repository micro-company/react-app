import * as USER from '../constants/user'
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
    .then(checkStatus)
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
    .then(checkStatus)
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
    .then(checkStatus)
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
    .then(checkStatus)
    .then(response => {
      dispatch({
        type: USER.REMOVE,
        payload: response,
      })
    })
    .catch(error => error.then(response => { throw response }))
}
