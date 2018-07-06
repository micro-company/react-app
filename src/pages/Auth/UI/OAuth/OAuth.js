import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { oauthRequest } from '../../../../actions/session'

const styles = theme => ({
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class OAuth extends PureComponent { // eslint-disable-line
  static propTypes = {
    classes: PropTypes.object.isRequired,

    oauthRequestActions: PropTypes.func.isRequired,
  }

  constructor() {
    super()

    this.onClickOauth = this.onClickOauth.bind(this)
  }

  onClickOauth(type) {
    this.props.oauthRequestActions(type)
      .then(response => window.open(response.url, '_blank'))
  }

  render() {
    const { classes } = this.props

    return (
      <span className={classes.box}>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
          onClick={() => this.onClickOauth('google')}
        >
          Google
        </Button>

        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
          onClick={() => this.onClickOauth('github')}
        >
          Github
        </Button>
      </span>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    oauthRequestActions: bindActionCreators(oauthRequest, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(OAuth))
