import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Helmet } from 'react-helmet'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'

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

  render() {
    const { classes } = this.props

    return ([
      <Helmet title="Auth" />,

      <Grid container className={classes.root} key="content" alignItems="center">
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography type="display1" gutterBottom>
                    Auth Us
                  </Typography>
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
