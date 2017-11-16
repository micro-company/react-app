import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import ui from 'redux-ui'
import { SubmissionError } from 'redux-form'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactTable from 'react-table'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'
import EditIcon from 'material-ui-icons/ModeEdit'
import DeleteIcon from 'material-ui-icons/Delete'
import { submitForm } from '../../actions/form'
import { list, add, update, remove } from '../../actions/users'
import { objectListToArrayList } from '../../utils/structure'
import Form from './UI/Form'

const styles = () => ({
  box: {
    display: 'flex',
  },
  dividers: {
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
    updateActions: PropTypes.func.isRequired,
    // removeActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      users: objectListToArrayList(props.user.users),
      currentUser: undefined,
    }

    this.renderCell = this.renderCell.bind(this)
    this.onSendForm = this.onSendForm.bind(this)
    this.onAddSubmitForm = this.onAddSubmitForm.bind(this)
    this.onUpdateSubmitForm = this.onUpdateSubmitForm.bind(this)
    this.onChangeAddUserDialog = this.onChangeAddUserDialog.bind(this)
    this.onChangeUpdateUserDialog = this.onChangeUpdateUserDialog.bind(this)
  }

  componentWillMount() {
    const { loaded, users } = this.props.user

    if (!loaded && Object.keys(users) === 0) {
      this.props.listActions()
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ users: objectListToArrayList(props.user.users) })
  }

  onChangeAddUserDialog() {
    this.setState({ loading: false })
    this.props.updateUI({ addUserDialog: !this.props.ui.addUserDialog })
  }

  onChangeUpdateUserDialog(data) {
    this.setState({
      currentUser: { ...data, password: undefined },
      loading: false,
    })
    this.props.updateUI({ updateUserDialog: !this.props.ui.updateUserDialog })
  }

  onSendForm = () => {
    this.props.submitFormActions('ADD_USER_FORM')
    this.setState({ loading: true })
  }

  onAddSubmitForm(data) {
    return this.props.addActions(data)
      .then(this.onChangeAddUserDialog)
      .catch(error => {
        this.setState({ loading: false })
        throw new SubmissionError(error.error)
      })
  }

  onUpdateSubmitForm(data) {
    return this.props.updateActions(data)
      .then(this.onChangeUpdateUserDialog)
      .catch(error => {
        this.setState({ loading: false })
        throw new SubmissionError(error.error)
      })
  }

  renderCell(row) {
    return (
      <div className={this.props.classes.box}>
        {row.value}

        <div className={this.props.classes.dividers} />

        <IconButton
          color="primary"
          aria-label="edit"
          onClick={() => this.onChangeUpdateUserDialog(row.original)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="accent"
          aria-label="delete"
          onClick={this.onChangeUpdateUserDialog}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
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
          {
            this.state.loading && <LinearProgress />
          }
          <Form onSubmit={this.onAddSubmitForm} />
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

      <Dialog
        key="updateUserDialog"
        open={this.props.ui.updateUserDialog}
        onRequestClose={this.onChangeUpdateUserDialog}
      >
        <DialogTitle>Update this user</DialogTitle>
        <DialogContent>
          {
            this.state.loading && <LinearProgress />
          }
          <Form
            initialValues={this.state.currentUser}
            onSubmit={this.onUpdateSubmitForm}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onChangeUpdateUserDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.onSendForm}
            color="primary"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>,

      <Grid container direction="column" key="content">
        <Grid item>
          <Grid container direction="row" key="content">
            <Typography type="display1" gutterBottom>
              Users list
            </Typography>

            <div className={classes.dividers} />

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
                Cell: this.renderCell,
              },
            ]}
            defaultPageSize={10}
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
    updateUserDialog: false,
  },
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(User)))
