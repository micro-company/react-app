import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/es/integration/react'
import 'react-table/react-table.css'
import store, { history, persistor } from './store/configureStore'
import App from './pages/App'
import Loading from './components/Loading'

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate
        loading={<Loading />}
        persistor={persistor}
      >
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  ), document.getElementById('root'),
)
