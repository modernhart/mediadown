import {ARTIST_LIST, MEDIA_LIST, MEDIA_HIDE, REQUEST_SERVER, CONNECT_SERVER} from '../action'

const initialState = {
    list: [],
    medias: [],
    artImage: [],
    youtubeData: false,
    show: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case ARTIST_LIST:
			return {
                ...state,
				list: action.payload
            }
        case MEDIA_LIST:
            return {
                ...state,
                medias: action.payload,
                artImage: action.image,
                youtubeData: action.isAPIData,
                show: true
            }
        case MEDIA_HIDE:
            return {
                ...state,
                show: false
            }
        case REQUEST_SERVER: 
            return {
                ...state,
                show: false
            }
        case CONNECT_SERVER:
            return {
                ...state,
                show: true
            }
		default:
            return state	
	}
}