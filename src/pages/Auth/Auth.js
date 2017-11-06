import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import { reduxForm, Field } from 'redux-form'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { TextField, Select } from 'redux-form-material-ui'
import Tabs, { Tab } from 'material-ui/Tabs'

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
  }

  constructor(props) {
    super(props)

    this.state = {
      currentTab: 'signIn',
    }

    this.onSelectTab = this.onSelectTab.bind(this)
  }

  onSelectTab(event, value) {
    this.setState({ currentTab: value })
  }

  getForm(currentTab) { // eslint-disable-line
    switch (currentTab) {
      case 'signOn':
        return [
          <Field
            key="login"
            name="login"
            label="Login"
            component={TextField}
            fullWidth
          />,

          <Field
            key="mail"
            name="mail"
            label="Mail"
            component={TextField}
            fullWidth
          />,

          <Field
            key="password"
            name="password"
            label="Password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="retryPassword"
            name="retryPassword"
            label="Retry password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="language"
            name="language"
            component={Select}
            fullWidth
          >
            <MenuItem value="ru_RU">Russia</MenuItem>
            <MenuItem value="en_GB">English</MenuItem>
          </Field>,
        ]
      case 'signIn':
      default:
        return [
          <Field
            key="mail"
            name="mail"
            label="Mail"
            component={TextField}
            fullWidth
          />,

          <Field
            key="password"
            name="password"
            label="Password"
            component={TextField}
            fullWidth
          />,

          <Field
            key="language"
            name="language"
            component={Select}
            fullWidth
          >
            <MenuItem value="ru_RU">Russia</MenuItem>
            <MenuItem value="en_GB">English</MenuItem>
          </Field>,
        ]
    }
  }

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

                  <form>
                    { this.getForm(currentTab) }
                  </form>
                </CardContent>

                <CardActions>
                  <Button raised color="primary" className={classes.button}>
                    Go
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

export default reduxForm({
  form: 'AUTH_FORM',
})(withStyles(styles)(Auth))
