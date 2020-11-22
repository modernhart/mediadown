import React, {useEffect} from 'react'
import { MDBListGroup, MDBListGroupItem, MDBBadge, MDBAnimation, MDBContainer, MDBIcon, MDBBtn } from 'mdbreact';
import Header from './common/Header'
import { useSelector, useDispatch } from 'react-redux'
import config from '../settings/config.json'
import { getVideos, getNextVideos } from '../action'
import Loader from './common/Loader'
import VideoList from './VideoList'

// Import Swiper styles
import 'swiper/swiper.scss'
import '../App.css'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";


const MediaDetail = (props) => {
  const {name} = props.match.params
  const {container} = config
  const {medias, artImage, show, youtubeData, totalVideos, pageVideos, nextToken} = useSelector(state => state.artist)
  const dispatch = useDispatch()

  let item = artImage.map((v, i) => {
    return {
      original: v,
      thumbnail: v,
      originalAlt: "https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png",
      thumbnailAlt: "https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png"
    }
  })

  const getNextData = (token) => {
    console.log('getNextData', token)
    dispatch(getNextVideos(name, token))
  }

  useEffect(() => {
    dispatch(getVideos(name))
  }, [dispatch, name])

  return (
      <>
      <Header />
      <MDBContainer style={container} className="text-center mt-5 pt-4">
        {(show) ? (
          <MDBAnimation type='zoomIn' duration='500ms'>
          <ImageGallery 
            thumbnailPosition={"right"}
            showPlayButton={false}
            showFullscreenButton={false}
            lazyLoad={true}
            showBullets={true}
            onErrorImageURL={"https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png"}
            showNav={false}
            items={item} />
            <p className="font-weight-bold mt-2"> <MDBBadge color="brown" pill>{name}</MDBBadge></p>
            <div className="form-group mt-3">
              <MDBListGroup>
                <VideoList 
                  medias={medias}
                  youtubeData={youtubeData}
                  pageVideos={pageVideos}  
                />
                {(youtubeData && nextToken)? (
                  <MDBListGroupItem>
                    <MDBIcon icon="chevron-down" className="d-flex justify-content-center" onClick={() => getNextData(nextToken)}/>
                  </MDBListGroupItem>
                ) : null}
              </MDBListGroup>
            </div>
          </MDBAnimation>
        ) : <Loader />}
      </MDBContainer>
      </>
  )
}

export default MediaDetail