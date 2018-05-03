import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import { SnackbarContent } from 'material-ui/Snackbar'
import { remove, check } from '../../actions/event'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
})

class Notify extends PureComponent {
  static propTypes = {
    event: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

    removeEventAction: PropTypes.func.isRequired,
    checkEventAction: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.checkEventAction()
  }

  render() {
    const { event, classes } = this.props

    return (
      <span key="events" className={classes.root}>
        {
          event.event.map((item, indexEvent) => (
            <SnackbarContent
              key={`${indexEvent}-${item.message}`} // eslint-disable-line
              className={classes.snackbar}
              message={item.message}
              action={
                <IconButton
                  color="secondary"
                  onClick={() => this.props.removeEventAction(indexEvent)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          ))
        }
      </span>
    )
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
    removeEventAction: bindActionCreators(remove, dispatch),
    checkEventAction: bindActionCreators(check, dispatch),
  }
}

export default withStyles(styles)(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notify)))
