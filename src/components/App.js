import React, { Component } from 'react'
import ListView from './ListView'
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/feed">feed</Link>
        <Link to="/favorites">favorites</Link>
        <h4>Hello</h4>
        {this.props.children}
      </div>
    )
  }
}

export default App