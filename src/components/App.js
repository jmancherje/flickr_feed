import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListView from './ListView'
import { Link } from 'react-router'
import { updateFeed } from '../actions'

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
        self.toggleAlert()
        window.setTimeout(self.toggleAlert.bind(this), 10000)
      })
  }

  toggleAlert() {
    console.log('open close..')
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
        <div className={`alert alert-info ${this.state.showAlert ? '' : 'hidden-xs-up'}`} role="alert">
          <strong>Awesome!</strong> New images in your feed. Check the last page or reverse the order to see what's new!
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(null, { updateFeed })(App)