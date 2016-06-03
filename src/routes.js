import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import App from './components/App'
import { Feed, Favorites } from './components/ListViews/ListView'
import ImageView from './components/ImageView/ImageView'
import RequireAuth from './components/auth/require_auth'
import Login from './components/auth/Login'

export default store => (
  <Route path='/' component={App}>
    <IndexRedirect to='/feed' />
    <Route path='/feed' component={Feed} />
    <Route path='/favorites' component={RequireAuth(Favorites)} />
    <Route path='/image' component={ImageView} />
    <Route path='/login' component={Login} />

  </Route>
)
