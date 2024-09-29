import React from 'react';
import '../styles/ProductComparison.css';

function ProductComparison({ productsToCompare }) {
  if (productsToCompare.length === 0) {
    return <p className="text-center">No products to compare. Please select products to compare.</p>;
  }

  return (
    <div className="comparison-grid">
      {productsToCompare.map((product) => (
        <div className="comparison-card" key={product.id}>
          <img src={product.image} alt={product.title} className="comparison-image" />
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating?.rate || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductComparison;
