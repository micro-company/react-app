import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../Home'
import About from '../About'

export default () => [
  <header key="header">
    <Link to="/">Home</Link>
    <Link to="/about-us">About</Link>
  </header>,

  <main key="main">
    <Route exact path="/" component={Home} />
    <Route exact path="/about-us" component={About} />
  </main>,
]
