import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isAdminLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (e, path) => {
    if (isAdminLoggedIn) {
      e.preventDefault();
      alert('Please log out of Admin before accessing other pages!');
      navigate('/admin');
    } else {
      navigate(path);
    }
  };

  return (
    <header className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">Super Mall</Link>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link className="nav-item" to="/" onClick={(e) => handleNavigation(e, '/')}>Home</Link>
          <Link className="nav-item" to="/shop" onClick={(e) => handleNavigation(e, '/shop')}>Shops</Link>
          <Link className="nav-item" to="/offers" onClick={(e) => handleNavigation(e, '/offers')}>Offers</Link>
          <Link className="nav-item" to="/user-dashboard" onClick={(e) => handleNavigation(e, '/user-dashboard')}>User Dashboard</Link>
          
          {!isAdminLoggedIn ? (
            <>
              <Link className="nav-item" to="/login">Admin Login</Link>
              <Link className="nav-item" to="/register">Register</Link>
            </>
          ) : (
            <Link className="nav-item" to="/admin">Admin Dashboard</Link>
          )}
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <div className="dash"></div>
            <div className="dash"></div>
            <div className="dash"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
