import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import App from './components/App'
import ListView from './components/ListView'
import routes from './routes'

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector('#main')
)