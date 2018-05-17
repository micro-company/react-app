import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
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
