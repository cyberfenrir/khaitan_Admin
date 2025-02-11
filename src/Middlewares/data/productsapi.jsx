import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchproducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}