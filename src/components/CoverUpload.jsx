import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { MDBBtn, MDBContainer, MDBInput, MDBCol, MDBRow, MDBAnimation } from 'mdbreact'
import {ToggleButton, ButtonGroup} from 'react-bootstrap'
import Header from './common/Header'
import config from '../settings/config.json'
import CoverCrop from './CoverCrop'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'

const CoverUpload = () => {
    const {container} = config
    const dispatch = useDispatch()
    const history = useHistory()
    const [canvasImage, setCanvasImage] = useState({
        previewCenter: null
    })

    const handleInputChange = (e) => {

    }
    const theme = 'purple'

    const setImageData = (canvasRef, imageData) => {
        setCanvasImage({
            ...canvasImage,
            [canvasRef]: imageData
        })
    }

    const saveToCloudinary = async () => {
        function dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }

        const promises = Object.keys(canvasImage).map(async key => {
            if (canvasImage[key]) {
                const file = dataURLtoFile(canvasImage[key], 'filename.jpg');
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'ml_default');
                
                const res = await axios.post('https://api.cloudinary.com/v1_1/dungjiimg/image/upload', formData)
                return res.data
            }
        })

        try {
            const data = await Promise.all(promises);
            return data
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const update = (e) => {
        e.preventDefault()
        saveToCloudinary()
        .then((result) => {
            console.log('res', result)
            //let cloudImage = []
        })
        
    }

    return (
        <>
        <Header />
        <MDBContainer style={container} className="text-center mt-5 pt-4">
            <MDBAnimation type='zoomIn' duration='500ms'>
                <div className="border-0 card">
                <form role="form" onSubmit={update} className="text-left">
                    <div className="bg-white card-header">
                        <div className="text-muted text-center">
                            <medium>커버 업로드</medium>
                        </div>
                    </div>
                    <div className="px-lg-5 py-lg-5 card-body">
                        <CoverCrop setImageData={setImageData} />
                        <div className="form-group">
                            <MDBInput 
                                label="닉네임" 
                                type="text" 
                                onChange={handleInputChange} 
                                name="nick"
                            />
                        </div>
                        <div className="form-group">
                            <MDBRow>
                                <MDBCol>
                                    <MDBInput 
                                        label="나이" 
                                        type="number" 
                                        onChange={handleInputChange} 
                                        name="age"
                                        min="25"
                                        max="45"
                                    />
                                </MDBCol>
                                <MDBCol>
                                    <MDBInput 
                                        label="키" 
                                        type="number" 
                                        onChange={handleInputChange} 
                                        name="height"
                                    />
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </div> 
                    <div className="px-lg-5 py-lg-5 card-body">
                        {/* <div className="form-group">
                            <label className="text-left d-block">선호 종교</label>
                            <div className="many">
                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton
                                        type="radio"
                                        variant={theme}
                                        checked={false}
                                        value={1}
                                        className="btn-sm"
                                        name={'some_religion'}
                                        onChange={handleInputChange}
                                    >
                                        1
                                    </ToggleButton>
                                </ButtonGroup>   
                                <ButtonGroup toggle className="mb-2">
                                    <ToggleButton
                                        type="radio"
                                        variant={theme}
                                        checked={true}
                                        value={2}
                                        className="btn-sm"
                                        name={'some_religion'}
                                        onChange={handleInputChange}
                                    >
                                        2
                                    </ToggleButton>
                                </ButtonGroup>  
                            </div>
                        </div> */}
                        <div className="text-center">
                            <MDBBtn color={theme} type="submit">커버 업로드</MDBBtn>    
                        </div>
                    </div>      
                </form>     
                </div>
            </MDBAnimation>
        </MDBContainer>
        </>
    )
}

export default CoverUpload