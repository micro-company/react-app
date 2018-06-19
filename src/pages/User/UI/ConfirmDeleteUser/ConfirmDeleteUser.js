import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

export default Form
