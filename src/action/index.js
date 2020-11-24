import axios from 'axios'
import fileDownload from 'js-file-download'
import config from '../settings/config.json'
let ApiUrl = config.serverUrl

export const REQUEST_SERVER = "REQUEST_SERVER" // heroku deploy
export const CONNECT_SERVER = "CONNECT_SERVER" // heroku deploy
export const REQUEST_ERROR = "REQUEST_SERVER"
export const MEDIA_DOWNLOAD = "MEDIA_DOWNLOAD"
export const NOTICE_ERROR = "NOTICE_ERROR"
export const NOTICE_SUCCESS = "NOTICE_SUCCESS"
export const ALERT_CLOSE = "ALERT_CLOSE"
export const ARTIST_LIST = "ARTIST_LIST"
export const MEDIA_LIST = "MEDIA_LIST"
export const MEDIA_NEXT = "MEDIA_NEXT"
export const MEDIA_HIDE = "MEDIA_HIDE"

const download = async (fileName) => {
    try {
        const res = await axios.get(ApiUrl + `/down/${fileName}`, {
            responseType: 'blob'
        })
        fileDownload(res.data, fileName)
    } catch (err) {
        console.log(err)
    }
}

// heroku request server 
export const requestServer = () => async dispatch => {
    dispatch({
        type: REQUEST_SERVER,
    })

    try {
        const result = await axios.get(ApiUrl)
        const {success} = result.data

        if (success) {
            dispatch({
                type: CONNECT_SERVER,
            })
        }
    } catch (err) {
        dispatch({
            type: REQUEST_ERROR,
        })
    }
}

export const fileDown = (form, canvasImage, history) => async dispatch => {
	dispatch({
		type: MEDIA_DOWNLOAD,
    })
    try {
        const result = await axios.post(ApiUrl + '/video', form)
        const {success, data} = result.data

        if (success) {
            let mediaPath = data.file
            if (canvasImage) {
                const res = await saveCoverImage(canvasImage, mediaPath)
            }
			const splitLink = mediaPath.split('/')
			const fileName = splitLink[splitLink.length - 1]
            dispatch({
                type: NOTICE_SUCCESS,
                payload: "downSuccess"
            })
            const down = await download(fileName)
        } else {
            dispatch({
                type: NOTICE_ERROR,
                payload: "downError"
            })
        }
    } catch (err) {
        dispatch({
            type: NOTICE_ERROR,
            payload: "downError"
        })
    }
}

async function saveCoverImage(canvasImage, mediaPath) {
    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    try {
        const file = dataURLtoFile(canvasImage, 'filename.jpg');
        const coverData = new FormData();
        coverData.append('cover', file);
        coverData.append('mediaPath', mediaPath)
        //form = {...form, cover: file}
        
        const res = await axios.post(ApiUrl + '/video/cover', coverData)
        return res.data
    } catch (err) {
        console.log('error: ', err);
    }
}

export const fileDownUnit = (form, history) => async dispatch => {
    try {
        const res = await axios.get(ApiUrl + '/down/a.txt')
		// const link = document.createElement('a');
		// link.href = url;
		// link.setAttribute('download', 'file.txt'); //or any other extension
		// document.body.appendChild(link);
		// link.click();
    } catch (err) {
        console.log(err)
    }
}

let fetchLink = "https://res.cloudinary.com/dungjiimg/image/fetch/w_400,h_400,c_fill/"

/* sample data */
const artists = [
    {
        id: 1,
        name: "아이유",
        thumbnail: fetchLink + "https://ww.namu.la/s/aeca2e14dbb78281beabffe6d5a8b1a84233da4aa2d7b857f11baa8530908b4faf2dae5ce55389c73821b2235cfa3c4d9744bb30d3edc6efda4a446164481c787a141a85dc5d9e31be76121208135144a25a33f1e0c420118895b507faf78e44babb0bb557189dfdd2f48f6f622cc9c5",
        video: [
            {
                title: "분홍신",
                videoId: "C-Mxyvv0IDY"
            },
            {
                title: "에잇",
                videoId: "eV0RTrP9pjM"
            },
            {
                title: "밤편지",
                videoId: "6744glqD6lk"
            },
            {
                title: "첫 이별 그날 밤",
                videoId: "zrtwnrFefwA"
            }
        ],
        images: [
            fetchLink + "https://pbs.twimg.com/media/D0AEcLJVYAErhXl.jpg",
            fetchLink + "https://www.lkp.news/data/photos/20200209/art_15828097711626_5b5d13.jpg"
        ]
    },
    {
        id: 2,
        name: "방탄소년단",
        thumbnail: fetchLink + "https://pds.joins.com/news/component/htmlphoto_mmdata/202006/25/ed36081b-3da1-4bf1-8ffb-e180ed93d338.jpg",
        video: [
            {
                title: "Dynamite",
                videoId: "KhZ5DCd7m6s"
            },
            {
                title: "작은 것들을 위한 시",
                videoId: "OEnvXsyGZmU"
            },
            {
                title: "봄날",
                videoId: "Y4Zpm41f1VQ"
            },
            {
                title: "FAKE LOVE",
                videoId: "7C2z4GqqS5E"
            },
        ],
        images: [
            fetchLink + "https://img.khan.co.kr/news/2020/01/08/l_2020010801000817800063351.jpg"
        ]
    },
    {
        id: 3,
        name: "이승기",
        thumbnail: fetchLink + "https://www.beffreport.com/news/photo/202006/80069_39330_4240.jpg",
        video: [
            {
                title: "하기 힘든 말",
                videoId: "_btG4-b5G-k"
            },
            {
                title: "뻔한 남자",
                videoId: "LfHkYr_cok4"
            },
            {
                title: "결혼해줄래",
                videoId: "g7cG4AThdsc"
            },
            {
                title: "다줄꺼야",
                videoId: "KATbxQqZFxo"
            },
        ],
        images: [
            fetchLink + "https://pds.joins.com/news/component/htmlphoto_mmdata/202002/27/d041f47a-263f-445d-bd1c-f9fcb0908760.jpg"
        ]
    },
    {
        id: 4,
        name: "다비치",
        thumbnail: fetchLink + "https://pbs.twimg.com/profile_images/1137369628865204224/KUWEuL9B_400x400.jpg",
        video: [
            {
                title: "내 옆에 그대인걸",
                videoId: "7TBIPd0zt1I"
            },
            {
                title: "오늘따라 보고싶어서 그래",
                videoId: "E20WWeq_NSo"
            },
            {
                title: "안녕이라도 말하지마",
                videoId: "UbAaX8NeR5w"
            },
            {
                title: "미워도 사랑하니까",
                videoId: "xtuh0ji_IaY"
            },
        ],
        images: [
            fetchLink + "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2018/07/05/zZJ0B8CArbfT636663839862096565.jpg"
        ]
    },
    {
        id: 5,
        name: "나인뮤지스",
        thumbnail: fetchLink + "https://cphoto.asiae.co.kr/listimglink/1/2015012808490835039_1.jpg",
        video: [
            {
                title: "Dolls",
                videoId: "qW6D8rYppwY"
            },
            {
                title: "Drama",
                videoId: "0meMvE_7i1s"
            },
            {
                title: "티켓",
                videoId: "oBIiSH6miwI"
            },
            {
                title: "기억해",
                videoId: "Bfmj-8dgTUI"
            },
        ],
        images: [
            fetchLink + "http://ph.spotvnews.co.kr/news/photo/201902/264287_324935_0540.jpg"
        ]
    }
]

export const getArtistList = () => dispatch => {
    dispatch({
        type: ARTIST_LIST,
        payload: artists
    })
}

export const getVideos = (query) => async dispatch => {
    let searchLink = "https://www.googleapis.com/youtube/v3/search"
    
    const options={
		q: query + " mp3 mv",
		part: "snippet",
		key: "AIzaSyCu_rYO6Lq6u-rMYuc0uVRv7cqqdZocqok",
		type: "video",
        maxResults: 5
    };
    
    let queryString = Object.keys(options).map(function(key) {
        return key + '=' + options[key]
    }).join('&')

    const {video, images} = artists.find(val => val.name === query)

    dispatch({
        type: MEDIA_HIDE
    })

    try {
        /* 유투브 search API (하루 할당량 제한) */

        let youtubeVideo = []
        const res = await axios.get(searchLink + `?${queryString}`)
        youtubeVideo = res.data.items
        const {resultsPerPage} = res.data.pageInfo 
        const nextToken = res.data.nextPageToken

        dispatch({
            type: MEDIA_LIST,
            payload: youtubeVideo,
            isAPIData: true,
            image: images,
            pageCount: resultsPerPage,
            nextToken
        })
    } catch(err) {
        dispatch({
            type: MEDIA_LIST,
            payload: video,
            isAPIData: false,
            image: images
        })
        dispatch({
            type: NOTICE_ERROR,
            payload: "youtubeError"
        })
    }
}

export const getNextVideos = (query, pageToken) => async dispatch => {
    let searchLink = "https://www.googleapis.com/youtube/v3/search"
    
    const options={
		q: query + " mp3 mv",
		part: "snippet",
		key: "AIzaSyCu_rYO6Lq6u-rMYuc0uVRv7cqqdZocqok",
		type: "video",
        maxResults: 5,
        pageToken
    };
    
    let queryString = Object.keys(options).map(function(key) {
        return key + '=' + options[key]
    }).join('&')

    try {
        /* 유투브 search API (하루 할당량 제한) */

        let nextVideo = []
        const res = await axios.get(searchLink + `?${queryString}`)
        nextVideo = res.data.items
        const nextToken = res.data.nextPageToken

        dispatch({
            type: MEDIA_NEXT,
            payload: nextVideo,
            nextToken
        })
    } catch(err) {
        dispatch({
            type: NOTICE_ERROR,
            payload: "youtubeError"
        })
    }
}