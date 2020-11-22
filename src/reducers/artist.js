import {
    ARTIST_LIST, 
    MEDIA_LIST, 
    MEDIA_HIDE, 
    REQUEST_SERVER, 
    CONNECT_SERVER,
    MEDIA_NEXT
} from '../action'

const initialState = {
    list: [],
    medias: [],
    artImage: [],
    youtubeData: false,
    show: false,
    totalVideos: 0,
    pageVideos: 0,
    nextToken: null
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
                totalVideos: action.totalCount/ action.pageCount,
                pageVideos: action.pageCount,
                nextToken: action.nextToken,
                show: true
            }
        case MEDIA_NEXT:
            return {
                ...state,
                medias: [...state.medias, ...action.payload],
                nextToken: action.nextToken
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