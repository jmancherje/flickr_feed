import { combineReducers } from 'redux'
import images from './images_reducer'
import favorites from './favorites_reducer'
import ui from './ui_reducer'
import currentImage from './current_image_reducer'
import auth from './auth_reducer'
import { reducer as form } from 'redux-form'

export default combineReducers({
  images,
  favorites,
  currentImage,
  ui,
  auth,
  form
})