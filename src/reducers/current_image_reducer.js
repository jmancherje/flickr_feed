export default function(state = null, action) {
  switch(action.type) {
    case 'CHANGE_CURRENT_IMAGE':
      return action.image
    case 'FAVORITE_CURRENT_IMAGE':
      if (!state) {
        return state
      }
      return Object.assign({}, state, { favorite: true })
    default:
      return state
  }
}
