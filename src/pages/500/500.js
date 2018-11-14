import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = () => {}

class Forbidden extends PureComponent { // eslint-disable-line
  render() {
    return (
      <Typography component="h2" variant="h2" gutterBottom>
        500 Internal Server Error
      </Typography>
    )
  }
}

export default withStyles(styles)(Forbidden)
