import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-final-form-generator'

class FormUser extends PureComponent {
  static propTypes = {
    initialValues: PropTypes.object,

    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    initialValues: {},
  }

  constructor() {
    super()

    this.state = {
      form: [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
        },
        {
          name: 'retryPassword',
          label: 'Retry password',
          type: 'TextField',
        },
        {
          name: 'language',
          label: 'Language',
          type: 'Select',
          option: [
            {
              value: 'ru_RU',
              label: 'Russia',
            },
            {
              value: 'en_GB',
              label: 'English',
            },
          ],
        },
      ],
    }
  }

  render() {
    return (
      <Form
        id="UserFormId"
        fields={this.state.form}
        initialValues={this.props.initialValues}

        onSubmit={this.props.onSubmit}
      />
    )
  }
}

export default FormUser
