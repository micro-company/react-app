import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { submitForm } from '../../actions/form'
import { login, registration, recovery, recoveryPassword } from '../../actions/session'
import FormAuth from './UI/Form'

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
})

class Auth extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    submitFormActions: PropTypes.func.isRequired,
    loginActions: PropTypes.func.isRequired,
    registrationActions: PropTypes.func.isRequired,
    recoveryActions: PropTypes.func.isRequired,
    recoveryPasswordActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    const mode = props.match.params.recoveryToken ? 'recoveryPassword' : 'logIn'

    this.state = {
      captcha: '',
      mode,
      isNotify: false,
    }

    this.onSendForm = this.onSendForm.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onChangeMode = this.onChangeMode.bind(this)
  }

  onChangeMode(event, value) { this.setState({ mode: value }) }
  onSendForm = () => this.props.submitFormActions('AUTH_FORM')
  onRecaptcha = value => this.setState({ captcha: value })

  onSubmitForm(data) {
    switch (this.state.mode) {
      case 'logIn':
        return this.props.loginActions({
          ...data,
          captcha: this.state.captcha,
        })
          .catch(error => { throw new SubmissionError(error.error) })
      case 'signOn':
        return this.props.registrationActions({
          ...data,
          captcha: this.state.captcha,
        })
          .then(() => { this.setState({ isNotify: true }) })
          .catch(error => { throw new SubmissionError(error.error) })
      case 'recovery':
        return this.props.recoveryActions({
          ...data,
          captcha: this.state.captcha,
        })
          .then(() => { this.setState({ isNotify: true }) })
          .catch(error => { throw new SubmissionError(error.error) })
      case 'recoveryPassword':
        return this.props.recoveryPasswordActions({
          ...data,
          captcha: this.state.captcha,
          recoveryToken: this.props.match.params.recoveryToken,
        })
          .then(() => { this.setState({ isNotify: true }) })
          .catch(error => { throw new SubmissionError(error.error) })
      default:
        return false
    }
  }

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') { return }
    this.setState({ isNotify: false })
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Helmet title="Auth" />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.isNotify}
          autoHideDuration={6000}
          onClose={this.handleRequestClose}
          message={<span>Data sent to the specified mail</span>}
          action={[
            <IconButton
              color="inherit"
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />

        <Grid container className={classes.root} spacing={0} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={0} justify="center">
              <Grid item xs={10} sm={5} md={5} lg={5} xl={3} sd={2}>
                <FormAuth
                  mode={this.state.mode}

                  onChangeMode={this.onChangeMode}
                  onRecaptcha={this.onRecaptcha}
                  onSendForm={this.onSendForm}
                  onSubmit={this.onSubmitForm}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    submitFormActions: bindActionCreators(submitForm, dispatch),

    loginActions: bindActionCreators(login, dispatch),
    registrationActions: bindActionCreators(registration, dispatch),
    recoveryActions: bindActionCreators(recovery, dispatch),
    recoveryPasswordActions: bindActionCreators(recoveryPassword, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(Auth)))
