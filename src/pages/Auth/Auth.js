import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import Grid from 'material-ui/Grid'
import { submitForm } from '../../actions/form'
import { login } from '../../actions/session'
import FormAuth from './UI/Form'

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  button: {
    flex: 1,
  },
  recaptcha: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class Auth extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,

    submitFormActions: PropTypes.func.isRequired,
    loginActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      captcha: '',
    }

    this.onSendForm = this.onSendForm.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onSendForm = () => this.props.submitFormActions('AUTH_FORM')
  onRecaptcha = value => this.setState({ captcha: value })

  onSubmitForm = data => this.props.loginActions({
    ...data,
    captcha: this.state.captcha,
  })

  render() {
    const { classes } = this.props

    return ([
      <Helmet key="auth" title="Auth" />,

      <Grid container className={classes.root} key="content" alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={10} sm={5} md={4} lg={3} sd={2} xl={2}>
              <FormAuth
                classes={classes}

                onRecaptcha={this.onRecaptcha}
                onSendForm={this.onSendForm}
                onSubmit={this.onSubmitForm}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>,
    ])
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    submitFormActions: bindActionCreators(submitForm, dispatch),
    loginActions: bindActionCreators(login, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Auth))
