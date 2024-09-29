import React from 'react';
import '../styles/OfferList.css';

function OfferList({ offers, onCompare }) {
  return (
    <div className="offers-grid">
      {offers.map((offer) => (
        <div className="offer-card" key={offer.id}>
          <img src={offer.image} alt={offer.title} className="offer-image" />
          <div className="offer-details">
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p>Price: ${offer.price}</p>
            <p>Discount: {offer.discount}% off</p>
            {/* Ensure the onCompare function is passed and called properly */}
            <button className="btn-compare" onClick={() => onCompare(offer)}>Compare</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferList;
