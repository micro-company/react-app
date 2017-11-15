import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import ReactTable from 'react-table'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'

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
    classes: PropTypes.string.isRequired,
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
            data={[]}
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

function mapStateToProps() {
  return {}
}

function mapDispatchToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(User))
