import React from 'react'
import { Field } from 'redux-form'
import { MenuItem } from 'material-ui/Menu'
import { TextField, Select } from 'redux-form-material-ui'

export default function getForm(currentTab) {
  switch (currentTab) {
    case 'recovery':
      return [
        <Field
          key="mail"
          name="mail"
          label="Mail"
          component={TextField}
          fullWidth
        />,
      ]
    case 'recoveryPassword':
      return [
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
      ]
    case 'signOn':
      return [
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
