import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../../../Utils/message';
import { getAllAttributesForACategory } from '../../../services/categoryService';
import { addAttrtoProductBulk, getAttributesForProduct, updateAttributes } from '../../../services/productService';

const ProductPricing = ({ productInfo, mode, productId, categoryId, onNext }) => {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [existingAttributes, setExistingAttributes] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      setIsEditing(mode === 'edit');
      
      try {
        // If editing with provided product info
        if (mode == "edit" && productId && productInfo && productInfo.attributes) {
          
          // Set attributes from product info
          setAttributes(productInfo.attributes || []);
          
          // Pre-fill form data from attributes
          const initialFormData = {};
          if (Array.isArray(productInfo.attributes)) {
            productInfo.attributes.forEach(attr => {
              initialFormData[attr.attributeId || attr.id] = attr.value;
            });
          }
          
          setFormData(initialFormData);
        }   
        else{
          // If categoryId is provided, fetch attributes for that category
          if (categoryId) {
            // Fetch attributes for the category
            const categoryAttributes = await getAllAttributesForACategory(categoryId);
            setAttributes(categoryAttributes.data || []);
          } 
          else {
            // If no productId or categoryId, reset attributes
            setAttributes([]);
          }
        }
        // If creating new product, load from localStorage
      } catch (error) {
        console.error("Error initializing component:", error);
        setMessage('Failed to initialize. Please try again.');
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
    };
    
    initialize();

    return () => {
      // Cleanup if needed
      setAttributes([]);
      setFormData({});
      setExistingAttributes([]);
      setMessage('');
      setMessageType('');
    }
  }, [productId, categoryId, productInfo]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isEditing){
      setIsLoading(true);
      try{
        const response = await Promise.all(
          attributes.map(attribute => {
            const value = formData[attribute.id];
            if (value !== undefined && value !== '') {
              return updateAttributes(productId, attribute.id, value );
            }
            return null;
          })
        );
        if(response){
          setMessage('Product attributes updated successfully!');
          setMessageType('success');
          onNext(); 
        }
        else{
          setMessage('Failed to update attributes.');
          setMessageType('error');
        }

      }
      catch(error){
        console.error('Failed to save attributes:', error);
        setMessage('Failed to save attributes.');
        setMessageType('error');
      }
      finally{
        setIsLoading(false);
      }
    }
    else{
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
        setMessage('Product attributes added successfully!');
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
                  type="number"
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
  productInfo: PropTypes.object.isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;