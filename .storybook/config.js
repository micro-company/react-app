import { configure, addDecorator, setAddon } from '@storybook/react'
import infoAddon from '@storybook/addon-info'
import { withOptions } from '@storybook/addon-options'
import moment from 'moment'

addDecorator((story) => {
  moment.locale('en')
  return story()
})

withOptions({
  name: 'REACT-APP',
  url: 'https://github.com/micro-company/react-app',
})

function loadStories() {
  require('../stories/AuthForm')
  // You can require as many stories as you need.
}

setAddon(infoAddon)

configure(loadStories, module)
