const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/top-music', async (req, res) => {
  try {
    const apiKey = 'AIzaSyBlvaMXEPPy44RLCHXSh4qXdp2zgtDV9EY'; // Replace with your actual YouTube API key
    const apiUrl = 'https://www.googleapis.com/youtube/v3/search';

    const response = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        q: 'top music',
        type: 'video',
        key: apiKey,
      },
    });

    console.log('Request URL:', apiUrl);
    console.log('Request Headers:', response.request._header); // Log the headers sent

    const music = response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
      publishTime: item.snippet.publishTime,
    }));

    console.log('Response Status:', response.status);
    console.log('Response Data:', music);

    res.json(music);
  } catch (error) {
    console.error('Error fetching top music:', error);
    res.status(500).json({ error: 'Failed to fetch top music' });
  }
});

module.exports = router;
