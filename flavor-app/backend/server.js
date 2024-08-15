const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080;

// Middleware for CORS
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'https://flavor-frontend-r3vhfrixvq-uc.a.run.app'], // Allow requests from frontend server
  methods: ['GET'], // Only allow GET requests
  allowedHeaders: ['Content-Type'],
  credentials: true // Enable CORS credentials
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Define endpoint to fetch top books
app.get('/api/top-books', async (req, res) => {
  try {
    console.log('Fetching top books from Google Books API...');
    
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: 'subject:programming',
        key: process.env.GOOGLE_BOOKS_API_KEY || 'AIzaSyCIG4XUrp6opucq3zmJeTLdDrCQs7O7tAk', // Use your API key from .env or replace with a default key
      },
    });

    console.log('Received response from Google Books API:', response.status, response.statusText);
    
    const books = response.data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      previewLink: book.volumeInfo.previewLink,
    }));

    console.log('Sending books data to client:', books);
    res.json(books);
  } catch (error) {
    console.error('Error fetching top books:', error.message);
    res.status(500).json({ error: 'Failed to fetch top books' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
