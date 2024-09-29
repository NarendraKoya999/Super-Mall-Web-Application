import React, { useState, useEffect } from 'react';
import { fetchProductById } from '../services/api';
import { useParams } from 'react-router-dom';
import '../styles/ShopDetails.css';

function ShopDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
    };
    getProductDetails();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="shop-details">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="price">Price: ${product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="rating">Rating: {product.rating?.rate || 'N/A'}</p>
      </div>
    </div>
  );
}

export default ShopDetails;
