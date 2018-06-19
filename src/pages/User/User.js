import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import ui from 'redux-ui'
import { SubmissionError } from 'redux-form'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactTable from 'react-table'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import UpdateIcon from '@material-ui/icons/Update'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/ModeEdit'
import DeleteIcon from '@material-ui/icons/Delete'
import { list, add, update, remove } from '../../actions/users'
import { objectListToArrayList } from '../../utils/structure'
import AddUserDialog from './UI/AddUserDialog'
import UpdateUserDialog from './UI/UpdateUserDialog'
import DeleteUserDialog from './UI/DeleteUserDialog'

const styles = theme => ({
  box: {
    display: 'flex',
  },
  dividers: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  typography: {
    margin: theme.spacing.unit,
  },
})

class User extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,

    updateUI: PropTypes.func.isRequired,
    listActions: PropTypes.func.isRequired,
    addActions: PropTypes.func.isRequired,
    updateActions: PropTypes.func.isRequired,
    removeActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      users: objectListToArrayList(props.user.users),
      currentUser: {},
    }

    this.renderCell = this.renderCell.bind(this)
    this.onSendForm = this.onSendForm.bind(this)
    this.onAddSubmitForm = this.onAddSubmitForm.bind(this)
    this.onUpdateSubmitForm = this.onUpdateSubmitForm.bind(this)
    this.onChangeAddUserDialog = this.onChangeAddUserDialog.bind(this)
    this.onChangeUpdateUserDialog = this.onChangeUpdateUserDialog.bind(this)
    this.onChangeDeleteUserDialog = this.onChangeDeleteUserDialog.bind(this)
    this.onConfirmDeleteUser = this.onConfirmDeleteUser.bind(this)
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

  onChangeDeleteUserDialog(data) {
    this.setState({
      currentUser: { ...data, password: undefined },
      loading: false,
    })
    this.props.updateUI({ deleteUserDialog: !this.props.ui.deleteUserDialog })
  }

  onSendForm = value => {
    console.warn('FORM', value)
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

  onConfirmDeleteUser(data) {
    return this.props.removeActions(data)
      .then(this.onChangeDeleteUserDialog)
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

        <Tooltip placement="bottom" title="Edit user">
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => this.onChangeUpdateUserDialog(row.original)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip placement="bottom" title="Delete user">
          <IconButton
            color="secondary"
            aria-label="delete"
            onClick={() => this.onChangeDeleteUserDialog(row.original)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <Fragment>
        <Helmet title="User" />

        <AddUserDialog
          ui={this.props.ui}
          loading={this.state.loading}

          onAddSubmitForm={this.onAddSubmitForm}
          onChangeAddUserDialog={this.onChangeAddUserDialog}
          onSendForm={this.onSendForm}
        />

        <UpdateUserDialog
          ui={this.props.ui}
          loading={this.state.loading}
          currentUser={this.state.currentUser}

          onChangeUpdateUserDialog={this.onChangeUpdateUserDialog}
          onUpdateSubmitForm={this.onUpdateSubmitForm}
          onSendForm={this.onSendForm}
        />

        <DeleteUserDialog
          ui={this.props.ui}
          loading={this.state.loading}
          currentUser={this.state.currentUser}

          onSendForm={this.onSendForm}
          onConfirmDeleteUser={this.onConfirmDeleteUser}
          onChangeDeleteUserDialog={this.onChangeDeleteUserDialog}
        />

        <Typography
          variant="headline"
          gutterBottom
          className={classes.typography}
        >
          Users list
        </Typography>

        <div className={classes.dividers} />

        <Tooltip placement="bottom" title="Update users list">
          <Button
            variant="fab"
            color="primary"
            aria-label="update"
            className={classes.button}
            onClick={this.props.listActions}
          >
            <UpdateIcon />
          </Button>
        </Tooltip>

        <Tooltip placement="bottom" title="Add user">
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.button}
            onClick={this.onChangeAddUserDialog}
          >
            <AddIcon />
          </Button>
        </Tooltip>

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
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
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
    deleteUserDialog: false,
  },
})(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(User)))
