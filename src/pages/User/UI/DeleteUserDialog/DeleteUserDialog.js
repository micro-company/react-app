import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ConfirmDeleteUser from '../ConfirmDeleteUser'

class DeleteUserDialog extends PureComponent {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,

    onChangeDeleteUserDialog: PropTypes.func.isRequired,
    onConfirmDeleteUser: PropTypes.func.isRequired,
    onSendForm: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Dialog
        open={this.props.ui.deleteUserDialog}
        onClose={this.props.onChangeDeleteUserDialog}
      >
        <DialogTitle>Confirm delete this user</DialogTitle>
        <DialogContent>
          {
            this.props.loading && <LinearProgress />
          }
          <ConfirmDeleteUser
            initialValues={this.props.currentUser}
            onSubmit={this.props.onConfirmDeleteUser}
          />
          <Typography gutterBottom>
            By this action, you permanently delete the user
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onChangeDeleteUserDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.props.onSendForm}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteUserDialog
