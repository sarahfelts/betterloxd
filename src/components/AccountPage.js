import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieProfile from './MovieProfile.js';

function AccountPage({ user }) {
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const [movieTitles, setMovieTitles] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's information (username and email)
    if (user) {
        fetch(`http://localhost:8088/users`)
          .then((response) => response.json())
          .then((data) => {
            // Find the user object with the matching ID
            const currentUser = data.find((userData) => userData.id === user.id);
            // Set the user data if the user is found
            if (currentUser) {
              setUserData(currentUser);
            } else {
              // Handle case where user is not found
              console.error('User not found');
            }
          })

      // Fetch user's reviews based on their user ID
      fetch(`http://localhost:8088/reviews?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
            const userReviewsData = data.filter((review) => review.userId === user.id)
            setUserReviews(userReviewsData);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  useEffect(() => {
    // Fetch movie titles for each review
    const fetchMovieTitles = async () => {
      const titles = {};
      for (const review of userReviews) {
        try {
          const response = await fetch(`http://localhost:8088/movies/${review.movieId}`);
          const data = await response.json();
          titles[review.id] = data.title;
        } catch (error) {
          console.error(`Error fetching movie title for review ${review.id}:`, error);
          titles[review.id] = 'Movie Title Not Found';
        }
      }
      setMovieTitles(titles);
    };

    fetchMovieTitles();
}, [userReviews]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (!user) {
    return <div>Please sign in to view your account.</div>;
  }

  if (userData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className='account-info'>
            <h1>Your Account</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {user && <MovieProfile userId={user.id} />}
        </div>
        <div className='account-reviews'>
            <h2>Your Reviews</h2>
            <ul>
                {userReviews.map((review) => (
                <li key={review.id}>
                    <p>Movie: {movieTitles[review.id]}</p>
                    <p>Rating: {review.rating} stars</p>
                    <p>Review: "{review.text}"</p>
                    <p>Post Date: {new Date(review.postDate).toLocaleDateString()}</p>
                    {/* Add more review details as needed */}
                </li>
                ))}
            </ul>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default AccountPage;
