import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

class User extends PureComponent {
  static propTypes = {}

  render() {
    return [
      <Helmet key="user" title="User" />,

      <div key="content">
        <h1>User</h1>
      </div>,
    ]
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User)
