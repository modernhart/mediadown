import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MDBBtn, MDBContainer, MDBInput, MDBCol, MDBRow } from 'mdbreact'
import { fileDown, NOTICE_ERROR } from '../action'
import {ToggleButton, ButtonGroup} from 'react-bootstrap'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from './common/Header'
import config from '../settings/config.json'
import CoverCrop from './CoverCrop'

const MediaDown = () => {
    const [form, setForm] = useState({ 
        link: null,
        fileName: null, 
		nameType: "youtube",
        artist: null,
        album: null,
        title: null,
    })

    const dispatch = useDispatch()
    const {container} = config
    const {disabledBtn} = useSelector(state => state.media)
    const [canvasImage, setCanvasImage] = useState(null)

    const handleInputChange = (e) => {
        const {name, value} = e.target

		setForm({
			...form,
			[name]: value
		})
	}

    const theme = 'brown'

    const setImageData = (imageData) => {
        setCanvasImage(imageData)
    }

    const register = (e) => {
        e.preventDefault()
        if (form.nameType === "custom" && form.fileName === null) {
            dispatch({
                type: NOTICE_ERROR,
                payload: "inputError"
            })
            return false
        }

		dispatch(fileDown(form, canvasImage))
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
        <Header />
        <MDBContainer style={container} className="text-center mt-5 pt-4">
            <div className="border-0 card">
            <form onSubmit={register} className="text-left">
                <div className="bg-white card-header">
                    <div className="text-muted text-center">
                        <p>음악 파일 설정</p>
                    </div>
                </div>
                <div className="px-lg-5 py-lg-5 card-body">
					<div className="form-group">
                        <MDBInput 
                            className="mb-0"
                            label="유투브 링크(필수)" 
                            type="text" 
                            onChange={handleInputChange} 
                            name="link"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <MDBInput 
                            label="파일 이름" 
                            type="text" 
                            onChange={handleInputChange} 
                            name="fileName"
							disabled={form.nameType === "youtube"}
                        />
                    </div>
					<div className="form-group">
                        <div className="many">
                            <ButtonGroup toggle className="mb-2">
                                <ToggleButton
                                    type="radio"
                                    variant={theme}
                                    checked={form.nameType === "youtube"}
                                    value="youtube"
                                    className="btn-sm"
									name="nameType"
                                    onChange={handleInputChange}
                                    >
                                    유튜브 제목
                                </ToggleButton>
                            </ButtonGroup>   
                            <ButtonGroup toggle className="mb-2">
                                <ToggleButton
                                    type="radio"
                                    variant={theme}
                                    checked={form.nameType === "custom"}
                                    value="custom"
                                    className="btn-sm"
									name="nameType"
                                    onChange={handleInputChange}
                                    >
                                    직접 입력
                                </ToggleButton>
                            </ButtonGroup> 
                        </div>
                    </div>
                    <div className="form-group notice">
                        <MDBInput 
                            className="mb-0"
                            label="타이틀" 
                            type="text" 
                            onChange={handleInputChange} 
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <MDBRow>
                            <MDBCol>
                                <MDBInput 
                                    label="아티스트" 
                                    type="text" 
                                    onChange={handleInputChange} 
                                    name="artist"
                                />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput 
                                    label="앨범" 
                                    type="text" 
                                    onChange={handleInputChange} 
                                    name="album"
                                />
                            </MDBCol>
                        </MDBRow>
                    </div> 
                    <div className="form-group">
                        <Accordion className="shadow-none">
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            커버 이미지
                            </AccordionSummary>
                            <AccordionDetails className="justify-content-center">
                                <CoverCrop setImageData={setImageData} />
                            </AccordionDetails>
                        </Accordion>
                    </div>   
                </div>   
                <div className="px-lg-5 py-lg-5 card-body">
                    <div className="text-center">
                        <MDBBtn color={theme} type="submit" disabled={disabledBtn}>mp3 다운로드</MDBBtn>    
                    </div>
                </div>      
            </form>     
            </div>
        </MDBContainer>
        </>
    )
}

export default MediaDown