const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/top-books', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: 'subject:programming',
        key: process.env.GOOGLE_BOOKS_API_KEY
      }
    });

    const books = response.data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      previewLink: book.volumeInfo.previewLink
    }));

    res.json(books);
  } catch (error) {
    console.error('Error fetching top books:', error.message);
    res.status(500).json({ error: 'Failed to fetch top books' });
  }
});

module.exports = router;
