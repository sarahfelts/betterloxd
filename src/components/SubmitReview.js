import React, { useState } from 'react';

function ReviewForm({ movieId, userId, onReviewSubmit }) {
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!rating || !text) {
      alert('Please provide both a rating and a review text.');
      return;
    }
    // Create a new review object
    const newReview = {
      movieId,
      userId,
      rating: parseFloat(rating),
      text,
      postDate: new Date().toISOString(),
    };
    // Pass the new review to the parent component
    onReviewSubmit(newReview);
    // Reset form fields
    setRating('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <label>
        Review:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
