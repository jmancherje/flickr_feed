import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListView from './ListView'
import { Link } from 'react-router'
import { updateFeed } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showAlert: false
    }
  }

  componentDidMount() {
    this.fetchEveryMinute = window.setInterval(this.fetchAndAlert.bind(this), 60000)
  }

  fetchAndAlert() {
    const self = this
    this.props.updateFeed()
      .then(() => {
        // self.toggleAlert()
        // window.setTimeout(self.toggleAlert.bind(this), 3000)
      })
  }

  toggleAlert() {
    this.setState({ showAlert: !this.state.showAlert })
  }

  componentWillUnmount() {
    clearInterval(this.fetchEveryMinute)
  }

  render() {
    return (
      <div>
        <Link to="/feed">feed</Link>
        <Link to="/favorites">favorites</Link>
        <ReactCSSTransitionGroup transitionAppearTimeout={500} transitionEnterTimeout={500} transitionAppear={true} transitionLeaveTimeout={500} transitionName={ {
              enter: 'enter',
              enterActive: 'enter-active',
              leave: 'leave',
              leaveActive: 'leave-active'
            } }>
          {!this.state.showAlert ? null : <div key={0} className="alert alert-info hover" role="alert">
            <strong>Awesome!</strong> New images in your feed. Check the last page or reverse the order to see what's new!
          </div>}
        </ReactCSSTransitionGroup>
        {this.props.children}
      </div>
    )
  }
}

export default connect(null, { updateFeed })(App)