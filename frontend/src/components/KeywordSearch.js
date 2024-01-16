import './KeywordSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { useState } from 'react';
import { CitySearch } from './CitySearch';
import { SpotSearch } from './SpotSearch';
import { PickPlace } from './PickPlace'; 
import { LoginNavigation } from './Navigation';
import { useNavigate } from 'react-router-dom';

function KeywordSearch() {

    var function_implemented_by_step = null;
    var goback = '';
    var gofront = '';

    const [step, setStep] = useState(1);

    const [selectedCity, setSelectedCity] = useState('대전 유성구');

    const [selectedSpot, setSelectedSpot] = useState('맛집');

    const [selectedPlace, setSelectedPlace] = useState([]);

    const navigate = useNavigate();
    
    const submitButtonClick = () => {
        navigate('/main')
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    const handleSpotSelect = (spot) => {
        setSelectedSpot(spot);
    };

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place);
    };

    const handleGoBack = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    }

    const handleGoFront = () => {
        if(step === 3) {

            // send data to server
            var send_data = selectedPlace.map(place => ({ title: place.place_name, address: place.address_name }));

            console.log(send_data);
            fetch("http://172.10.8.235/calculate-similarity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(send_data)
            })
                .then(res => res.json())
                .then(res => {
                    // respond
                })
                .catch(error => {
                    // error
                });
            
                submitButtonClick()
        }
        else{
            setStep(prevStep => Math.min(prevStep + 1, 3));
        }
    }


    if(step === 1) {
        function_implemented_by_step = <CitySearch onCitySelect={handleCitySelect}/>
        gofront = '다음으로'
    }
    else if (step === 2) {
        function_implemented_by_step = <SpotSearch city = {selectedCity} onSpotSelect = {handleSpotSelect}/>
        gofront = '다음으로'
        goback = '뒤로가기'
    }
    else {
        function_implemented_by_step = <PickPlace city = {selectedCity} spot = {selectedSpot} onPickPlace={handlePlaceSelect}/>
        gofront = '데이트 장소 담기'
        goback = '뒤로가기'
    }

    return (  
        <>
        <LoginNavigation/>
        <div className='full'>
            <h1 className = "keyword-search">
            키워드 검색
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

export default KeywordSearch