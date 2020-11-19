
import { combineReducers } from 'redux'
import mediaReducer from './media'
import artistReducer from './artist'

export default combineReducers({
    media: mediaReducer,
    artist: artistReducer
})