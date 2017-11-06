import { submit } from 'redux-form'

export function submitForm(name) {
  return dispatch => dispatch(submit(name))
}
