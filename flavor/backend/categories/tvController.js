const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/top-tv', async (req, res) => {
  try {
    const apiKey = '2c9086c357c98f00caf14024368d88b5'; // Replace with your actual TMDB API key
    const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';

    const response = await axios.get(apiUrl, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page: 1,
      },
    });

    console.log('Request URL:', apiUrl);
    console.log('Request Headers:', response.request._header); // Log the headers sent

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      releaseDate: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      voteAverage: movie.vote_average,
    }));

    console.log('Response Status:', response.status);
    console.log('Response Data:', movies);

    res.json(movies);
  } catch (error) {
    console.error('Error fetching top movies:', error);
    res.status(500).json({ error: 'Failed to fetch top movies' });
  }
});

module.exports = router;
