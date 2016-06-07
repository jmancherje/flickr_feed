import { splitIntoPages, unsplitPages, toggleFavoriteImage } from './helpers'
import { FETCH_IMAGES, FETCH_IMAGES_REQUEST, TOGGLE_FEED_FAVORITE } from '../actions/types'

const INITIAL_STATE = {
  images: [],
  pageSize: 20,
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
    case 'CHANGE_IMAGES_PAGE_SIZE': // TODO: change page size
      return Object.assign({}, state, { pageSize: action.pageSize })
    case 'SPLIT_IMAGES_PAGES': // TODO: split image pages
      return Object.assign({}, state, { 
        images: splitIntoPages(state.images, state.pageSize) 
      })
    default:
      return state
  }
}
