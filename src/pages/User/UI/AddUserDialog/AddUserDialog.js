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

class AddUserDialog extends PureComponent {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,

    onChangeAddUserDialog: PropTypes.func.isRequired,
    onAddSubmitForm: PropTypes.func.isRequired,
    onSendForm: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Dialog
        open={this.props.ui.addUserDialog}
        onClose={this.props.onChangeAddUserDialog}
      >
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          {
            this.props.loading && <LinearProgress />
          }
          <Form onSubmit={this.props.onAddSubmitForm} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.onChangeAddUserDialog}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.props.onSendForm}
            color="primary"
            autoFocus
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddUserDialog
