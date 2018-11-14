import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import Forbidden from '../../src/pages/403'
import NotFound from '../../src/pages/404'
import InternalServerError from '../../src/pages/500'

const stories = storiesOf('ErrorPage', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)
stories.addDecorator(muiTheme())

stories.add('403 Forbidden', withInfo()(() => (
  <Forbidden />
)))

stories.add('404 Not Found', withInfo()(() => (
  <NotFound />
)))

stories.add('403 Internal Server Error', withInfo()(() => (
  <InternalServerError />
)))
