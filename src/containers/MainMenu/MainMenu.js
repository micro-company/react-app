import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ExitIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home'
import { logout } from '../../actions/session'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    display: 'grid',
    overflowX: 'hidden',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    display: 'grid',
    flexDirection: 'column',
    gridTemplateRows: '1fr auto',
  },
  typeContainer: {
    height: '100%',
  },
  user: {
    flex: 0,
    paddingLeft: 0,
    backgroundColor: theme.palette.background.default,
  },
  userItem: {
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  activeLink: {
    '&>li': {
      background: theme.palette.primary[100],
    },
  },
})

class MainMenu extends PureComponent {
  static propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,

    logoutAction: PropTypes.func.isRequired,
    onChangeDrawer: PropTypes.func.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <SwipeableDrawer
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.openDrawer && classes.drawerPaperClose),
        }}
        open={this.props.openDrawer}
        onOpen={() => this.props.onChangeDrawer(true)}
        onClose={() => this.props.onChangeDrawer(false)}
      >
        <div className={classes.drawerInner}>
          <List>
            <NavLink to="/" exact activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Home" />
              </ListItem>
            </NavLink>

            <NavLink to="/users" exact activeClassName={classes.activeLink}>
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>

                <ListItemText primary="Users" />
              </ListItem>
            </NavLink>
          </List>

          <List className={classes.user}>
            <ListItem className={classes.userItem}>
              <ListItemIcon>
                <Avatar alt="Remy Sharp">
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.props.logoutAction}
              >
                Logout &nbsp;
                <ExitIcon />
              </Button>
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: bindActionCreators(logout, dispatch),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainMenu)))
