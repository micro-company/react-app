import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Form from 'react-final-form-generator'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar'
import Icon from '../../../../components/Icon'
import getForm from './getForm'

const styles = () => ({
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
  recaptcha: {
    margin: '1em 0',
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

    this.onChange = this.onChange.bind(this)
  }

  onChange(form, e) {
    console.warn('onChange', form, e)
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
            id="AuthFormId"
            className={classes.form}
            fields={getForm({ mode, classes })}

            onChange={this.onChange}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Auth)
