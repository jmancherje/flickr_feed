import { splitIntoPages, unsplitPages, toggleFavoriteImage } from './helpers'
import { 
  FETCH_IMAGES, 
  FETCH_IMAGES_REQUEST, 
  TOGGLE_FEED_FAVORITE, 
  CHANGE_FEED_PAGE_SIZE, 
  SPLIT_FEED_PAGES } from '../actions/types'

const INITIAL_STATE = {
  images: [],
  pageSize: 10,
  fetching: false
}

export default function(state = INITIAL_STATE, action) {
  let images;
  switch(action.type) {
    case FETCH_IMAGES:
      images = action.payload.items
      const messyImages = state.images.concat([images])
      const allImages = unsplitPages(messyImages)
      const allPages = splitIntoPages(allImages, state.pageSize)
      return Object.assign({}, state, {
        images: allPages,
        fetching: false
      })
    case FETCH_IMAGES_REQUEST:
      return Object.assign({}, state, { fetching: true })
    case TOGGLE_FEED_FAVORITE:
      images = toggleFavoriteImage(action.image.link, state.images)
      return Object.assign({}, state, { images })
    case CHANGE_FEED_PAGE_SIZE:
      return Object.assign({}, state, { pageSize: action.newSize })
    case SPLIT_FEED_PAGES:
      images = unsplitPages(state.images)
      const pages = splitIntoPages(images, state.pageSize)
      return Object.assign({}, state, { 
        images: pages 
      })
    default:
      return state
  }
}
