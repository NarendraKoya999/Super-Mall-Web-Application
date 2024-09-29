import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './services/firebaseConfig'; // Import Firebase authentication
import Home from './pages/Home';
import Shop from './pages/Shop';
import Offers from './pages/Offers';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Handle the authentication state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAdminLoggedIn(true);
      } else {
        setIsAdminLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isAdminLoggedIn={isAdminLoggedIn} /> {/* Pass login state to Navbar */}
        
        <div className="content" style={{ minHeight: '90vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/offers" element={<Offers />} />
            {/* Redirect to Admin Dashboard if already logged in */}
            <Route 
              path="/login" 
              element={isAdminLoggedIn ? <Navigate to="/admin" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isAdminLoggedIn ? <Navigate to="/admin" /> : <Register />} 
            />
            <Route 
              path="/admin" 
              element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />} 
            />
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
