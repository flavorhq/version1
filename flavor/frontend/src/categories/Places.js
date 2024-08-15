import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/places/top-places`);
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Top Places</h1>
      <ol type="1">
        {places.map(place => (
          <li key={place.id}>
            <h2>{place.name}</h2>
            <p>{place.address}</p>
            <p>Rating: {place.rating}</p>
            {place.photo && <img src={place.photo} alt="Place" />}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Places;
