const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_IMAGES':
      const images = action.payload.items
      return [...state, [...images]]
    default:
      return state
  }
}
