import './UploadImageSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { useState } from 'react';
import { SpotSearch } from './SpotSearch';
import UploadBox, {Upload} from './Upload';
import { LoginNavigation } from './Navigation';
import ImageSearch from './ImageSearch';
import { useNavigate } from 'react-router-dom';

function UploadImageSearch() {

    var function_implemented_by_step = null;
    var goback = '';
    var gofront = '';

    const [step, setStep] = useState(1);

    const [selectedImage, setSelectedImage] = useState("");

    const [selectedPlace, setSelectedPlace] = useState([]);
    
    const navigate = useNavigate();

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleGoBack = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    }
    
    const submitButtonClick = () => {
        navigate('/main')
    };

    const handleGoFront = () => {
        if(step === 1) {

        var send_data = {image : selectedImage};

            fetch("서버주소", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(send_data)
            })
                .then(res => res.json())
                .then(res => {
                    // respond

                    setStep(prevStep => Math.min(prevStep + 1, 2));
                })
                .catch(error => {
                    // error
                });
            
            setStep(prevStep => Math.min(prevStep + 1, 2));
        }
        else{
            submitButtonClick()
        }
    }


    if(step === 1) {
        function_implemented_by_step = <UploadBox onImageUpload={handleImageSelect}/>
        gofront = '유사한 데이트 장소 추천받기'
    }
    else {
        function_implemented_by_step = <ImageSearch/>
        gofront = '데이트 장소 담기'
        goback = '뒤로가기'
    }


    return (  
        <>
        <LoginNavigation/>
        <div className='full'>
            <h1 className = "keyword-search">
            이미지 검색
            </h1>
            {function_implemented_by_step}
            <div className = 'move'>
                <div className = 'goback' onClick = {handleGoBack}>
                    <h1 className='small-primary-heading'>{goback}</h1>
                </div>
                <div className = 'gofront' onClick = {handleGoFront}>
                    <h1 className='small-primary-heading'>{gofront}</h1>
                </div>
            </div>
        </div>
        </>
    );
}

export default UploadImageSearch