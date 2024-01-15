// MyComponent.js

import React, { useEffect, useState } from 'react';

const ImageSearch = () => {
  const [similarityData, setSimilarityData] = useState(null);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 API 호출
    fetch('http://localhost:80/calculate-similarity')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status == 'success') {
          setSimilarityData(data.data);
        } else {
          console.error('Error fetching similarity data:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching similarity data:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  // Render your component using the similarityData state
  return (
    <div>
      {similarityData ? (
        // Render your similarityData here
        <pre>{JSON.stringify(similarityData, null, 2)}</pre>
      ) : (
        // Loading state or error message
        <div>Loading or Error...</div>
      )}
    </div>
  );
};

export default ImageSearch;

