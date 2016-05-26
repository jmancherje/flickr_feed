import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './components/App'
import ListView from './components/ListView'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='feed' />
    <Route path='feed' component={ListView} view="all" />
    <Route path='favorites' component={ListView} view="favorites" />
  </Route>
)
