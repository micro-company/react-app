import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import UpdateIcon from '@material-ui/icons/Update'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
  },
  button: {
    margin: theme.spacing.unit,
  },
  typography: {
    margin: theme.spacing.unit,
  },
})

class HeaderUserList extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,

    listActions: PropTypes.func.isRequired,
    onChangeAddUserDialog: PropTypes.func.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.box}>
        <Typography
          variant="h5"
          gutterBottom
          className={classes.typography}
        >
          Users list
        </Typography>

        <Tooltip placement="bottom" title="Update users list">
          <Fab
            mini
            color="primary"
            aria-label="update"
            className={classes.button}
            onClick={this.props.listActions}
          >
            <UpdateIcon />
          </Fab>
        </Tooltip>

        <Tooltip placement="bottom" title="Add user">
          <Fab
            mini
            color="primary"
            aria-label="add"
            className={classes.button}
            onClick={this.props.onChangeAddUserDialog}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    )
  }
}

export default withStyles(styles)(HeaderUserList)
