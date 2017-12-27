import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { LinearProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Form from '../Form'

class UpdateUserDialog extends PureComponent {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,

    onChangeUpdateUserDialog: PropTypes.func.isRequired,
    onUpdateSubmitForm: PropTypes.func.isRequired,
    onSendForm: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Dialog
        open={this.props.ui.updateUserDialog}
        onClose={this.props.onChangeUpdateUserDialog}
      >
        <DialogTitle>Update this user</DialogTitle>
        <DialogContent>
          {
            this.props.loading && <LinearProgress />
          }
          <Form
            initialValues={this.props.currentUser}
            onSubmit={this.props.onUpdateSubmitForm}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onChangeUpdateUserDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.props.onSendForm}
            color="primary"
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default UpdateUserDialog
