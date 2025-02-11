import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// export const fetchColors = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/v1/Colors/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching colors:', error);
//     throw error;
//   }
// };

export const fetchColors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/Colors/`); 
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching colors:', error);
    return []; 
  }
};

export const createColor = async (colorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/Colors/`, colorData);
    return response.data;
  } catch (error) {
    console.error('Error creating color:', error);
    throw error;
  }
};

export const fetchColorById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/Colors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching color:', error);
    throw error;
  }
};

export const updateColor = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/v1/Colors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching color:', error);
    throw error;
  }
};

export const deleteColor = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/Colors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting color:', error);
    throw error;
  }
};