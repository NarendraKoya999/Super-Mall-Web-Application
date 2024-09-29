import React from 'react';
import '../styles/ShopList.css';

function ShopList({ products }) {
  return (
    <div className="shop-list">
      {products.map((product) => (
        <div key={product.id} className="shop-item">
          <img src={product.image} alt={product.title} className="shop-item-image" />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ShopList;
