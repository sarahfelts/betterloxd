import React from "react";
import './src/styles/styles.css'

function Homepage() {
    return (
      <div>
        <h1>Welcome to the BetterLoxd</h1>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.posterURL} alt={movie.title} />
              <h2>{movie.title}</h2>
              {/* Add more movie details as needed */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  