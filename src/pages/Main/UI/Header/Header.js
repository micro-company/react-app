import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Typography from 'material-ui/Typography'

const styles = () => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

function Header(props) {
  return (
    <Grid item xs={12}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton className={props.classes.menuButton} color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>

          <Typography type="title" color="inherit">
            Hello World
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)
