import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { oauthLogin, oauthGetProtectedResources } from '../../actions/session'

class AuthCallback extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,

    oauthLoginActions: PropTypes.func.isRequired,
    oauthGetProtectedResourcesActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const { type, name } = props.match.params

    if (type === 'callback') {
      // Get params
      const url = new URL(window.location.href)
      const code = url.searchParams.get('code')

      this.props.oauthGetProtectedResourcesActions({ name, code })
        .then(response => {
          if (response.tokens) {
            this.props.oauthLoginActions(response)
          }
        })
    }
  }

  render() {
    return (
      <Fragment>
        <Helmet title="AuthCallback" />
      </Fragment>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    oauthGetProtectedResourcesActions: bindActionCreators(oauthGetProtectedResources, dispatch),
    oauthLoginActions: bindActionCreators(oauthLogin, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AuthCallback))
