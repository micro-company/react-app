import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  header: {
    flexBasis: 0,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

const Header = React.memo(props => (
  <AppBar
    position="static"
    color="default"
    className={classNames(props.classes.appBar, props.classes.appBarShift)}
    onClick={() => props.onChangeDrawer()}
  >
    <Toolbar>
      <IconButton className={props.classes.menuButton} color="primary" aria-label="Menu">
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" color="inherit">
        Hello World
      </Typography>
    </Toolbar>
  </AppBar>
))

Header.propTypes = {
  classes: PropTypes.object.isRequired,

  onChangeDrawer: PropTypes.func.isRequired,
}

export default withStyles(styles)(Header)
