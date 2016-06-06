export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return Object.assign({}, state, {
        authenticated: true,
        error: ''
      })
    case 'UNAUTH_USER':
      return Object.assign({}, state, {
        authenticated: false,
        error: ''
      })
    case 'AUTH_ERROR':
      return Object.assign({}, state, {
        error: action.errorMessage
      })
    default:
      return state
  }
}