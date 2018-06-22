import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'

import * as COUNTER from '../../actions/counter'

class Home extends PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    isIncrementing: PropTypes.bool.isRequired,
    isDecrementing: PropTypes.bool.isRequired,

    incrementActions: PropTypes.func.isRequired,
    incrementAsyncActions: PropTypes.func.isRequired,
    decrementActions: PropTypes.func.isRequired,
    decrementAsyncActions: PropTypes.func.isRequired,
  }

  render() {
    return [
      <Helmet key="home" title="Home" />,

      <div key="content">
        <h1>
Home
        </h1>
        <p>
Count:
          {this.props.count}
        </p>

        <p>
          <Button
            variant="raised"
            color="primary"
            disabled={this.props.isIncrementing}

            onClick={this.props.incrementActions}
          >
            Increment
          </Button>

          <Button
            variant="raised"
            color="primary"
            disabled={this.props.isIncrementing}

            onClick={this.props.incrementAsyncActions}
          >
            Increment Async
          </Button>
        </p>

        <p>
          <Button
            variant="raised"
            color="secondary"
            disabled={this.props.isDecrementing}

            onClick={this.props.decrementActions}
          >
            Decrementing
          </Button>

          <Button
            variant="raised"
            color="secondary"
            disabled={this.props.isDecrementing}

            onClick={this.props.decrementAsyncActions}
          >
            Decrement Async
          </Button>
        </p>
      </div>,
    ]
  }
}

function mapStateToProps(state) {
  return {
    count: state.counter.count,
    isIncrementing: state.counter.isIncrementing,
    isDecrementing: state.counter.isDecrementing,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    incrementActions: bindActionCreators(COUNTER.increment, dispatch),
    incrementAsyncActions: bindActionCreators(COUNTER.incrementAsync, dispatch),
    decrementActions: bindActionCreators(COUNTER.decrement, dispatch),
    decrementAsyncActions: bindActionCreators(COUNTER.decrementAsync, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
