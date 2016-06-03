export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return { ...state, authenticated: true, error: '' }
    case 'UNAUTH_USER':
      return { ...state, authenticated: false, error: '' }
    case 'AUTH_ERROR':
      return { ...state, error: action.errorMessage }
    default:
      return state
  }
}