import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

class Form extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit} />
    )
  }
}

export default reduxForm({
  form: 'USER_FORM',
  anyTouched: true,
})(Form)
