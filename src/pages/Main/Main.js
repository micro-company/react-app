import React from 'react'
import { Route, Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Home from '../Home'
import About from '../About'

export default () => (
  <Grid container>
    <Grid item xs={12}>
      <header key="header">
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
      </header>
    </Grid>

    <Grid item xs={12}>
      <main key="main">
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
      </main>
    </Grid>
  </Grid>
)
