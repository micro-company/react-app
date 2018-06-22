import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Route } from 'react-router-dom'
import Header from './UI/Header'
import Home from '../Home'
import User from '../User'
import MainMenu from '../../containers/MainMenu'
import Notify from '../../containers/Notify'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    overflow: 'auto',
  },
})

class Main extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor() {
    super()

    this.state = {
      openDrawer: false,
    }

    this.onChangeDrawer = this.onChangeDrawer.bind(this)
  }

  onChangeDrawer = value => {
    this.setState(state => ({
      openDrawer: value !== undefined ? value : !state.openDrawer,
    }))
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Header onChangeDrawer={this.onChangeDrawer} />

        <MainMenu
          openDrawer={this.state.openDrawer}
          onChangeDrawer={this.onChangeDrawer}
        />

        <main className={classes.content}>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={User} />
        </main>
        <Notify />
      </Fragment>
    )
  }
}

export default withStyles(styles)(Main)
