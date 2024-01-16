import './SpotSearch.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import Spots from '../lib/Spots';
import { Progressbar } from './Progressbar';
import SearchBar from './Searchbar';
import {useState, useEffect} from 'react';
import Datemap from './Datemap';

export function SpotSearch({city: city, onSpotSelect: onSpotSelect}) {
    

    const [selectedSpot, setSelectedSpot] = useState('');

    const handleSpotSelect = (spot) => {
        setSelectedSpot(spot);
        onSpotSelect(spot);
    };


    return (  
        <> 
            <div className = "contents">  

                <div className = "progress_bar">
                    <Progressbar state = {3}/>
                </div>

                <div className = "search_result">
                    
                    <div className = "search_bar">
                        <SearchBar fun={handleSpotSelect} data = {Spots}/>
                    </div>

                    <div className = "searchmap">
                        
                        <div className = "searchcity">
                            <p> {city + " " + selectedSpot} </p>
                        </div>
                        
                        <div className = "resultmap">
                            <Datemap search = {city + " " + selectedSpot}/>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}