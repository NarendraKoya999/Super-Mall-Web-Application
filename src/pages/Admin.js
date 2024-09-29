import React, { useState, useEffect } from 'react';
import { fetchProducts, updateProduct, deleteProduct, addProduct } from '../services/api';
import { auth } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import '../styles/Admin.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null); // Track which product is being edited
  const [updatedProduct, setUpdatedProduct] = useState({}); // Store updated product details
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
  }); // For adding a new product
  const navigate = useNavigate();

  // Fetch products when the component mounts
  const fetchProductData = async () => {
    const fetchedProducts = await fetchProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProductData(); // Fetch the products when the component mounts
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      alert('Logout failed: ' + error.message);
    }
  };

  // Handle edit mode
  const handleEditClick = (product) => {
    setEditingProductId(product.id); // Set the product to be edited
    setUpdatedProduct({ ...product }); // Load the product details into the form
  };

  // Handle input change for the product being edited
  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Handle new product input change
  const handleNewProductChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Update a product
  const handleUpdateProduct = async (id) => {
    try {
      await updateProduct(id, updatedProduct); // Update product using API
      setEditingProductId(null); // Exit editing mode

      // Update product in state without refetching all
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProductId(null); // Cancel editing and reset editing state
  };

  // Add new product
  const handleAddProduct = async () => {
    try {
      const newAddedProduct = await addProduct(newProduct); // Add new product using API
      setProducts((prevProducts) => [...prevProducts, newAddedProduct]); // Add the new product to the product list
      setNewProduct({
        title: '',
        description: '',
        price: '',
        image: '',
        category: '',
      }); // Reset new product form
    } catch (error) {
      alert('Add product failed: ' + error.message);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id); // Send delete request to the API

      // Remove the deleted product from the local state
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="btn-logout">Logout</button>

      {/* Add New Product Form */}
      <div className="add-product-form">
        <h3>Add New Product</h3>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={handleNewProductChange}
          className="editable-input"
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleNewProductChange}
          className="editable-input"
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={handleNewProductChange}
          className="editable-input"
        />
        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={newProduct.image}
          onChange={handleNewProductChange}
          className="editable-input"
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={newProduct.category}
          onChange={handleNewProductChange}
          className="editable-input"
        />
        <button className="btn-add" onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" /> {/* Product image */}
            {editingProductId === product.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={updatedProduct.title}
                  onChange={handleInputChange}
                  className="editable-input"
                />
                <input
                  type="text"
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleInputChange}
                  className="editable-input"
                />
                <input
                  type="number"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleInputChange}
                  className="editable-input"
                />
                <button
                  className="btn-update"
                  onClick={() => handleUpdateProduct(product.id)}
                >
                  Save
                </button>
                <button className="btn-cancel" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Delete
                </button> {/* Delete button */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
