import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import * as COUNTER from '../../actions/counter'

class Home extends PureComponent {
  static propTypes = {
    count: PropTypes.object.isRequired,
    isIncrementing: PropTypes.bool.isRequired,
    isDecrementing: PropTypes.bool.isRequired,

    incrementActions: PropTypes.func.isRequired,
    incrementAsyncActions: PropTypes.func.isRequired,
    decrementActions: PropTypes.func.isRequired,
    decrementAsyncActions: PropTypes.func.isRequired,
    changePageActions: PropTypes.func.isRequired,
  }

  render() {
    return [
      <Helmet key="home" title="Home" />,

      <div key="content">
        <h1>Home</h1>
        <p>Count: {this.props.count}</p>

        <p>
          <button
            onClick={this.props.incrementActions}
            disabled={this.props.isIncrementing}
          >
            Increment
          </button>

          <button
            onClick={this.props.incrementAsyncActions}
            disabled={this.props.isIncrementing}
          >
            Increment Async
          </button>
        </p>

        <p>
          <button
            onClick={this.props.decrementActions}
            disabled={this.props.isDecrementing}
          >
            Decrementing
          </button>

          <button
            onClick={this.props.decrementAsyncActions}
            disabled={this.props.isDecrementing}
          >
            Decrement Async
          </button>
        </p>

        <p><button onClick={() => this.props.changePageActions()}>Go to about page via redux</button></p>
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
    changePageActions: () => push('/about-us'),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
