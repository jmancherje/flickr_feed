export default function(state = {}, action) {
  switch(action.type) {
    case 'CHANGE_CURRENT_IMAGE':
      return action.image
    default:
      return state
  }
}
