import React, { useEffect, useState } from "react";
import "./Homepage.css"
import { getAllMovies } from "../services/movieServices.js";
import { Link } from 'react-router-dom';

export function Homepage() {
    const [allMovies, setAllMovies] = useState([])

    useEffect(() => {
        getAllMovies().then((moviesArray) => {
            setAllMovies(moviesArray)
        })
    }, [])

    return (
      <div>
        <container>
            <div className="movie-list">
            {allMovies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <Link to={`/movie/${movie.id}`}>
                        <img src={movie.poster} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        {/* Add more movie details as needed */}
                    </Link>
                </div>
            ))}
            </div>
        </container>
      
      </div>
    );
  }
  