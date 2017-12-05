import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import InboxIcon from 'material-ui-icons/Inbox'
import Person from 'material-ui-icons/Person'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
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
                <Link to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>

                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>

                <Link to="/users">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>

                    <ListItemText primary="Users" />
                  </ListItem>
                </Link>

                <Link to="/about-us">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>

                    <ListItemText primary="About" />
                  </ListItem>
                </Link>
              </List>
            </Grid>

            <Grid item>
              <List className={classes.user}>
                <ListItem className={classes.userItem}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp">
                      <Person />
                    </Avatar>
                  </ListItemIcon>

                  <Button
                    raised
                    color="accent"
                    onClick={this.props.logoutAction}
                  >
                    Logout
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainMenu))
