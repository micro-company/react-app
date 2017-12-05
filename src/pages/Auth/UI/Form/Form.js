import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import Recaptcha from 'react-google-recaptcha'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Tabs, { Tab } from 'material-ui/Tabs'
import getForm from './getForm'

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
        <CardContent>
          <Tabs
            value={mode}
            onChange={onChangeMode}
            centered
          >
            <Tab label="LOG IN" value="logIn" />
            <Tab label="SIGN ON" value="signOn" />
          </Tabs>

          <form onSubmit={handleSubmit}>
            { getForm(mode) }
          </form>

          <Recaptcha
            className={this.props.classes.recaptcha}
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
            onChange={this.props.onRecaptcha}
            theme="light"
          />

          <p>
            { error.length ? 'We have probelem:' : null }
            {
              error.map((issue, index) => <p key={index}>{issue}</p>) // eslint-disable-line
            }
          </p>
        </CardContent>

        <CardActions>
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
})(Auth)
