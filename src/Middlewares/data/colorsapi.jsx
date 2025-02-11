import axios from 'axios';

const API_BASE_URL = '';

export const fetchColors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/colors`);
    return response.data;
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

export const createColor = async (colorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/colors`, colorData);
    return response.data;
  } catch (error) {
    console.error('Error creating color:', error);
    throw error;
  }
};