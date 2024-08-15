import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Music = () => {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchMusic = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/music/top-music`);
        setMusic(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMusic();
  }, []);

  return (
    <div>
      <h1>Top Music</h1>
      <ol type="1">
        {music.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Channel: {item.channelTitle}</p>
            {item.thumbnail && <img src={item.thumbnail} alt="Music Thumbnail" />}
            <p><a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Music;
