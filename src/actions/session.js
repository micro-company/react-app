import * as SESSION from '../constants/session'
import { history } from '../store/configureStore'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  throw response.json()
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
    .then(response => {
      dispatch({
        type: SESSION.LOGIN,
        payload: response,
      })

      history.push('/')
    })
    .catch(error => error.then(response => { throw response }))
}
