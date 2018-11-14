import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Authenticated from '../../containers/Authenticated'
import Main from '../Main'
import Auth from '../Auth'
import AuthCallback from '../AuthCallback'

import Forbidden from '../403'
import NotFound from '../404'
import InternalServerError from '../500'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

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

      <MuiThemeProvider key="main" theme={theme}>
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
          <Route
            path="/403"
            component={Forbidden}
          />
          <Route
            path="/404"
            component={NotFound}
          />
          <Route
            path="/500"
            component={InternalServerError}
          />
          <Authenticated>
            <Main {...this.props} />
          </Authenticated>
        </Switch>
      </MuiThemeProvider>,
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
