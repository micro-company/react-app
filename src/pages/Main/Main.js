import React from 'react'
import Grid from 'material-ui/Grid'
import { Route } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import Header from './UI/Header'
import Drawer from './UI/Drawer'
import Home from '../Home'
import About from '../About'

export default () => (
  <Grid container direction="column">
    <Grid item xs={12}>
      <Header />

      <Grid container direction="row">
        <Grid item xs={12}>

          <Grid container>
            <Grid item>
              <Drawer />
            </Grid>

            <Grid item>
              <Paper elevation={4}>
                <Route exact path="/" component={Home} />
                <Route exact path="/about-us" component={About} />
              </Paper>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  </Grid>
)
