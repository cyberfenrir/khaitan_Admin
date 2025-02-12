import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const fetchproducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};


export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/products`, productData);
    console.log('Product created successfully:', response.data);
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

// Example usage
// // const productData = {
// //   title: 'New Product',
// //   description: 'Product description',
// //   price: 100,
// //   categoryId: 1,
// //   image: 'image_url'
// // };
// // createProduct(productData);


export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/v1/products/${id}`);
    console.log('Product deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Example usage
// // const productId = 1;
// // deleteProduct(productId);



export const addAttributeToProduct = async (productId, attributeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/products/${productId}/attributes`, attributeData);
    console.log('Attribute added successfully:', response.data);
  } catch (error) {
    console.error('Error adding attribute:', error);
  }
};



export const bulkAddAttributesToProduct = async (productId, attributes) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/products/${productId}/attributes/bulk`, { attributes });
    console.log('Bulk attributes added successfully:', response.data);
  } catch (error) {
    console.error('Error adding bulk attributes:', error);
  }
};



export const getAllAttributesForProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/${productId}/attributes`);
    console.log('Attributes fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching attributes:', error);
  }
};


export const updateAttributeForProduct = async (productId, attributeId, value) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/v1/products/${productId}/attributes/${attributeId}`, { value });
    console.log('Attribute updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating attribute:', error);
  }
};



export const getAllProductsWithAttributes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/attributes`);
    console.log('Products with attributes fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching products with attributes:', error);
  }
};


export const getAllProductsWithAttributesAndMedia = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/attributes/media`);
    console.log('Products with attributes and media fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching products with attributes and media:', error);
  }
};




export const getProductWithAttributesAndMedia = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/${id}/attributes/media`);
    console.log('Product with attributes and media fetched successfully:', response.data);
  } catch (error) {
    console.error('Error fetching product with attributes and media:', error);
  }
};







