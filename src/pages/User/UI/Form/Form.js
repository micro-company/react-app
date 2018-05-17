import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { MenuItem } from '@material-ui/core/Menu'
import { TextField, Select } from 'redux-form-material-ui'

class Form extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          key="mail"
          name="mail"
          label="Mail"
          component={TextField}
          fullWidth
        />
        <Field
          key="password"
          name="password"
          label="Password"
          component={TextField}
          fullWidth
        />
        <Field
          key="retryPassword"
          name="retryPassword"
          label="Retry password"
          component={TextField}
          fullWidth
        />
        <Field
          key="language"
          name="language"
          component={Select}
          fullWidth
        >
          <MenuItem value="ru_RU">Russia</MenuItem>
          <MenuItem value="en_GB">English</MenuItem>
        </Field>
      </form>
    )
  }
}

export default reduxForm({
  form: 'USER_FORM',
  anyTouched: true,
})(Form)
