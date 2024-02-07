import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './SubmitReview.js';

const MovieProfile = ({userId}) => {
  // Get the movie ID from the URL
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState(null);
  const [genre, setGenre] = useState(null);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/movies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  

    // Fetch director details
  if (movie) {
    fetch(`http://localhost:8088/directors/${movie.directorId}`)
      .then((response) => response.json())
      .then((data) => setDirector(data))
      .catch((error) => console.error(error));

    // Fetch genre details
    fetch(`http://localhost:8088/genres/${movie.genreId}`)
      .then((response) => response.json())
      .then((data) => setGenre(data))
      .catch((error) => console.error(error));

    // Fetch actors based on movieCast data
    fetch(`http://localhost:8088/movieCast`)
      .then((response) => response.json())
      .then((data) => {
        const movieCastData = data.find((item) => item.movieId === movie.id);
        if (movieCastData) {
          const actorPromises = movieCastData.actorId.map((actorId) =>
            fetch(`http://localhost:8088/actors/${actorId}`).then((response) => response.json())
          );

        Promise.all(actorPromises)
          .then((actorData) => setCast(actorData))
          .catch((error) => console.error(error));
        }
  })
  .catch((error) => console.error(error));

    // Fetch reviews for the movie
    fetch(`http://localhost:8088/reviews?movieId=${id}`)
    .then((response) => response.json())
    .then((data) => setReviews(data))
    .catch((error) => console.error(error));

  }
}, [id, movie]);

if (isLoading) {
  return <div>Loading...</div>; // Display a loading message
}

if (!movie) {
  return <div>Movie not found</div>; // Handle the case where the movie is not found
}

const handleReviewSubmit = (newReview) => {
  newReview.userId = userId
  fetch('http://localhost:8088/reviews', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(newReview),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Review submitted:', data);
    // Update the reviews state with the new review
    setReviews([...reviews, newReview]);
  })
  .catch(error => console.error('Error submitting review:', error));
}

  return (
    <div>
        <div className='movie-profile'>
          <h1>{movie.title}</h1>
          <img src={movie.poster} alt={movie.title} />
          <p>Director: { director ? director.name : 'Unknown'}</p>
          <p>Genre: {genre ? genre.genre : 'Unknown'}</p>
          <p>Release Year: {movie.releaseYear}</p>
          <p>Description: {movie.description}</p>
          <p>Cast:</p>
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>{actor.name}</li>
              ))}
            </ul>
        </div>  
        <div className='review-list'>
          <h2>Reviews</h2>
            <ul>
              {reviews.map(review => (
                <li key={review.id}>
                  <p>Rating: {review.rating}</p>
                  <p>Review: {review.text}</p>
                  {/* Add more review details if needed */}
                </li>
              ))}
            </ul>
      </div>
      <div className='review-form'>
        {/* Review form */}
        <h2>Add Your Review</h2>
        <ReviewForm movieId={id} userId={userId} onReviewSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
}

export default MovieProfile;
