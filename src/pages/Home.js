import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content text-center">
        <h1>Welcome to Super Mall</h1>
        <p>Discover the best shops, exclusive offers, and amazing products all in one place.</p>
        <a className="btn btn-primary btn-lg" href="/shop" role="button">Explore Shops</a>
      </div>
    </div>
  );
}

export default Home;
