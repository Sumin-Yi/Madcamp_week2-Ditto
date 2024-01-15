import './KeywordSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { useState } from 'react';
import { CitySearch } from './CitySearch';
import { SpotSearch } from './SpotSearch';
import { PickPlace } from './PickPlace';
import { ImageUpload } from './ImageUpload'; 
import { LoginNavigation } from './Navigation';

function KeywordSearch() {

    var function_implemented_by_step = null;
    var goback = '';
    var gofront = '';

    const [step, setStep] = useState(1);

    const [selectedCity, setSelectedCity] = useState('대전 유성구');

    const handleCitySelect = (city) => {
        setSelectedCity(city);
    };

    const handleGoBack = () => {
        setStep(prevStep => Math.max(prevStep - 1, 1));
    }

    const handleGoFront = () => {
        if(step === 3) {
            
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
        function_implemented_by_step = <SpotSearch/>
        gofront = '다음으로'
        goback = '뒤로가기'
    }
    else if (step === 3) {
        function_implemented_by_step = <PickPlace/>
        gofront = '데이트 장소 담기'
        goback = '뒤로가기'
    }
    else {
        function_implemented_by_step = <ImageUpload/>
        gofront = '다음으로'
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