import React, {useEffect} from 'react'
import { MDBListGroup, MDBListGroupItem, MDBBadge, MDBAnimation, MDBContainer, MDBIcon, MDBBtn } from 'mdbreact';
import Header from './common/Header'
import { useSelector, useDispatch } from 'react-redux'
import config from '../settings/config.json'
import { fileDown, getVideos } from '../action'
import Loader from './common/Loader';
// Import Swiper styles
import 'swiper/swiper.scss'
import '../App.css'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const MediaDetail = (props) => {
  const {name} = props.match.params
  const {container} = config
  const {medias, artImage, youtubeData, show} = useSelector(state => state.artist)
  const {disabledBtn} = useSelector(state => state.media)
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let item = artImage.map((v, i) => {
    return {
      original: v,
      thumbnail: v,
      originalAlt: "https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png",
      thumbnailAlt: "https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png"
    }
  })

  const DownLoad = (videoId) => {
    dispatch(fileDown({link: `https://www.youtube.com/embed/${videoId}`}))
  }

  const getVideoData = (value, key) => {
    let result = null
    /* 유투브 혹은 샘플 데이터 get */
    if (youtubeData) {
      result = (key === "videoId")? value.id[key]: value.snippet[key]
    } else {
      result = value[key]
    }
    return result
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
              {(medias && medias.map((val, index) => (
                <MDBListGroupItem key={index} className="justify-content-between text-left p-0">
                  <Accordion className="shadow-none" 
                    expanded={expanded === getVideoData(val, 'title')} 
                    onChange={handleChange(getVideoData(val, 'title'))}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    {getVideoData(val, 'title')}
                    </AccordionSummary>
                    <AccordionDetails className="justify-content-center">
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${getVideoData(val, 'videoId')}`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                    </AccordionDetails>
                    <div className="d-flex justify-content-center p-1">
                      <MDBBtn color="brown" disabled={disabledBtn} className="btn-sm" onClick={() => DownLoad(getVideoData(val, 'videoId'))}>
                        <MDBIcon icon="arrow-alt-circle-down" /> 다운로드
                      </MDBBtn>
                    </div>
                  </Accordion>
                </MDBListGroupItem>
              )))}
            </MDBListGroup>
            </div>
          {/* <FavorButton matchingSome={true} /> */}
          </MDBAnimation>
        ) : <Loader />}
      </MDBContainer>
      </>
  )
}

export default MediaDetail