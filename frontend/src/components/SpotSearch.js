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
    

    const [selectedSpot, setSelectedSpot] = useState("");

    const handleSpotSelect = (spot) => {
        setSelectedSpot(spot);
        onSpotSelect(spot);
    };


    return (  

        <div className = "contents">  

        <div className = "progress_bar">
            <Progressbar state = {3}/>
        </div>

        <div className = "search_result">
            
            <div className = "search_tab">
                <h1 className = "spot_text">
                    카테고리를 선택하세요.
                </h1>

                <SearchBar className = "search_bar_elem" fun={handleSpotSelect} data = {Spots}/>
                
                <div className = "category">
                {Spots.map((spot, index) => (
                    <div
                    key={index}
                    onClick={() => handleSpotSelect(spot)}
                    className={`spot-item ${spot === selectedSpot ? 'selected' : ''}`}
                    style={{
                        display: 'flex',
                        height: '10%',
                        width: '20%',
                        borderRadius: '40px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                        marginBottom: '20px',
                        margin: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}
                    >
                    <h2 className = "small-primary-heading" style = {{margin: '10px', flex: '1'}}>{spot}</h2>
                    </div>
                ))}
                </div>            
            </div>

            <div className = "searchmap">
                
                <h1 className = "spot_text">
                    선택한 카테고리
                </h1>

                <div className = "spotcity">
                    <h1 className = "medium-heading"> {city + " " + selectedSpot} </h1>
                </div>
                
                <Datemap className="shownmap" search={city + " " + selectedSpot} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }} />

            </div>
        </div>
        </div>
    );
}