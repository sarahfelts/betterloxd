import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/Homepage.js';
import MovieProfile from './components/MovieProfile.js';
import BrowseMovies from './components/BrowseMovies.js';
import SignIn from './components/auth/SignIn.js';
import Register from './components/auth/Register.js';
import Navbar from './components/Navbar.js';
import AccountPage from './components/AccountPage.js';

export const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [userId, setUserId] = useState(user ? user.id : null);

  const handleSignIn = (userData) => {
    setUser(userData);
    setUserId(userData.id)
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  const handleSignOut = () => {
    setUser(null);
    setUserId(null)
  };

  return (
  <>
   <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<MovieProfile userId={userId} />} /> {/* Define the movie profile route */}
        <Route path="/browse" element={<BrowseMovies />} />
        <Route 
          path="/signin" 
          element={<SignIn onSignIn={handleSignIn} />}
        />
        <Route 
          path="/register" 
          element={<Register onRegister={handleRegister} />}
        />
        {user && (
          <Route 
            path="/account"
            element={<AccountPage user={user} />} 
          /> 
        )}
      </Routes>
    </Router>
  </>
  )
}