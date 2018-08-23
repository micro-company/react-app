import _ from 'lodash'
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Form } from 'react-final-form'
import Recaptcha from 'react-google-recaptcha'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import SaveIcon from '@material-ui/icons/Send'
import Icon from '../../../../components/Icon'
import getForm from './getForm'

const styles = theme => ({
  Card: {
    alignItems: 'center',
    marginTop: '4em !important',
    justifyContent: 'flex-start !important',
    display: 'flex',
    flexDirection: 'column',
  },
  Icon: {
    fontSize: '15em',
  },
  form: {
    margin: '1em',
  },
  root: {
    width: '70%',
    maxWidth: '30em',
  },
  button: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  recaptcha: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class Auth extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    onRecaptcha: PropTypes.func.isRequired,
  }

  static getDerivedStateFromProps(nextProps) {
    let iconName = 'login'

    switch (nextProps.mode) {
      case 'recovery':
      case 'recoveryPassword':
        iconName = 'forgotPassword'
        break
      default:
        iconName = 'login'
    }

    return {
      iconName,
    }
  }

  constructor() {
    super()

    this.state = {
      iconName: 'login',
    }
  }

  render() {
    const {
      mode, onChangeMode, onSubmit, classes,
    } = this.props

    return (
      <Card className={classes.Card} elevation={0}>
        <Icon name={this.state.iconName} className={classes.Icon} />

        <CardContent className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={mode}
              onChange={onChangeMode}
              fullWidth
            >
              <Tab label="LOG IN" value="logIn" />
              <Tab label="SIGN ON" value="signOn" />
              <Tab label="RECOVERY" value="recovery" />
            </Tabs>
          </AppBar>

          <Form
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              submitError,
            }) => (
              <Fragment>
                <form
                  id="AuthFormId"
                  className={classes.form}
                  onSubmit={handleSubmit}
                >
                  { getForm(mode) }
                </form>
                <div>
                  {
                    _.get(submitError, '_error', []).forEach(error => (
                      <Typography variant="subheading" gutterBottom>
                        We have probelem: {error}
                      </Typography>
                    ))
                  }

                  <ul>
                    {
                      submitError && submitError._error.length > 0 && (
                        <Typography variant="subheading" gutterBottom>
                          We have probelem: {submitError._error.length}
                        </Typography>
                      )
                    }
                    {
                      _.get(submitError, '_error', []).map((issue, index) => <FormHelperText error key={index}>{issue}</FormHelperText>) // eslint-disable-line
                    }
                  </ul>
                </div>
              </Fragment>
            )}
          />

          <Recaptcha
            className={classes.recaptcha}
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
            onChange={this.props.onRecaptcha}
            theme="light"
          />
        </CardContent>

        <CardActions className={classes.root}>
          <Button
            className={classes.button}
            color="primary"
            variant="raised"
            type="submit"
            onClick={() => document
              .getElementById('AuthFormId')
              .dispatchEvent(new Event('submit', { cancelable: true }))
            }
          >
            Send
            <SaveIcon className={classes.rightIcon} />
          </Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(Auth)
