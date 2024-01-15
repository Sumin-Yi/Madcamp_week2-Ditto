import './Datemap.css';
import { useEffect, useState } from 'react';
import SearchPlace from '../toolcomponents/SearchPlace';


// Search data with SearchPlace and mark places.
// 
function Datemap(search) {
  
    console.log(search);
    const [places, setplaces] = useState(null);
    
    useEffect(() => {
      async function fetchPlaces(){
        const getplaces = await SearchPlace(search);
        setplaces(getplaces);
      }
      fetchPlaces()
    }, [search]);


  const new_script = src => { 
    return new Promise((resolve, reject) => { 
      const script = document.createElement('script'); 
      script.src = src; 
      script.addEventListener('load', () => { 
        resolve(); 
      }); 
      script.addEventListener('error', e => { 
        reject(e); 
      }); 
      document.head.appendChild(script); 
    }); 
  };
  
  useEffect(() => { 
    
    const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6f1bd6d52fd8d0a0d5d656a4725ae559');
    
    
    my_script.then(() => {

      console.log(places);  
      
      const kakao = window['kakao']; 
    
      var default_long = 127.88;
      var default_lat = 37.00;

      if (places){
      
        if(places.length !== 0){
        default_long = places[0].long;
        default_lat = places[0].lat;
       }
      
      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = { 
          center: new kakao.maps.LatLng(default_long, default_lat),
          level: 3 
        }; 
        const map = new kakao.maps.Map(mapContainer, options);

        for(var i = 0; i < places.length; i++){
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(places[i].long, places[i].lat)
              });
              marker.setMap(map);
        }


      });
    }   
    }); 
  }, [places]);

  return (
    <div className="App">
      <div id="map" className="map"/>
    </div>
  );
}

export default Datemap;