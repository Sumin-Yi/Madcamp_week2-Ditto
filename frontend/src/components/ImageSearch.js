import React, { useEffect, useState } from 'react';
import { ProgressbarImage } from './ProgressbarImage';
import Datemap from './Datemap';

const ImageSearch = ({place, onPickPlace}) => {

  const [places, setplaces] = useState(place);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState([]);
  const [imageUrl, setImageUrl] = useState('');


  console.log("place", place);

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

    useEffect(() => {
        const fetchImage = async () => {
          try {
            const response = await fetch(); // 이미지 URL에 맞게 수정
            const data = await response.blob();
            const url = URL.createObjectURL(data);
            setImageUrl(url);
          } catch (error) {
            console.error('Error fetching image:', error);
          }
        };
    
        fetchImage();
      }, []);
    
    console.log(places[0].url);

  // Render your component using the similarityData state
  return (
    <div className = "contents">  

        <div className = "progress_bar">
            <ProgressbarImage state = {3}/>
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
                    선택한 장소
                </h1>

                <div className = "searchcity">
                    <h1 className = "medium-heading"> {selectedPlaces && selectedPlaces.length > 0 ? (selectedPlaces[selectedPlaces.length - 1].place_name) : ("대전 유성구")} </h1>
                </div>
                
                <Datemap className="shownmap" search={selectedPlaces && selectedPlaces.length > 0 ? (selectedPlaces[selectedPlaces.length - 1].address_name) : ("대전 유성구")} style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)" }} />
                {/* {<img src={places[0].url} alt="My Image" />} */}

                
                {/* <div className='card-image' style={{backgroundImage: `url(https://mblogthumb-phinf.pstatic.net/MjAxODA1MzBfNSAg/MDAxNTI3NjkwMjkzNTY5.wuw2OHQ-Q7JDYuPsoAwycYXZ2SCXRPU0xKSQ14PXCQUg.CruBVrWYwjw4fmsK10STXtoajWp1xxv4eCl9mlIFvt4g.JPEG.esmiii2/IMG_4413.jpg?type=w800)`}}></div> */}
                {/* <img src={selectedPlaces && selectedPlaces.length > 0 ? (selectedPlaces[selectedPlaces.length - 1].url) : ("")} alt="Web Link Image" /> */}
            </div>
        </div>
        </div>

  );
};

export default ImageSearch;

