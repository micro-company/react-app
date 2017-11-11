import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { MenuItem } from 'material-ui/Menu'
import { TextField, Select } from 'redux-form-material-ui'

class Auth extends PureComponent {
  static propTypes = {
    currentTab: PropTypes.string.isRequired,

    handleSubmit: PropTypes.func.isRequired,
  }

  getForm(currentTab) { // eslint-disable-line
    switch (currentTab) {
      case 'signOn':
        return [
          <Field
            key="login"
            name="login"
            label="Login"
            component={TextField}
            fullWidth
          />,

          <Field
            key="mail"
            name="mail"
            label="Mail"
            component={TextField}
            fullWidth
          />,

          <Field
            key="password"
            name="password"
            label="Password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="retryPassword"
            name="retryPassword"
            label="Retry password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="language"
            name="language"
            component={Select}
            fullWidth
          >
            <MenuItem value="ru_RU">Russia</MenuItem>
            <MenuItem value="en_GB">English</MenuItem>
          </Field>,
        ]
      case 'logIn':
      default:
        return [
          <Field
            key="login"
            name="login"
            label="Login"
            component={TextField}
            fullWidth
          />,

          <Field
            key="password"
            name="password"
            label="Password"
            type="password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="language"
            name="language"
            component={Select}
            fullWidth
          >
            <MenuItem value="ru_RU">Russia</MenuItem>
            <MenuItem value="en_GB">English</MenuItem>
          </Field>,
        ]
    }
  }

  render() {
    const { handleSubmit, currentTab } = this.props

    return (
      <form onSubmit={handleSubmit}>
        { this.getForm(currentTab) }
      </form>
    )
  }
}

export default reduxForm({
  form: 'AUTH_FORM',
  anyTouched: true,
})(Auth)
