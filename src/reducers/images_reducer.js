import { splitIntoPages, unsplitPages } from './helpers'

const INITIAL_STATE = {
  images: [],
  pageSize: 5
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    // needs to be updated with new splitIntoPages method
    case 'FETCH_IMAGES':
      const images = action.payload.items
      const messyImages = state.images.concat([images])
      const allImages = unsplitPages(messyImages)
      const allPages = splitIntoPages(allImages, state.pageSize)
      console.log('allPages: ', allPages)
      return Object.assign({}, state, {
        images: allPages
      })
    case 'CHANGE_IMAGES_PAGE_SIZE':
      return Object.assign({}, state, { pageSize: action.pageSize })
    case 'SPLIT_IMAGES_PAGES':
      return Object.assign({}, state, { 
        images: splitIntoPages(state.images, state.pageSize) 
      })
    default:
      return state
  }
}
