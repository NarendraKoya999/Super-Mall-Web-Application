import React, { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../services/api';
import Filter from '../components/Filter';
import OfferList from '../components/OfferList';
import ProductComparison from '../components/ProductComparison';
import '../styles/UserDashboard.css';

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsToCompare, setProductsToCompare] = useState([]);
  
  const comparisonSectionRef = useRef(null); // Create a ref for the comparison section

  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
      setFilteredProducts(productData);
    };
    getProducts();
  }, []);

  // Handle adding products to comparison
  const handleProductComparison = (product) => {
    if (!productsToCompare.some((p) => p.id === product.id)) {
      setProductsToCompare((prevProducts) => [...prevProducts, product]);

      // Scroll to the comparison section after adding a product
      comparisonSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle resetting comparison
  const resetComparison = () => {
    setProductsToCompare([]); // Clear the comparison list
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>

      {/* Filter Section */}
      <Filter
        categories={[...new Set(products.map(product => product.category))]} // Get unique categories from products
        onFilterChange={(category, priceRange) => {
          let filtered = products;

          // Filter by category
          if (category) {
            filtered = filtered.filter(product => product.category === category);
          }

          // Filter by price range
          if (priceRange === 'low') {
            filtered = filtered.filter(product => product.price < 100);
          } else if (priceRange === 'high') {
            filtered = filtered.filter(product => product.price >= 100);
          }

          setFilteredProducts(filtered); // Update the filtered products list
        }}
      />

      {/* Offer List Section */}
      <OfferList offers={filteredProducts} onCompare={handleProductComparison} />

      {/* Comparison Section */}
      {productsToCompare.length > 0 && (
        <div className="comparison-section" ref={comparisonSectionRef}>
          <h3>Compare Products</h3>
          <ProductComparison productsToCompare={productsToCompare} />
          <button className="btn-reset" onClick={resetComparison}>Reset Comparison</button> {/* Reset Button */}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
