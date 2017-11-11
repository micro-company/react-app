import * as SESSION from '../constants/session'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function login(data) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(response => dispatch({
      type: SESSION.LOGIN,
      payload: response,
    }))
    .catch(error => console.error(error))
}
