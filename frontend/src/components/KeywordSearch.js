import './KeywordSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import "../lib/Cities.json";
import { useState, useEffect } from 'react';
import { CitySearch } from './CitySearch';
import { SpotSearch } from './SpotSearch';
import { PickPlace } from './PickPlace';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar';
import { LoginNavigation } from './Navigation';


function KeywordSearch() {

    const [userData, setUserData] = useState("");

    useEffect(() => {
        fetch("http://172.10.8.246/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userData");
            setUserData(data.data);
        });
    }, []);

    var function_implemented_by_step = null;
    var goback = '';
    var gofront = '';

    const [step, setStep] = useState(1);

    const [selectedDate, setSelectedDate] = useState('20240116');
    
    const [selectedCity, setSelectedCity] = useState('대전');

    const [selectedSpot, setSelectedSpot] = useState('');

    const [selectedPlace, setSelectedPlace] = useState([]);

    const navigate = useNavigate();
    
    const submitButtonClick = () => {
        navigate('/main')
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    }

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
        if(step === 4) {

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
        else{
            setStep(prevStep => Math.min(prevStep + 1, 4));
        }
    }


    if(step === 1) {
        function_implemented_by_step = <Calendar onDate={handleDateSelect} mode = {1}/>
        gofront = '다음으로'
    }
    else if(step === 2) {
        function_implemented_by_step = <CitySearch onCitySelect={handleCitySelect}/>
        gofront = '다음으로'
        goback = '뒤로가기'
    }
    else if (step === 3) {
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