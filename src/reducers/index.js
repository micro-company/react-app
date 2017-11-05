import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counter'
import session from './session'

export default combineReducers({
  router,

  session,
  counter,
})
