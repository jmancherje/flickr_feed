import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListView from './ListViews/ListView'
import { Link } from 'react-router'
import { updateFeed } from '../actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Navbar from './Navbar/Navbar'

class App extends Component {
  componentWillMount() {
    this.props.updateFeed()
  }

  componentDidMount() {
    this.fetchEveryMinute = window.setInterval(this.props.updateFeed, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.fetchEveryMinute)
  }

  render() {
    return (
      <div>
        <Navbar location={this.props.location.pathname} />
        <div className="container-fluid col-xl-10 col-xl-offset-1"> 
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(null, { updateFeed })(App)