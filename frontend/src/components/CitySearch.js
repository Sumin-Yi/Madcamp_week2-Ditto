import './CitySearch.css';
import './Progressbar.css'
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { Progressbar } from './Progressbar';
import Cities from '../lib/Cities';
import SearchBar from './Searchbar';
import {useState} from 'react';
import Datemap from './Datemap';

export function CitySearch({onCitySelect}) {
    
    
    const [selectedCity, setSelectedCity] = useState("대전");
    
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        onCitySelect(city);
    };


    return (  
            <div className = "contents">  

                <div className = "progress_bar">
                    <Progressbar state = {2}/>
                </div>

                <div className = "search_result">
                    
                    <div className = "search_tab">
                        <h1 className = "city_text">
                            도시를 선택하세요. (대전 지역만 서비스 제공)
                        </h1>

                        <SearchBar className = "search_bar_elem" fun={handleCitySelect} data = {Cities}/>
                    </div>

                    <div className = "searchmap">
                        
                        <h1 className = "city_text">
                            선택한 도시
                        </h1>

                        <div className = "searchcity">
                            <h1 className = "medium-heading"> {selectedCity} </h1>
                        </div>
                        
                        <Datemap className="shownmap" search={selectedCity} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }} />

                    </div>
                </div>
            </div>
    );
}