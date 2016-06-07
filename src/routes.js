import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

import App from './components/App'
import { Feed, Favorites } from './components/ListViews/ListView'
import ImageView from './components/ImageView/ImageView'
import RequireAuth from './components/auth/require_auth'
import { fetchFavorites } from './actions'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

export default store => (
  <Route path='/' component={App}>
    <IndexRedirect to='/feed' />
    <Route path='/feed' component={Feed}></Route>
    <Route path='/image' component={ImageView} />
    <Route path='/favorites' component={RequireAuth(Favorites)} onEnter={() => {store.dispatch(fetchFavorites())}} />
    <Route path='/favorite' component={ImageView} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
  </Route>
)
