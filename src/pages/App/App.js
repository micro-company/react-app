import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Authenticated from '../../containers/Authenticated'
import Main from '../Main'
import Auth from '../Auth'

class App extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    return ([
      <Helmet
        key="helmet"
        title=" "
        titleTemplate="Hello - %s"
      />,

      <Switch key="switch" {...this.props.router}>
        <Route
          exac
          path="/auth"
          component={Auth}
          onUpdate={App.logPageView}
        />
        <Authenticated path="*" component={Main} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
