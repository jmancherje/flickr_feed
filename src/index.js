import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <h4>Hello</h4>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#main')
)