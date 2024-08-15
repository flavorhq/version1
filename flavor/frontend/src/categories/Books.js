import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/books/top-books`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Top Books</h1>
      <ol type="1">
        {books.map(book => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Authors: {book.authors.join(', ')}</p>
            {book.thumbnail && <img src={book.thumbnail} alt="Book Thumbnail" />}
            <p><a href={book.previewLink} target="_blank" rel="noopener noreferrer">Preview Link</a></p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Books;
