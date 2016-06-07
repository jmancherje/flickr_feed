import { splitIntoPages } from './helpers'
import { FETCH_FAVORITES } from '../actions/types'

const INITIAL_STATE = {
  images: [],
  pageSize: 5
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_FAVORITES:
      // To keep state === [] if no favorites. 
      // Essential to show 'no favorites' message
      if (!action.payload.data.length) {
        return {
          pageSize: state.pageSize,
          images: []
        }
      }

      const favorites = action.payload.data
      const images = splitIntoPages(favorites, state.pageSize)
      return Object.assign({}, state, { images })
    case 'CHANGE_FAVORITES_PAGE_SIZE':
      return Object.assign({}, state, { pageSize: action.pageSize })
    case 'SPLIT_PAGES':
      return Object.assign({}, state, { 
        images: splitIntoPages(state.images, state.pageSize) 
      })
    default:
      return state
  }
}
