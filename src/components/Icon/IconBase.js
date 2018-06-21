import React from 'react'
import PropTypes from 'prop-types'

const IconBase = ({
  children, color, size, style, ...props
}, { reactIconBase = {} }) => {
  const computedSize = size || reactIconBase.size || '1em'

  return (
    <svg
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      height={computedSize}
      width={computedSize}
      {...reactIconBase}
      {...props}
      style={{
        color: color || reactIconBase.color,
        ...(reactIconBase.style || {}),
        ...style,
      }}
    >
      {children}
    </svg>
  )
}

IconBase.defaultProps = {
  children: undefined,
  color: undefined,
  size: undefined,
  style: {},
}

IconBase.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.object,
}

IconBase.contextTypes = {
  reactIconBase: PropTypes.shape(IconBase.propTypes),
}

export default IconBase
