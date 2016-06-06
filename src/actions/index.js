import axios from 'axios'
import jsonp from 'jsonp'
import { browserHistory } from 'react-router'

const ROOT_URL = 'http://localhost:8787'

export function updateFeed() {
  const request = new Promise(function (resolve, reject) {
    jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json', { name: 'jsonFlickrFeed' }, function(err, data) {
      if (err) {
        reject(err.message)
      } else {
        resolve(data)
      }
    })
  })

  return {
    type: 'FETCH_IMAGES',
    payload: request
  }
}

export function changeFeedPage(newPage) {
  return {
    type: 'CHANGE_FEED_PAGE',
    newPage
  }
}

export function changeFavoritesPage(newPage) {
  return {
    type: 'CHANGE_FAVORITES_PAGE',
    newPage
  }
}

export function changeCurrentImage(image) {
  return {
    type: 'CHANGE_CURRENT_IMAGE',
    image
  }
}

export function changeView(newView) {
  return {
    type: 'CHANGE_VIEW',
    newView
  }
}

// AUTH

export function signinUser({
  email,
  password
}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/api/signin`, { email, password })
      .then(response => {
        dispatch({ type: 'AUTH_USER' })
        localStorage.setItem('token', response.data.token)
        // returning user sent to favorites
        browserHistory.push('/favorites')
      })
      .catch(() => {
        dispatch(authError('Invalid Login Info'))
      })
  }
}

export function authError(errorMessage) {
  return {
    type: 'AUTH_ERROR',
    errorMessage
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: 'UNAUTH_USER' }
}

export function signupUser({ email, password }) {
  return dispatch => {
    axios.post(`${ROOT_URL}/api/signup`, { email, password })
      .then(response => {
        dispatch({ type: 'AUTH_USER' })
        localStorage.setItem('token', response.data.token)
        // new user will have no favorites, so push to /feed instead
        browserHistory.push('/feed')
      })
      .catch(response => {
        dispatch(authError(response.data.error))
      })
  }
}