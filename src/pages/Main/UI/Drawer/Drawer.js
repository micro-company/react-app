import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import InboxIcon from 'material-ui-icons/Inbox'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
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
})

class MiniDrawer extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      openDrawer: true,
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Drawer
        type="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.openDrawer && classes.drawerPaperClose),
        }}
        open={this.state.openDrawer}
      >
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
      </Drawer>
    )
  }
}

export default withStyles(styles)(MiniDrawer)
