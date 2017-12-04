import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { SnackbarContent } from 'material-ui/Snackbar'
import { withStyles } from 'material-ui/styles'
import { remove } from '../../actions/event'
import Authenticated from '../../containers/Authenticated'
import Main from '../Main'
import Auth from '../Auth'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    position: 'absolute',
    bottom: 0,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
})

class App extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

    removeEventActions: PropTypes.func.isRequired,
  }

  render() {
    const { event, classes } = this.props

    return ([
      <Helmet
        key="helmet"
        titleTemplate="Hello - %s"
      />,

      <span key="events" className={classes.root}>
        {
          event.event.map((item, indexEvent) => (
            <SnackbarContent
              key={indexEvent} // eslint-disable-line
              className={classes.snackbar}
              message={item.message}
              action={
                <IconButton
                  color="accent"
                  onClick={() => this.props.removeEventActions(indexEvent)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          ))
        }
      </span>,

      <Switch key="switch" {...this.props.router}>
        <Route
          path="/auth"
          component={Auth}
        />
        <Authenticated>
          <Main {...this.props} />
        </Authenticated>
      </Switch>,
    ])
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    event: state.event,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeEventActions: bindActionCreators(remove, dispatch),
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)))
