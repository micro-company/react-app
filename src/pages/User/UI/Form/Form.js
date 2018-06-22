import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '../../../../components/Form/TextField'
import Select from '../../../../components/Form/Select'

class FormUser extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    initialValues: {},
  }

  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        initialValues={this.props.initialValues}
        render={({ handleSubmit }) => (
          <form id="UserFormId" onSubmit={handleSubmit}>
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
            <FormControl style={{ width: '100%' }}>
              <InputLabel htmlFor="controlled-open-select">
Language
              </InputLabel>
              <Field
                name="language"
                component={Select}
                fullWidth
              >
                <MenuItem value="ru_RU">
Russia
                </MenuItem>
                <MenuItem value="en_GB">
English
                </MenuItem>
              </Field>
            </FormControl>
          </form>
        )}
      />
    )
  }
}

export default FormUser
