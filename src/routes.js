import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './components/App'
import ListView from './components/ListView'
import ImageView from './components/ImageView/ImageView'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='feed' />
    <Route path='feed' component={ListView} />
    <Route path='favorites' component={ListView} />
    <Route path='image' component={ImageView} />
  </Route>
)
