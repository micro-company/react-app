import _ from 'lodash'
import isFuture from 'date-fns/is_future'
import * as SESSION from '../../constants/session'
import { refresh } from '../../actions/session'

export default store => next => action => {
  // only worry about expiring token for async actions
  const isAuthPage = !window.location.pathname.includes('auth')

  if (action.type && isAuthPage) {
    const time = _.get(store.getState(), 'session.user.exp', false)
    const timeForRefresh = process.env.REACT_REFRESH_TIME || 180
    const expTime = new Date((time - timeForRefresh) * 1000)
    const isExp = isFuture(expTime)
    const isAuthenticated = _.get(store.getState(), 'session.isAuthenticated')

    if (!isExp && isAuthenticated) {
      const tokenRefresh = _.get(store.getState(), 'session.tokens.refresh', false)
      const isRequestRefreshToken = _.get(store.getState(), 'session.request.refreshToken', false)

      // make sure we are not already refreshing the token
      if (!isRequestRefreshToken && action.type && action.type !== SESSION.REQUEST_REFRESH_TOKEN) {
        store.dispatch(refresh(tokenRefresh))
          .then(() => next(action))
          .catch(error => console.warn('ERROR', error))
      }
    }
  }

  return next(action)
}
