import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import { reduxForm, Field } from 'redux-form'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { MenuItem } from 'material-ui/Menu'
import Card, { CardActions, CardContent } from 'material-ui/Card'

import {
  TextField,
  Select,
} from 'redux-form-material-ui'

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
      showPassword: false,
    }
  }

  onChange(event, onChange) { // eslint-disable-line
    console.warn('onChange', event)
  }

  handleChange = prop => event => this.setState({
    [prop]: event.target.value,
  })

  handleMouseDownPassword = event => event.preventDefault()

  handleClickShowPasssword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    })
  }

  render() {
    const { classes } = this.props

    return ([
      <Helmet key="auth" title="Auth" />,

      <Grid container className={classes.root} key="content" alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={11} sm={8} md={4} lg={4} xl={3} sd={2}>
              <Card>
                <CardContent>
                  <Typography type="display1" gutterBottom>
                    Auth Us
                  </Typography>

                  <form>
                    <Field
                      name="login"
                      label="Login"
                      component={TextField}
                      fullWidth
                    />

                    <Field
                      name="password"
                      label="Password"
                      component={TextField}
                      fullWidth
                    />

                    <Field
                      name="language"
                      component={Select}
                      fullWidth
                    >
                      <MenuItem value="ru_RU">Russia</MenuItem>
                      <MenuItem value="en_GB">English</MenuItem>
                    </Field>
                  </form>
                </CardContent>

                <CardActions>
                  <Grid container>
                    <Button raised color="primary" className={classes.button}>
                      Sigh In
                    </Button>

                    <Button raised color="primary" className={classes.button}>
                      Sign on
                    </Button>
                  </Grid>
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
