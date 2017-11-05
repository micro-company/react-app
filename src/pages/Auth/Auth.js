import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { Form } from 'react-form'
import { MenuItem } from 'material-ui/Menu'
import TextField from 'material-ui/TextField'
import Select from 'material-ui/Select'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

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

  handleChange = prop => event => this.setState({
    [prop]: event.target.value,
  })

  handleMouseDownPassword = event => event.preventDefault()

  handleClickShowPasssword = () => {
    this.setState({
      password: '',
      showPassword: !this.state.showPassword,
    })
  }

  render() {
    const { classes } = this.props

    return ([
      <Helmet title="Auth" />,

      <Grid container className={classes.root} key="content" alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={11} sm={8} md={4} lg={4} xl={3} sd={2}>
              <Card>
                <CardContent>
                  <Typography type="display1" gutterBottom>
                    Auth Us
                  </Typography>

                  <Form>
                    {
                      formApi => (
                        <form onSubmit={formApi.submitForm} id="authForm">
                          <TextField
                            label="Login"
                            margin="normal"
                            fullWidth
                          />

                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input
                            id="password"
                            label="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={this.handleClickShowPasssword}
                                  onMouseDown={this.handleMouseDownPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            fullWidth
                          />

                          <Select
                            value="en_GB"
                            input={<Input id="language" />}
                            fullWidth
                          >
                            <MenuItem value="ru_RU">Russia</MenuItem>
                            <MenuItem value="en_GB">English</MenuItem>
                          </Select>
                        </form>
                      )
                    }
                  </Form>
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

export default withStyles(styles)(Auth)
