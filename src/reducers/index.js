import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import counter from './counter'
import session from './session'

export default combineReducers({
  router,
  form: formReducer,

  session,
  counter,
})
