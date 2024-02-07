import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BrowseMovies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Fetch all movies
    fetch('http://localhost:8088/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error(error));

    // Fetch all genres
    fetch('http://localhost:8088/genres')
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error(error));
  }, []);

  const handleGenreSelect = (event) => {
    const selectedGenre = JSON.parse(event.target.value)
    setSelectedGenre(selectedGenre)
  };

  const filteredMovies = selectedGenre ? movies.filter(movie => movie.genreId === selectedGenre.id) : movies;
  
  return (
    <div>
      <h1>Browse Movies</h1>
      <div>
        <label htmlFor="genreSelect">Filter by Genre:</label>
        <select id="genreSelect" value={selectedGenre ? JSON.stringify(selectedGenre) : ''} onChange={handleGenreSelect}>
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre.id} value={JSON.stringify(genre)}>{genre.genre}</option>
          ))}
        </select>
      </div>
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-link">
            <div className="movie-item">
              <img src={movie.poster} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BrowseMovies;


