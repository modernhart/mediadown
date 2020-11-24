import React from 'react'
import { MDBListGroupItem, MDBIcon, MDBBtn } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import parse from 'html-react-parser'

import { fileDown } from '../action'

const VideoList = ({medias, youtubeData, pageVideos}) => {
    const {disabledBtn} = useSelector(state => state.media)
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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

    const DownLoad = (videoId) => {
        dispatch(fileDown({link: `https://www.youtube.com/embed/${videoId}`}))
    }
    
    return (
        <>
        {(medias && medias.map((val, index) => (
            <MDBListGroupItem key={index} className="justify-content-between text-left p-0">
              <Accordion className="shadow-none" 
                expanded={expanded === index} 
                onChange={handleChange(index)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                {parse(getVideoData(val, 'title'))}
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
        </>
    )
}

export default VideoList