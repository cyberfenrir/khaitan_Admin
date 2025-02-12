import  axios  from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchAttributes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/attributes/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attributes:', error);
    throw error;
  }
}   

export const fetchAttributeById = async (attributeId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/attributes/${attributeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attribute:', error);
        throw error;
    }
}

export const deleteAttribute = async (attributeId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/v1/attributes/${attributeId}`);
        return response.data;
    }
    catch (error) {
        console.error('Error deleting attribute:', error);
        throw error;
    }
}

export const createAttribute = async (attributeData) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/api/v1/attributes/`, attributeData);
        return response.data;
    }
    catch (error) {
        console.error('Error creating attribute:', error);
        throw error;
    }
}

export const updateAttribute = async (attributeId, attributeData) => {
    try{
        const response = await axios.patch(`${API_BASE_URL}/api/v1/attributes/${attributeId}`, attributeData);
        return response.data;
    }
    catch (error) {
        console.error('Error updating attribute:', error);
        throw error;
    }
}