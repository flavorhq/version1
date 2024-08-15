import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TV = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchTvShows = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tv/top-tv`);
        setTvShows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div>
      <h1>Top TV</h1>
      <ol type="1">

        {tvShows.map(show => (
          <li key={show.id}>
            <h2>{show.title}</h2>
            <p>{show.overview}</p>
            <p>Rating: {show.voteAverage}</p>
            {show.poster && <img src={show.poster} alt="TV Show Poster" />}
            <p>Release Date: {show.releaseDate}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TV;
