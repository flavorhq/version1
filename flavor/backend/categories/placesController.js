const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/top-places', async (req, res) => {
  try {
    const apiKey = 'AIzaSyAoEQJ0o26IcR-kCYE5LOloyAT5HiLPe1o'; // Replace with your actual API key

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: '40.7128,-74.0060', // Example coordinates (New York City)
        radius: 5000,
        type: 'restaurant|tourist_attraction', // Types of places to search for
        key: apiKey // Use the hardcoded API key
      }
    });

    const places = response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating,
      photo: place.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}` : null
    }));

    res.json(places);
  } catch (error) {
    console.error('Error fetching top places:', error.message);
    res.status(500).json({ error: 'Failed to fetch top places' });
  }
});

module.exports = router;
