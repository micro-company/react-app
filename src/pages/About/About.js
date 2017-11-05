import React from 'react'
import { Helmet } from 'react-helmet'

export default () => [
  <Helmet key="about" title="About" />,

  <div key="content">
    <h1>About Us</h1>
    <p>Hello Medium!</p>
  </div>,
]
