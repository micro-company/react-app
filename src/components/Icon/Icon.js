import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import IconComponents from './iconComponent'

const styles = () => ({
  Icon: {
    position: 'relative',
    fill: 'currentColor',
    color: 'currentColor',
  },
})

class Icon extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    style: {},
    onClick: () => {},
    className: undefined,
  }

  render() {
    return (
      <span
        style={this.props.style}
        role="presentation"
        className={classnames(styles.Icon, this.props.className)}
        onClick={this.props.onClick}
        onKeyPress={this.props.onClick}
      >
        {IconComponents[this.props.name]}
      </span>
    )
  }
}

export default withStyles(styles)(Icon)
