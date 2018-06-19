import React from 'react'
import Radio from '@material-ui/core/Radio'
import PropTypes from 'prop-types'

function RadioField({
  input: {
    checked, name, onChange, value, ...restInput
  },
  meta,
  ...rest
}) {
  return (
    <Radio
      {...rest}
      name={name}
      inputProps={restInput}
      onChange={onChange}
      checked={checked}
    />
  )
}

RadioField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export default RadioField
