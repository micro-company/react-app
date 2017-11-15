import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactTable from 'react-table'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'
import { list, add, update, remove } from '../../actions/users'
import { objectListToArrayList } from '../../utils/structure'

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

    listActions: PropTypes.func.isRequired,
    // addActions: PropTypes.func.isRequired,
    // updateActions: PropTypes.func.isRequired,
    // removeActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      users: objectListToArrayList(props.user.users),
    }
  }

  componentWillMount() {
    const { loaded } = this.props.user

    if (!loaded) {
      this.props.listActions()
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ users: objectListToArrayList(props.user.users) })
  }

  render() {
    const { classes } = this.props

    return [
      <Helmet key="user" title="User" />,

      <Grid container direction="column" key="content">
        <Grid item>
          <Grid container direction="row" key="content">
            <Typography type="display1" gutterBottom>
              Users list
            </Typography>

            <div className={classes.add} />

            <Button fab color="primary" aria-label="add">
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
    listActions: bindActionCreators(list, dispatch),
    addActions: bindActionCreators(add, dispatch),
    updateActions: bindActionCreators(update, dispatch),
    removeActions: bindActionCreators(remove, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(User))
