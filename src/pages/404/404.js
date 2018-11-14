import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = () => {}

class Forbidden extends PureComponent { // eslint-disable-line
  render() {
    return (
      <Typography component="h2" variant="h2" gutterBottom>
        404 Not Found
      </Typography>
    )
  }
}

export default withStyles(styles)(Forbidden)
