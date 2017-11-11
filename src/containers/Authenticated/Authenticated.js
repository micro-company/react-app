import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

class Authenticated extends PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
  }

  render() {
    const { isAuthenticated } = this.props

    return (
      <Route
        path="*"
        render={() => (
          isAuthenticated ? this.props.children : (
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authenticated))
