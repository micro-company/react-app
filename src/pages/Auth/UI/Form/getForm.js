import React, { Fragment } from 'react'
import SaveIcon from '@material-ui/icons/Send'

export default function getForm({ mode, classes }) {
  const submit = {
    name: 'send',
    label: (
      <Fragment>
        Send
        <SaveIcon className={classes.rightIcon} />
      </Fragment>
    ),
    type: 'Button',
    color: 'primary',
    variant: 'contained',
  }

  switch (mode) {
    case 'recovery':
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'recaptcha',
          label: 'Recaptcha',
          type: 'Recaptcha',
          sitekey: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY,
          className: classes.recaptcha,
          theme: 'light',
        },
        submit,
      ]
    case 'recoveryPassword':
      return [
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'retryPassword',
          label: 'Retry password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'recaptcha',
          label: 'Recaptcha',
          type: 'Recaptcha',
          sitekey: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY,
          className: classes.recaptcha,
          theme: 'light',
        },
        submit,
      ]
    case 'signOn':
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'retryPassword',
          label: 'Retry password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'language',
          label: 'Language',
          type: 'Select',
          option: [
            {
              value: 'ru_RU',
              label: 'Russia',
            },
            {
              value: 'en_GB',
              label: 'English',
            },
          ],
        },
        {
          name: 'recaptcha',
          label: 'Recaptcha',
          type: 'Recaptcha',
          sitekey: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY,
          className: classes.recaptcha,
          theme: 'light',
        },
        submit,
      ]
    case 'logIn':
    default:
      return [
        {
          name: 'email',
          label: 'Email',
          type: 'TextField',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'TextField',
          typeInput: 'password',
        },
        {
          name: 'language',
          label: 'Language',
          type: 'Select',
          option: [
            {
              value: 'ru_RU',
              label: 'Russia',
            },
            {
              value: 'en_GB',
              label: 'English',
            },
          ],
        },
        {
          name: 'recaptcha',
          label: 'Recaptcha',
          type: 'Recaptcha',
          sitekey: process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY,
          className: classes.recaptcha,
          theme: 'light',
        },
        submit,
      ]
  }
}
