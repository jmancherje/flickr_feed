import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'
import ListView from './components/ListViews/ListView'
import routes from './routes'

import { AUTH_USER } from './actions/types' 

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)} />
  </Provider>,
  document.querySelector('#main')
)