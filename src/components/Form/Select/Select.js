import React from 'react'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'

function TextFieldForm({
  input: {
    name, onChange, value, ...restInput
  },
  meta,
  ...rest
}) {
  return (
    <Select
      {...rest}
      name={name}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />
  )
}

TextFieldForm.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export default TextFieldForm
