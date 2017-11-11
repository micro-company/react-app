import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Tabs, { Tab } from 'material-ui/Tabs'
import { submitForm } from '../../actions/form'
import { login } from '../../actions/session'
import FormAuth from './UI/Form'

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100%',
  },
  button: {
    flex: 1,
  },
})

class Auth extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,

    submitFormActions: PropTypes.func.isRequired,
    loginActions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTab: 'signIn',
    }

    this.onSelectTab = this.onSelectTab.bind(this)
    this.onSendForm = this.onSendForm.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onSelectTab(event, value) {
    this.setState({ currentTab: value })
  }

  onSendForm = () => this.props.submitFormActions('AUTH_FORM')

  onSubmitForm = data => this.props.loginActions(data)

  render() {
    const { classes } = this.props
    const { currentTab } = this.state

    return ([
      <Helmet key="auth" title="Auth" />,

      <Grid container className={classes.root} key="content" alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={10} sm={5} md={4} lg={3} sd={2} xl={2}>
              <Card>
                <CardContent>
                  <Tabs
                    value={currentTab}
                    onChange={this.onSelectTab}
                    centered
                  >
                    <Tab label="Sign In" value="signIn" />
                    <Tab label="Sign On" value="signOn" />
                  </Tabs>

                  <FormAuth
                    currentTab={currentTab}
                    onSubmit={this.onSubmitForm}
                  />
                </CardContent>

                <CardActions>
                  <Button
                    className={classes.button}
                    color="primary"
                    raised
                    onClick={this.onSendForm}
                  >
                    Send
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>,
    ])
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    submitFormActions: bindActionCreators(submitForm, dispatch),
    loginActions: bindActionCreators(login, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Auth))
