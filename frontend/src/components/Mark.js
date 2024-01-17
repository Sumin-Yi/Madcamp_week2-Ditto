import './Mark.css';
import { useEffect, useState } from 'react';
import SearchAddress from '../toolcomponents/SearchAddress';

function Mark(search) {
  const [places, setPlaces] = useState([]);


  useEffect(() => {
    async function fetchPlaces() {
      const getPlaces = await Promise.all(search.search.map(place => SearchAddress({search: place.address_name})));
      setPlaces(getPlaces);
    }
    fetchPlaces();
  }, [search]);

  useEffect(() => {
    const myScript = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=6f1bd6d52fd8d0a0d5d656a4725ae559';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    myScript.then(() => {
      const kakao = window.kakao;

      let defaultLong = 127.88;
      let defaultLat = 37.00;

      if (places && places.length > 0) {
        defaultLong = places[0].lat;
        defaultLat = places[0].long;
      }

      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(defaultLat, defaultLong),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options);

        console.log("place", places);

        places.forEach((place) => {
          const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(place.long, place.lat),
          });
          marker.setMap(map);
        });
      });
    });
  }, [places]);

  return (
    <div className="App">
      <div id="map" className="map" />
    </div>
  );
}

export default Mark;
