import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Route } from 'react-router-dom'
import ui from 'redux-ui'
import Header from './UI/Header'
import Drawer from './UI/Drawer'
import Home from '../Home'
import User from '../User'
import About from '../About'

const styles = theme => ({
  rootItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  box: {
    flex: 1,
  },
  boxItem: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
  },
})

class Main extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,

    updateUI: PropTypes.func.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container direction="column" spacing={0}>
        <Grid item xs={12} className={classes.rootItem}>
          <Header openDrawer={this.props.ui.openDrawer} updateUI={this.props.updateUI} />

          <Grid container spacing={0} className={classes.box}>
            <Grid item xs={12} className={classes.boxItem}>
              <Grid container direction="row" spacing={0}>
                <Drawer openDrawer={this.props.ui.openDrawer} />

                <main className={classes.content}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={User} />
                  <Route exact path="/about-us" component={About} />
                </main>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default ui({
  state: {
    openDrawer: false,
  },
})(withStyles(styles)(Main))
