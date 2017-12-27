import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { LinearProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
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
            color="accent"
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
