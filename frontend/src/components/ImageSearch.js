// MyComponent.js

import React, { useEffect, useState } from 'react';

const ImageSearch = () => {
  const [similarityData, setSimilarityData] = useState(null);

  useEffect(() => {
    // Fetch similarity data when the component mounts
    fetch('http://localhost:80/calculate-similarity')
      .then((response) => response.json())
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
