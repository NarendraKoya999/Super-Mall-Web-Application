import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ShopList from '../components/ShopList';
import '../styles/Shop.css';

function Shop({ productDeleted }) { // Accept the `productDeleted` prop
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts or when a product is deleted
  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
    };
    getProducts(); // Re-fetch products
  }, [productDeleted]); // Re-fetch products whenever `productDeleted` changes

  return (
    <div className="shop-section">
      <h2>Products</h2>
      <ShopList products={products} />
    </div>
  );
}

export default Shop;
