import './CitySearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { Progressbar } from './Progressbar';
import { LoginNavigation } from './Navigation';
import SearchBar from './Searchbar';
import {useState} from 'react';
import Datemap from './Datemap';

export function CitySearch({onCitySelect}) {
    
    
    const [selectedCity, setSelectedCity] = useState('대전 유성구');
    
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        onCitySelect(selectedCity);
    };


    return (  
        <> 
            <div className = "contents">  

                <div className = "progress_bar">
                    <Progressbar state = {1}/>
                </div>

                <div className = "search_result">
                    
                    <div className = "search_bar">
                        <SearchBar onCitySelect={handleCitySelect}/>
                    </div>

                    <div className = "searchmap">
                        
                        <div className = "searchcity">
                            <p> {selectedCity} </p>
                        </div>
                        
                        <div className = "resultmap">
                            <Datemap search = {selectedCity}/>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}