import { persistCombineReducers, persistReducer } from 'redux-persist'
import { connectRouter } from 'connected-react-router'
import { reducer as ui } from 'redux-ui'
import localForage from 'localforage'
import counter from './counter'
import session from './session'
import user from './user'
import event from './event'

const config = {
  key: 'react-app',
  storage: localForage,
  blacklist: ['router', 'ui'],
}

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
}

export default history => persistCombineReducers(config, {
  router: connectRouter(history),
  ui,

  session: persistReducer(sessionPersistConfig, session),
  user,
  event,
  counter,
})
