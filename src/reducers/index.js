import { combineReducers } from 'redux'
import images from './images_reducer'
import favorites from './favorites_reducer'
import ui from './ui_reducer'

export default combineReducers({
  images,
  favorites,
  ui
})