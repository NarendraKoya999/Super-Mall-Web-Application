import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import '../styles/Offers.css';

function Offers({ productDeleted }) { // Accept the `productDeleted` prop
  const [offers, setOffers] = useState([]);

  // Fetch products when the component mounts or when a product is deleted
  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchProducts();
      
      // Simulate offers based on product price
      const simulatedOffers = productData.map(product => {
        let discount = product.price > 100 ? 10 : 5;
        return { ...product, discount };
      });

      setOffers(simulatedOffers);
    };
    getProducts(); // Re-fetch products
  }, [productDeleted]); // Re-fetch products whenever `productDeleted` changes

  return (
    <div className="offers-section">
      <h2>Available Offers</h2>
      <div className="offer-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.image} alt={offer.title} className="offer-image" />
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p>Price: ${offer.price}</p>
            <p>Discount: {offer.discount}% off</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;