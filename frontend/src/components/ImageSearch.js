import React, { useEffect, useState } from 'react';

const ImageSearch = ({place}) => {

  // Render your component using the similarityData state
  return (
    <div>
      {place ? (
        // Render your similarityData here
        <pre>{JSON.stringify(place, null, 2)}</pre>
      ) : (
        // Loading state or error message
        <div>Loading or Error…</div>
      )}
    </div>
  );
};

export default ImageSearch;

