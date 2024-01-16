import './PickPlace.css';
import './Progressbar.css';
import "../lib/styles/Button.css";
import "../lib/styles/Text.css";
import "../lib/Structure.css";
import { Progressbar } from './Progressbar';
import SearchPlace from '../toolcomponents/SearchPlace';
import {useState, useEffect} from 'react';
import Datemap from './Datemap';

export function PickPlace({city, spot, onPickPlace}) {
    
    const [places, setplaces] = useState(null);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    
    useEffect(() => {
      async function fetchPlaces(){
        const getplaces = await SearchPlace({search : city + " " + spot});
        setplaces(getplaces);
      }
      fetchPlaces()
    }, [city, spot]);


    const handlePlaceClick = (index) => {
        const selectedPlace = places[index];
        if (!selectedPlaces.some(place => place.place_name === selectedPlace.place_name)) {
            setSelectedPlaces((prevSelected) => [...prevSelected, selectedPlace]);
            onPickPlace(selectedPlaces);
        }
    };

    useEffect(() => {
        onPickPlace(selectedPlaces);
    }, [selectedPlaces]);


    return (  
        <> 
            <div className = "contents">  

                <div className = "progress_bar">
                    <Progressbar state = {4}/>
                </div>

                <div className = "search_result">

                <div className="searchlist">
                    {places && places.length > 0 ? (
                        places.map((elem, index) => (
                        <p key={index} onClick={() => handlePlaceClick(index)}>
                            {elem.place_name} - {elem.address_name}
                        </p>
                        ))
                    ) : (
                        <p>추천 장소가 없습니다.</p>
                    )}
                </div>

                    <div className = "searchmap">
                        
                        <div className = "searchcity">
                            <p> {city + " " + spot} </p>
                        </div>

                        <div className="selected_places">
                            {selectedPlaces.map((selectedPlace, index) => (
                                <p key={index}>{selectedPlace.place_name} - {selectedPlace.address_name}</p>
                            ))}
                        </div>
                        
                        <div className = "resultmap">
                            <Datemap search = {city + " " + spot}/>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}