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

    handleSubmit: PropTypes.func.isRequired,
    onSendForm: PropTypes.func.isRequired,
    onRecaptcha: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTab: 'logIn',
    }

    this.onSelectTab = this.onSelectTab.bind(this)
  }

  onSelectTab(event, value) {
    this.setState({ currentTab: value })
  }

  render() {
    const { handleSubmit } = this.props
    const { currentTab } = this.state

    return (
      <Card>
        <CardContent>
          <Tabs
            value={currentTab}
            onChange={this.onSelectTab}
            centered
          >
            <Tab label="LOG IN" value="logIn" />
            <Tab label="SIGN ON" value="signOn" />
          </Tabs>

          <form onSubmit={handleSubmit}>
            { getForm(currentTab) }
          </form>

          <Recaptcha
            className={this.props.classes.recaptcha}
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
            onChange={this.props.onRecaptcha}
            theme="light"
          />
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
