import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

function TextFieldForm({
  input: {
    name, onChange, value, ...restInput
  },
  meta,
  ...rest
}) {
  return (
    <TextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
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
