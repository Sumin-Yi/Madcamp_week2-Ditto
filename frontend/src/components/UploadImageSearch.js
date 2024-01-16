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

    const [selectedPlace, setSelectedPlace] = useState();
    
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

    const dataURLToBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type: mime });
    };

    const handleGoFront = () => {
        if(step === 1) {

            const blobImage = dataURLToBlob(selectedImage);
            const formData = new FormData();
            formData.append('image', blobImage);

            fetch("http://172.10.8.246/calculate-similarity", {
                method: "POST",
                body: formData,
                timeout: 50000
            })
            .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                if (data.status == 'success') {
                    console.log(data.data);
                  setSelectedPlace(data.data);
                } else {
                  console.error('Error fetching similarity data:', data.message);
                }
              })
              .catch((error) => {
                console.error('Error fetching similarity data:', error);
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
        function_implemented_by_step = <ImageSearch place = {selectedPlace}/>
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