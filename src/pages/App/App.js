import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Authenticated from '../../containers/Authenticated'
import Main from '../Main'
import Auth from '../Auth'
import AuthCallback from '../AuthCallback'

class App extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    return ([
      <Helmet
        key="helmet"
        titleTemplate="Hello - %s"
      />,

      <Switch key="switch" {...this.props.router}>
        <Route
          path="/recovery/:recoveryToken"
          component={Auth}
        />
        <Route
          path="/auth/:type/:name"
          component={AuthCallback}
        />
        <Route
          path="/auth"
          component={Auth}
        />
        <Authenticated>
          <Main {...this.props} />
        </Authenticated>
      </Switch>,
    ])
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}

function mapDispatchToProps() {
  return {}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App))
