import { persistCombineReducers, persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { reducer as ui } from 'redux-ui'
import localForage from 'localforage'
import counter from './counter'
import session from './session'
import user from './user'

const config = {
  key: 'react-app',
  storage: localForage,
  blacklist: ['router', 'form', 'ui'],
}

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
}

export default persistCombineReducers(config, {
  router,
  form,
  ui,

  session: persistReducer(sessionPersistConfig, session),
  user,
  counter,
})
