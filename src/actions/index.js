import axios from 'axios'
import jsonp from 'jsonp'
import { browserHistory } from 'react-router'
import * as actions from './types'

const ROOT_URL = 'http://localhost:8787'

export function checkUser() {
  return axios.get(`${ROOT_URL}/api/checkuser`)
}

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
    type: actions.FETCH_IMAGES,
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

export function changeView(newView) {
  return {
    type: 'CHANGE_VIEW',
    newView
  }
}

export function fetchFavorites() {
  const request = axios.get(`${ROOT_URL}/api/favorites`, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: 'FETCH_FAVORITES',
    payload: request
  }
}

export function changeCurrentImage(image) {
  return {
    type: 'CHANGE_CURRENT_IMAGE',
    image
  }
}

export function addFavorite(image) {
  return axios.post(`${ROOT_URL}/api/favorites`, image, {
    headers: { authorization: localStorage.getItem('token') }
  })
}

export function favoriteStatus(image) {
  return dispatch => {
    dispatch({ type: actions.TOGGLE_FEED_FAVORITE, image })
    dispatch(favoriteCurrentImage())
  }
}

export function favoriteCurrentImage() {
  return {
    type: 'FAVORITE_CURRENT_IMAGE'
  }
}

export function removeFavorite(id) {
  return axios({
    method: 'delete',
    url: `${ROOT_URL}/api/favorites`,
    data: { id: id },
    headers: { authorization: localStorage.getItem('token') }
  })
}

// AUTH

export function signinUser({
  email,
  password
}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/api/signin`, { email, password })
      .then(response => {
        dispatch({ type: actions.AUTH_USER })
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
    type: actions.AUTH_ERROR,
    errorMessage
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return { type: actions.UNAUTH_USER }
}

export function signupUser({ email, password }) {
  return dispatch => {
    axios.post(`${ROOT_URL}/api/signup`, { email, password })
      .then(response => {
        dispatch({ type: actions.AUTH_USER })
        localStorage.setItem('token', response.data.token)
        // new user will have no favorites, so push to /feed instead
        browserHistory.push('/feed')
      })
      .catch(response => {
        dispatch(authError(response.data.error))
      })
  }
}