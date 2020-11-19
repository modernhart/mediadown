import {MEDIA_DOWNLOAD, NOTICE_ERROR, NOTICE_SUCCESS, ALERT_CLOSE} from '../action'

const initialState = {
	disabledBtn: false,
    mediaName: null,
    alertShow: false,
    alertMsg: "",
    alertStatus: "error"
}

export default function(state = initialState, action) {
	switch(action.type) {
		case MEDIA_DOWNLOAD:
			return {
                ...state,
				disabledBtn: !state.disabledBtn
            }
        case NOTICE_ERROR:
            return {
                ...state,
                alertShow: true,
                disabledBtn: false,
                alertMsg: action.payload,
                alertStatus: "error"
            }
        case NOTICE_SUCCESS:
            return {
                ...state,
                alertShow: true,
                disabledBtn: false,
                alertMsg: action.payload,
                alertStatus: "success"
            }
        case ALERT_CLOSE:
            return {
                ...state,
                alertShow: false
            }
		default:
            return state	
	}
}