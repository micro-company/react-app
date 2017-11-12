import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import InboxIcon from 'material-ui-icons/Inbox'
import Person from 'material-ui-icons/Person'

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
  divider: {
    flex: 1,
  },
  user: {
    flex: 0,
    paddingLeft: 5,
    backgroundColor: theme.palette.background.default,
  },
})

class MiniDrawer extends PureComponent {
  static propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
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
          <List>
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>

                <ListItemText primary="Home" />
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

          <div className={classes.divider} />

          <List className={classes.user} >
            <Link to="#user">
              <ListItem button className={classes.user}>
                <ListItemIcon>
                  <Avatar alt="Remy Sharp">
                    <Person />
                  </Avatar>
                </ListItemIcon>

                <ListItemText primary="USER" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(MiniDrawer)
