import React, {useEffect, useState, useRef} from 'react'
import SwiperCore, { EffectCoverflow } from 'swiper';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol, MDBContainer, MDBAnimation } from 'mdbreact';
import { Swiper, SwiperSlide } from 'swiper/react'
import { getArtistList } from '../action'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import Header from './common/Header'
import Loader from './common/Loader';
// Import Swiper styles
import 'swiper/swiper.scss'
import config from '../settings/config.json'

import _ from 'lodash'


SwiperCore.use([EffectCoverflow]);

const SlideCard = ({item, view}) => {
  return (
    <MDBCol>
      <MDBCard onClick={() => view(item.name)}>
        <MDBCardImage className="img-fluid m-auto swiper-lazy" src={item.thumbnail} waves />
        <MDBCardBody>
          <MDBCardTitle className="m-0">{item.name}</MDBCardTitle>
          {/* <MDBCardText>
          </MDBCardText> */}
          {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

const ArtistList = () => {
    const {container} = config
    const {list} = useSelector(state => state.artist)
    const [show, setShow] = useState(false)
    const swiper = useRef(null)
    const shuffleList = _.shuffle(list)

    const dispatch = useDispatch()
    const history = useHistory()

    const view = (name) => {
      history.push('/artist/detail/' + name)
    }

    useEffect(() => {
      dispatch(getArtistList())
      setTimeout(() => {
        setShow(true)
      }, 1000)
    }, [dispatch])

    useEffect(() => {
      // if (swiper.current) {
      //   console.log(swiper.current.appendSlide())
      // } 
    }, [list])

    return (
        <>
        <Header />
        <MDBContainer style={container} className="text-center mt-5 pt-5">
          {(show) ? (
          <MDBAnimation type='zoomIn' duration='500ms'>
            <Swiper
              ref={swiper}
              effect={'coverflow'}
              spaceBetween={50}
              slidesPerView={'auto'}
              centeredSlides={true}
              coverflowEffect={
                  {
                      rotate: 30,
                      stretch: 100,
                      depth: 800,
                      modifier: 1,
                      slideShadows: true
                  }
              }
              // onReachBeginning={() => setIsStart(true)}
              // onReachEnd={() => setIsLast(true)}
              //onSwiper={(swiper) => console.log(swiper)}
              >
              {(list.length) ? shuffleList.map((v, i) => (
                <SwiperSlide key={i}>
                  <SlideCard item={v} view={view} />
                </SwiperSlide>
              )) : (
                null
              )}
            </Swiper>
          </MDBAnimation>
          ) : <Loader />}
        </MDBContainer>
        </>
    )
}

export default ArtistList