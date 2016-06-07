import axios from 'axios'
import jsonp from 'jsonp'
import { browserHistory } from 'react-router'
import * as actions from './types'

const ROOT_URL = 'http://localhost:8787'

export function checkUser() {
  return axios.get(`${ROOT_URL}/api/checkuser`)
}

export function updateFeed() {
  return dispatch => {
    dispatch(updateFeedRequest())
    jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json', { name: 'jsonFlickrFeed' }, function(err, data) {
      if (err) { console.log(error) }
      dispatch({ type: actions.FETCH_IMAGES, payload: data })
    })
  }
}

function updateFeedRequest() {
  return {
    type: actions.FETCH_IMAGES_REQUEST
  }
}

export function changeFeedPage(newPage) {
  return {
    type: actions.CHANGE_FEED_PAGE,
    newPage
  }
}

export function changeFavoritesPage(newPage) {
  return {
    type: actions.CHANGE_FAVORITES_PAGE,
    newPage
  }
}

export function changeView(newView) {
  return {
    type: actions.CHANGE_VIEW,
    newView
  }
}

export function fetchFavorites() {
  return dispatch => {
    dispatch(fetchFavoritesRequest())
    axios.get(`${ROOT_URL}/api/favorites`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({ type: actions.FETCH_FAVORITES, payload: response })
      })
  }
}

function fetchFavoritesRequest() {
  return {
    type: actions.FETCH_FAVORITES_REQUEST
  }
}

export function changeCurrentImage(image) {
  return {
    type: actions.CHANGE_CURRENT_IMAGE,
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
    type: actions.FAVORITE_CURRENT_IMAGE
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

export function changeFeedPageSize(newSize) {
  return dispatch => {
    dispatch({ type: actions.CHANGE_FEED_PAGE_SIZE, newSize })
    dispatch(splitFeedPages())
    dispatch(changeFeedPage(1))
  }
}

function splitFeedPages() {
  return {
    type: actions.SPLIT_FEED_PAGES
  }
}

export function changeFavoritesPageSize(newSize) {
  return dispatch => {
    dispatch({ type: actions.CHANGE_FAVORITES_PAGE_SIZE, newSize })
    dispatch(splitFavoritesPages())
    dispatch(changeFavoritesPage(1))
  }
}

function splitFavoritesPages() {
  return {
    type: actions.SPLIT_FAVORITES_PAGES
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