import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import ui from 'redux-ui'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactTable from 'react-table'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'
import { submitForm } from '../../actions/form'
import { list, add, update, remove } from '../../actions/users'
import { objectListToArrayList } from '../../utils/structure'
import Form from './UI/Form'

const styles = () => ({
  header: {
    display: 'flex',
  },
  add: {
    flex: 1,
  },
})

class User extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,

    submitFormActions: PropTypes.func.isRequired,
    updateUI: PropTypes.func.isRequired,
    listActions: PropTypes.func.isRequired,
    addActions: PropTypes.func.isRequired,
    // updateActions: PropTypes.func.isRequired,
    // removeActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      users: objectListToArrayList(props.user.users),
    }

    this.onSendForm = this.onSendForm.bind(this)
  }

  componentWillMount() {
    const { loaded } = this.props.user

    if (!loaded) {
      this.props.listActions()
    }

    this.onChangeAddUserDialog = this.onChangeAddUserDialog.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({ users: objectListToArrayList(props.user.users) })
  }

  onChangeAddUserDialog() {
    this.props.updateUI({
      addUserDialog: !this.props.ui.addUserDialog,
    })
  }

  onSendForm = () => {
    this.props.submitFormActions('ADD_USER_FORM')
    this.onChangeAddUserDialog()
  }

  render() {
    const { classes } = this.props

    return [
      <Helmet key="user" title="User" />,

      <Dialog
        key="addUserDialog"
        open={this.props.ui.addUserDialog}
        onRequestClose={this.onChangeAddUserDialog}
      >
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={form => this.props.addActions(form)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onChangeAddUserDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.onSendForm}
            color="primary"
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>,

      <Grid container direction="column" key="content">
        <Grid item>
          <Grid container direction="row" key="content">
            <Typography type="display1" gutterBottom>
              Users list
            </Typography>

            <div className={classes.add} />

            <Button
              fab
              color="primary"
              aria-label="add"
              onClick={this.onChangeAddUserDialog}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <ReactTable
            data={this.state.users}
            columns={[
              {
                Header: 'Mail',
                accessor: 'mail',
              },
            ]}
          />
        </Grid>
      </Grid>,
    ]
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitFormActions: bindActionCreators(submitForm, dispatch),
    listActions: bindActionCreators(list, dispatch),
    addActions: bindActionCreators(add, dispatch),
    updateActions: bindActionCreators(update, dispatch),
    removeActions: bindActionCreators(remove, dispatch),
  }
}

export default ui({
  state: {
    addUserDialog: false,
  },
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(User)))
