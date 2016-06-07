import { splitIntoPages, unsplitPages } from './helpers'
import { 
  FETCH_FAVORITES, 
  FETCH_FAVORITES_REQUEST,
  CHANGE_FAVORITES_PAGE_SIZE,
  SPLIT_FAVORITES_PAGES } from '../actions/types'

const INITIAL_STATE = {
  images: [],
  pageSize: 10,
  fetching: false
}

export default function(state = INITIAL_STATE, action) {
  let images;
  switch(action.type) {
    case FETCH_FAVORITES:
      // To keep state === [] if no favorites. 
      // Essential to show 'no favorites' message
      if (!action.payload.data.length) {
        return {
          pageSize: state.pageSize,
          images: [],
          fetching: false
        }
      }

      const favorites = action.payload.data
      images = splitIntoPages(favorites, state.pageSize)
      return Object.assign({}, state, { images, fetching: false })
    case FETCH_FAVORITES_REQUEST:
      return Object.assign({}, state, { fetching: true })
    case CHANGE_FAVORITES_PAGE_SIZE:
      return Object.assign({}, state, { pageSize: action.newSize })
    case SPLIT_FAVORITES_PAGES:
      images = unsplitPages(state.images)
      const pages = splitIntoPages(images, state.pageSize)
      return Object.assign({}, state, { 
        images: pages
      })
    default:
      return state
  }
}
