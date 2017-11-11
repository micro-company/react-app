import { persistCombineReducers, persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import localForage from 'localforage'
import counter from './counter'
import session from './session'

const config = {
  key: 'react-app',
  storage: localForage,
  blacklist: ['router', 'form'],
}

const sessionPersistConfig = {
  key: 'session',
  storage: localForage,
}

export default persistCombineReducers(config, {
  router,
  form: formReducer,

  session: persistReducer(sessionPersistConfig, session),
  counter,
})
