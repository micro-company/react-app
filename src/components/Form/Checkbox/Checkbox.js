import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'

function CheckboxField({
  input: {
    checked, name, onChange, value, ...restInput
  },
  meta,
  ...rest
}) {
  return (
    <Checkbox
      {...rest}
      name={name}
      inputProps={restInput}
      onChange={onChange}
      checked={checked}
    />
  )
}

CheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export default CheckboxField
