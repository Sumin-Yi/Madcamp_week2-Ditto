import './UploadImageSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { useState } from 'react';
import UploadBox from './Upload';
import { LoginNavigation } from './Navigation';
import ImageSearch from './ImageSearch';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';

function UploadImageSearch() {

    var function_implemented_by_step = null;
    var goback = '';
    var gofront = '';

    const [step, setStep] = useState(1);

    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedPlace, setSelectedPlace] = useState([{place_name: "하얀책상", address_name: "대전광역시 서구 갈마동 갈마역로11번길 33", url: ""}]);

    const [selectedDate, setSelectedDate] = useState('20240116');
    
    const navigate = useNavigate();

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    }


    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place);
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
            setStep(prevStep => Math.min(prevStep + 1, 3));
        }
        
        else if(step === 2) {
            if(selectedImage){
            const blobImage = dataURLToBlob(selectedImage);
            const formData = new FormData();
            formData.append('image', blobImage);

            fetch("http://172.10.8.246/calculate-similarity", {
                method: "POST",
                body: formData,
                timeout: 1000000
            })
            .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((data) => {
                if (data.status === 'success') {
                    console.log(data.data);
                  setSelectedPlace( data.data.map(item => ({
                    place_name: item.title,
                    address_name: item.address,
                    url: item.image,
                })));
                setStep(prevStep => Math.min(prevStep + 1, 3));
                
                } else {
                  console.error('Error fetching similarity data:', data.message);
                }
              })
              .catch((error) => {
                console.error('Error fetching similarity data:', error);
              });
            }
            else{
                setStep(prevStep => Math.min(prevStep + 1, 3));
            }
        }
        else{
            
            // send data to server
            var send_data = selectedPlace.map(place => ({
                date: selectedDate,
                title: place.place_name,
                address: place.address_name
              }));
            
              console.log(send_data);
              send_data.forEach(item => {
                fetch("http://172.10.8.246/add-to-list", {
                  method: "POST",
                  headers: {
                    "Authorization": window.localStorage.token,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ data: item }) // data를 item으로 변경
                })
                  .then(res => res.json())
                  .then(res => {
                    // respond
                  })
                  .catch(error => {
                    // error
                  });
              });

            submitButtonClick()
        }
    }


    if(step === 1) {
        function_implemented_by_step = <Calendar onDate={handleDateSelect} mode = {2}/>
        gofront = '다음으로'
    }
    else if(step === 2){
        function_implemented_by_step = <UploadBox onImageUpload={handleImageSelect}/>
        gofront = '유사한 데이트 장소 추천받기'
        goback = '뒤로가기'
    }
    else {
        function_implemented_by_step = <ImageSearch place = {selectedPlace} onPickPlace={handlePlaceSelect}/>
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