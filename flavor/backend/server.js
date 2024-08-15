const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware for CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://flavor-frontend-r3vhfrixvq-uc.a.run.app'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// Import category routers
const booksRouter = require('./categories/booksController');
const musicRouter = require('./categories/musicController');
const tvRouter = require('./categories/tvController');
const placesRouter = require('./categories/placesController');

// Use category routers
app.use('/api/books', booksRouter);
app.use('/api/music', musicRouter);
app.use('/api/tv', tvRouter);
app.use('/api/places', placesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
