import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/v1';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategoriesbyID = async (id) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchAllProductsWithAttributesAndMediaForCategory = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}/products/attributes/media`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const fetchCategorybyID = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const deleteCategorybyID = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const fetchProductsofCategory = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const fetchAttributesofCategory = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}/attributes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const fetchProductswithSameAttribute = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}/products/attributes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};