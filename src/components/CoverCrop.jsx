import React, {useState, useRef, useCallback, useEffect} from 'react'
import ReactCrop from 'react-image-crop'
import { MDBCol, MDBRow, MDBModal, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'

import 'react-image-crop/dist/ReactCrop.css'

const pixelRatio = window.devicePixelRatio || 1

const CoverCrop = ({setImageData}) => {
    const hiddenFileInput = useRef(null)
    const [upImg, setUpImg] = useState()
    const [modal, setModal] = useState(false)
    const imgRef = useRef(null)
    const [canvasRef, setCanvasRef] = useState("")
    const previewCanvasRef = useRef(null)
    const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 4 / 4 })
    const [completedCrop, setCompletedCrop] = useState(null)

    const handleClick = e => {
        const canvasName = e.currentTarget.getAttribute('data-name')
        setCanvasRef(canvasName)
        hiddenFileInput.current.click()
    };

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
			toggle()

            const reader = new FileReader()
            reader.addEventListener("load", () => {
				var image = new Image();
				image.src = reader.result
				
				setUpImg(reader.result)
			})
            reader.readAsDataURL(e.target.files[0])
			
        }
        e.currentTarget.value = null
    }

    const onLoad = useCallback((img) => {
		img.setAttribute("crossorigin", "anonymous");
        imgRef.current = img
    }, [])

    const toggle = () => {
        setModal(!modal)
    }
    
    const drawCanvas = () => {
        let imageRef = [previewCanvasRef]

        imageRef.map((v, i) => {
            const canvas = imageRef[i].current
            const ctx = canvas.getContext("2d")

            let image = new Image();
            image.src = "https://paulejorgensen.com/wp-content/uploads/2018/12/album-cover-placeholder-light.png";
            
            image.onload = function(){
                canvas.width = image.naturalWidth
                canvas.height = image.naturalHeight

                ctx.drawImage(image, 0, 0);
            }
            return false
        })
    }

    const saveCanvasImage = () => {
        //const canvas = getResizedCanvas(previewCanvasRef.current, crop.width, crop.height);
        // const imageData = canvas.toDataURL("image/jpg")

        // function dataURLtoFile(dataurl, filename) {
        //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        //     while(n--){
        //         u8arr[n] = bstr.charCodeAt(n);
        //     }
        //     return new File([u8arr], filename, {type:mime});
        // }
        
        // //Usage example:
        // const file = dataURLtoFile(imageData, 'filename.png');
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('upload_preset', 'ml_default');
        
        const canvasMap = {
            "previewCenter": previewCanvasRef,
        }

        const previewRef = canvasMap[canvasRef]

        if (!completedCrop || !previewRef.current || !imgRef.current) {
            return
        }
		
        const image = imgRef.current
        const canvas = previewRef.current
        const crop = completedCrop
    
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext("2d")
    
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = "high"
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
		
		canvas.toBlob((blob) => {
			//let file = new File([blob], "filename.jpg", {type: "image/jpg"})
			},
			"image/png",
			1
		);

        const imageData = canvas.toDataURL("image/jpg")
        setImageData(imageData)
        toggle()
    }

    useEffect(() => {
    }, [completedCrop])

    useEffect(() => {
		drawCanvas()
    }, [])
	
	useEffect(() => {
	 	
	}, [crop])
	
	useEffect(() => {
		setCrop({ unit: "%", width: 100, aspect: 4 / 4 })
	}, [upImg])

    return (
        <div style={{width: "50%", margin: "auto"}}>
            <MDBRow>
                <MDBCol size="12" className="h-100">
                    <div>
                        <canvas
                            onClick={handleClick}
                            ref={previewCanvasRef}
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                            data-name="previewCenter"
                        />
                    </div>
                </MDBCol>
            </MDBRow>
            <input type="file" 
                onChange={onSelectFile} 
                style={{ display: "none" }} 
                ref={hiddenFileInput}
                accept="image/*"
            />
            <MDBModal isOpen={modal} toggle={toggle} centered>
                <MDBModalBody className="text-center">
                    <ReactCrop
						crossorigin={'anonymous'}
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        keepSelection={true}
                        imageStyle={{maxHeight: 400}}
                    />
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBBtn color="dark" onClick={toggle}>close</MDBBtn>
                    <MDBBtn color="dark" onClick={saveCanvasImage}>create</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </div>
    )
}

export default CoverCrop