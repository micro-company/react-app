import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Form extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const { onSubmit } = this.props

    return (
      <form onSubmit={onSubmit} />
    )
  }
}

export default Form
