import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../Utils/message';
import { getAllAttributesForACategory } from '../../../services/categoryService';
import { addAttrtoProductBulk, getAttributesForProduct } from '../../../services/productService';

const ProductPricing = ({ productId, categoryId, onNext }) => {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [existingAttributes, setExistingAttributes] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setIsEditing(!!productId);
    
    // If editing, we'll load from productId
    // If creating, we'll load from localStorage
    if (!productId) {
      const storedProductData = localStorage.getItem('productData');
      if (storedProductData) {
        const parsedData = JSON.parse(storedProductData);
        if (parsedData.productId && parsedData.categoryId) {
          loadAttributes(parsedData.categoryId);
          loadExistingAttributeValues(parsedData.productId);
        }
      }
    } else {
      // We're in edit mode with direct props
      if (categoryId) {
        loadAttributes(categoryId);
        loadExistingAttributeValues(productId);
      }
    }
  }, [productId, categoryId]);

  // Load attributes for the category
  const loadAttributes = async (catId) => {
    if (!catId) return;
    
    const categoryIdInt = parseInt(catId, 10);
    if (isNaN(categoryIdInt)) {
      console.error('Invalid category ID:', catId);
      return;
    }
    
    try {
      setIsLoading(true);
      const attributesData = await getAllAttributesForACategory(categoryIdInt);
      if (attributesData.sucess) {
        setAttributes(attributesData.data);
      }
    } catch (error) {
      console.error('Failed to fetch attributes:', error);
      setMessage('Failed to load attributes.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Load existing attribute values if editing
  const loadExistingAttributeValues = async (prodId) => {
    if (!prodId) return;
    
    try {
      setIsLoading(true);
      // Use the provided getAttributesforProduct service
      const response = await getAttributesForProduct(prodId);
      
      if (response.success && response.data) {
        setExistingAttributes(response.data.attributes);
        
        // Convert to form data format
        const initialFormData = {};
        response.data.attributes.forEach(attr => {
          initialFormData[attr.attributeId] = attr.value;
        });
        
        setFormData(initialFormData);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Failed to fetch existing attribute values:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentProductId = productId || 
      (JSON.parse(localStorage.getItem('productData'))?.productId);
    
    if (!currentProductId) {
      setMessage('Product ID not found');
      setMessageType('error');
      return;
    }

    // Validate that all attribute values are numbers
    for (const attribute of attributes) {
      const value = formData[attribute.id];
      if (value !== undefined && value !== '' && isNaN(value)) {
        setMessage(`Value for ${attribute.name} must be a number.`);
        setMessageType('error');
        return;
      }
    }

    try {
      setIsLoading(true);
      
      // Filter out any attributes with empty values
      const validPayload = {
        attributes: attributes
          .filter(attribute => formData[attribute.id] !== undefined && formData[attribute.id] !== '')
          .map(attribute => ({
            attributeId: attribute.id,
            value: formData[attribute.id],
          }))
      };
      
      if (validPayload.attributes.length === 0) {
        setMessage('No valid attributes to save.');
        setMessageType('error');
        return;
      }

      // Use bulkAddData for both creating and updating
      // This will replace existing attributes for the product
      const attrOfProduct = await addAttrtoProductBulk(productId, validPayload);
      console.log(attrOfProduct.data);
      setMessage(isEditing ? 'Product attributes updated successfully!' : 'Product attributes added successfully!');
      setMessageType('success');
      
      setTimeout(() => {
        onNext();
      }, 1000); // Brief delay to show success message
      
    } catch (error) {
      console.error('Failed to save attributes:', error);
      setMessage('Failed to save attributes.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseMessage = () => {
    setMessage('');
    setMessageType('');
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Product Attributes' : 'Add Product Attributes'}
      </h2>
      
      {attributes.length === 0 ? (
        <div className="text-gray-500 py-4">
          No attributes available for this category.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attributes.map(attribute => (
              <div key={attribute.id} className="flex flex-col gap-2 w-full">
                <label htmlFor={attribute.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {attribute.name}
                </label>
                <div className="flex items-center">
                  <input
                    id={attribute.id}
                    name={attribute.id}
                    type="text"
                    value={formData[attribute.id] || ''}
                    onChange={handleChange}
                    placeholder={`Enter ${attribute.name}`}
                    className="w-full px-3 py-2 border rounded-md"
                  /> 
                  {attribute.unit && (
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                      {attribute.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-[100%] mt-4">
            <button 
              type="submit" 
              className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : isEditing ? 'Update & Continue' : 'Next'}
            </button>
          </div>
        </form>
      )}
      
      {message && (
        <div className="mt-4">
          <MessageBox message={message} type={messageType} onClose={handleCloseMessage} />
        </div>
      )}
    </div>
  );
};

ProductPricing.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;