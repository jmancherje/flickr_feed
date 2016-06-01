const INITIAL_STATE = {
  feedPage: 1,
  favoritesPage: 1,
  currentView: 'feed'
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'CHANGE_FEED_PAGE':
      return Object.assign({}, state, { feedPage: action.newPage })
    case 'CHANGE_FAVORITES_PAGE':
      return Object.assign({}, state, { favoritesPage: action.newPage })
    case 'CHANGE_VIEW':
      return Object.assign({}, state, { currentView: action.newView })
    default:
      return state
  }
}
