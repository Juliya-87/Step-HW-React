import React from "react";
import "./App.css";
import coverImage from "./assets/images/the-great-gatsby-a-novel-1.jpg";

const bookInfo = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  genre: "Novel, Tragedy",
  pages: 180,
  reviews: [
    { reviewer: "Alice", text: "A beautifully written story about the American Dream and its illusions.", rating: 5 },
    { reviewer: "John", text: "The symbolism in this book is amazing! A must-read.", rating: 5 },
    { reviewer: "Emily", text: "A bit slow at times, but the ending is unforgettable.", rating: 4 }
  ],
  coverImage: coverImage
};

class BookInfo extends React.Component {
  render() {
    return (
      <div className="book-container">
        <h1>{bookInfo.title}</h1>
        <h2>Author: {bookInfo.author}</h2>
        <p><strong>Genre:</strong> {bookInfo.genre}</p>
        <p><strong>Pages:</strong> {bookInfo.pages}</p>
        <img className="book-cover" src={bookInfo.coverImage} alt="Book cover" />

        <h3>Reviews:</h3>
        <ul>
          {bookInfo.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.reviewer}:</strong> {review.text} {review.rating}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookInfo;
