import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { reduxForm } from 'redux-form'
import Recaptcha from 'react-google-recaptcha'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Tabs, { Tab } from 'material-ui/Tabs'
import { FormHelperText } from 'material-ui/Form'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import getForm from './getForm'

const styles = () => ({
  root: {
    padding: 0,
  },
  form: {
    margin: '1em',
  },
  button: {
    flex: 1,
    padding: 0,
    margin: 0,
    height: '100%',
  },
  recaptcha: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class Auth extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.array,
    mode: PropTypes.string.isRequired,

    handleSubmit: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    onSendForm: PropTypes.func.isRequired,
    onRecaptcha: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: [],
  }

  render() {
    const {
      mode, error, handleSubmit, onChangeMode,
    } = this.props

    return (
      <Card>
        <CardContent className={this.props.classes.root}>
          <AppBar position="static">
            <Tabs
              value={mode}
              onChange={onChangeMode}
              fullWidth
            >
              <Tab label="LOG IN" value="logIn" />
              <Tab label="SIGN ON" value="signOn" />
              <Tab label="RECOVERY" value="recovery" />
            </Tabs>
          </AppBar>

          <form
            className={this.props.classes.form}
            onSubmit={handleSubmit}
          >
            { getForm(mode) }
          </form>

          <Recaptcha
            className={this.props.classes.recaptcha}
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
            onChange={this.props.onRecaptcha}
            theme="light"
          />

          { error.length ? (
            <Typography type="subheading" gutterBottom>
              We have probelem:
            </Typography>
          ) : null }
          <ul>
            {
              error.map((issue, index) => <FormHelperText error key={index}>{issue}</FormHelperText>) // eslint-disable-line
            }
          </ul>
        </CardContent>

        <CardActions className={this.props.classes.root}>
          <Button
            className={this.props.classes.button}
            color="primary"
            raised
            onClick={this.props.onSendForm}
          >
            Send
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default reduxForm({
  form: 'AUTH_FORM',
  anyTouched: true,
})(withStyles(styles)(Auth))
