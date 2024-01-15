async function SearchPlace(searching) {

    console.log("searching is", searching);

    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searching.search}`;
    const headers = {"Authorization": "KakaoAK d5119b5a68c2c1b8c8395224560e3012"}

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      console.log("data is :", data);

      return data.documents.map(place => ({
          place_name: place.place_name,
          address_name: place.address_name,
          lat: place.x,
          long: place.y
      }));
  }
  
  catch (error) {
      return [];
  }
}

export default SearchPlace;