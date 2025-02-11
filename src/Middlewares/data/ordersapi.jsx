import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchOrder = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const fetchOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}