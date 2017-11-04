import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class Authenticated extends PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Route
        exac
        path="*"
        render={() => (
          this.props.isAuthenticated ? (
            React.createElement(this.props.component, this.props)
          ) : (
            <Redirect
              to={{
                pathname: '/auth',
                state: { from: this.props.location },
              }}
            />
          ))}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.session.isAuthenticated,
  }
}

function mapDispatchToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authenticated)
