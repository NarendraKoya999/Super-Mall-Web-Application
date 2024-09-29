const API_URL = 'https://fakestoreapi.com';

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

// Fetch a product by its ID
export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

// Add a new product (POST request)
export const addProduct = async (newProduct) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });
  return response.json();
};

// Update a product by its ID (PUT request)
export const updateProduct = async (id, updatedProduct) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT', // PUT request to update product
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct), // Send updated product data as JSON
  });

  if (!response.ok) {
    throw new Error('Failed to update the product');
  }

  return response.json(); // Return the updated product data
};

// Delete a product by its ID (Optional, if you need delete functionality)
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
