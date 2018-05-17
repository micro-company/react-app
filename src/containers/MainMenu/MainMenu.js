import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ExitIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import HomeIcon from '@material-ui/icons/Home'
import { logout } from '../../actions/session'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    overflowX: 'hidden',
    position: 'relative',
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
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
  }

  render() {
    const { classes } = this.props

    return (
      <Drawer
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.openDrawer && classes.drawerPaperClose),
        }}
        open={this.props.openDrawer}
      >
        <div className={classes.drawerInner}>
          <Grid container direction="column" justify="space-between" classes={{ typeContainer: classes.typeContainer }} spacing={0}>
            <Grid item>
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
            </Grid>

            <Grid item>
              <List className={classes.user}>
                <ListItem className={classes.userItem}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp">
                      <PersonIcon />
                    </Avatar>
                  </ListItemIcon>

                  <Button
                    variant="raised"
                    color="secondary"
                    onClick={this.props.logoutAction}
                  >
                    Logout &nbsp;
                    <ExitIcon />
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>
      </Drawer>
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
