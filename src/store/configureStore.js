import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers'

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
]

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-underscore-dangle */
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  enhancers.push(devTools)
  /* eslint-enable */
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)

export default store
