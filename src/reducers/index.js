import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import session from './session'

export default combineReducers({
  routing: routerReducer,

  session,
  counter,
})
