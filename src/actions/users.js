import * as USER from '../constants/user'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  throw response.json()
}

export function list() {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/users/${data.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
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
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
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
