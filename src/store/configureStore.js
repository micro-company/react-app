import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import jwt from '../middleware/jwt'
import rootReducer from '../reducers'

export const history = createHistory()

const enhancers = []

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-underscore-dangle */
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  enhancers.push(devTools)
  /* eslint-enable */
}

const store = createStore(
  rootReducer,
  ...enhancers,
  applyMiddleware(jwt, thunk, routerMiddleware(history)),
)

export const persistor = persistStore(store)

export default store
