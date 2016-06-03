import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import promise from 'redux-promise'

import reducers from './reducers'
import App from './components/App'
import ListView from './components/ListViews/ListView'
import routes from './routes'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)} />
  </Provider>,
  document.querySelector('#main')
)