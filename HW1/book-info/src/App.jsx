import React from 'react'
import './App.css'

function App() {
  return (
    <div>
      <h1>Favorite book</h1>
      <h2>"The Great Gatsby"</h2>
      <p>Author: "F. Scott Fitzgerald"</p>
      <p>Genre: "Novel, Tragedy"</p>
      <p>Pages: 180</p>
      <h2>Reviews:</h2> 
      <li>"A beautifully written story about the American Dream and its illusions.", rating: 5, Alisa</li>
      <li>"The symbolism in this book is amazing! A must-read.", rating: 5, John </li>
      <li>"A bit slow at times, but the ending is unforgettable.", rating: 4, Emily </li>
    </div>
  );
}

export default App;