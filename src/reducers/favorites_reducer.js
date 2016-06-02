import { splitIntoPages } from './helpers'

const INITIAL_STATE = {
  images: [],
  pageSize: 5
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_FAVORITES':
      const images = splitIntoPages(action.payload.items, state.pageSize)
      return Object.assign({}, state, { images })
    case 'UPDATE_PAGE_SIZE':
      return Object.assign({}, state, { pageSize: action.pageSize })
    case 'SPLIT_PAGES':
      return Object.assign({}, state, { 
        images: splitIntoPages(state.images, state.pageSize) 
      })
    default:
      return state
  }
}
