import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class OAuth extends PureComponent { // eslint-disable-line
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <span className={classes.box}>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
        >
          Google
        </Button>

        <Button
          color="secondary"
          variant="outlined"
          className={classes.button}
        >
          Github
        </Button>
      </span>
    )
  }
}

export default withStyles(styles)(OAuth)
