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
    const [selectedItemIndex, setSelectedItemIndex] = useState([]);
    
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
            setSelectedItemIndex((prevSelectedItem) => [...prevSelectedItem, index]);
            setSelectedPlaces((prevSelected) => [...prevSelected, selectedPlace]);
            onPickPlace(selectedPlaces);
        }
        else {
            setSelectedItemIndex((prevSelectedItem) => prevSelectedItem.filter(item => item !== index));
            setSelectedPlaces((prevSelected) => prevSelected.filter(place => place !== selectedPlace));
            onPickPlace(selectedPlaces);
        }
    };

    useEffect(() => {
        onPickPlace(selectedPlaces);
    }, [selectedPlaces]);


    return (  

        <div className = "contents">  

        <div className = "progress_bar">
            <Progressbar state = {4}/>
        </div>

        <div className = "search_result">
            
            <div className = "show_tab">
                <h1 className = "place_text">
                    오늘 여기는 어때요?
                </h1>


        {places && places.length > 0 ? (
            places.map((elem, index) => (
                        
                <div className="searchlist" 
                    key={index}
                    onClick={() => handlePlaceClick(index)}
                    style={{
                        display: 'flex',
                        height: '15%',
                        width: 'calc(100% - 30px)',
                        borderRadius: '10px',
                        textAlign: 'left',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                        marginBottom: '20px',
                        margin: '10px',
                        backgroundColor: `${selectedItemIndex.includes(index) ? 'var(--main1)' : 'var(--white)'}`
                    }}>
                        <h1 className = "small-primary-heading" style = {{margin: '10px', flex: '1'}}>{elem.place_name}</h1>
                 </div>
            ))
            ) : (
            <p>추천 장소가 없습니다.</p>
            )}
            </div>


            <div className = "searchmap">
                
                <h1 className = "place_text">
                    선택한 도시
                </h1>

                <div className = "searchcity">
                    <h1 className = "medium-heading"> {city + " " + spot} </h1>
                </div>
                
                <Datemap className="shownmap" search={city + " " + spot} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }} />

            </div>
        </div>
        </div>
    );
}