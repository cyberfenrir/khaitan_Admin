import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bulkAddAttributesToProduct } from '../../../Middlewares/data/productsapi';
import { addData, getAttributesbyCategory, bulkAddData } from '../../../Utils/service';

const ProductPricing = ({ onNext }) => {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Get product data from localStorage
    const storedProductData = localStorage.getItem('productData');
    if (storedProductData) {
      setProductData(JSON.parse(storedProductData));
    }
  }, []);

  useEffect(() => {
    const getAttributes = async () => {
      if (!productData?.categoryId) return;

      const categoryIdInt = parseInt(productData.categoryId, 10);

      if (isNaN(categoryIdInt)) {
        console.error('Invalid category ID:', productData.categoryId);
        return;
      }
      
      try {
        const attributesData = await getAttributesbyCategory(categoryIdInt);
        console.log('Attributes:', attributesData);
        if (attributesData.success) {
          setAttributes(attributesData.data);
        }
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };

    getAttributes();
  }, [productData?.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData?.productId) {
      console.error('Product ID not found');
      return;
    }

    // Filter out any attributes with empty values and ensure all required fields exist
    const validPayload = attributes
      .filter(attribute => formData[attribute.id] !== undefined && formData[attribute.id] !== '')
      .map(attribute => ({
        productId: parseInt(productData.productId),
        attributeId: attribute.id,
        value: formData[attribute.id],
        createdAt: new Date(),
        updatedAt: new Date()
      }));

    if (validPayload.length === 0) {
      console.error('No valid attributes to save');
      return;
    }

    try {
      const response = await bulkAddData(validPayload, 'productAttributes');
      console.log('Response:', response);
      onNext();
    } catch (error) {
      console.error('Failed to add attributes:', error);
    }


  
    try {
      console.log('Submitting payload:', validPayload); // Debug log
      const response = await addData(validPayload, 'productAttributes');
      console.log('Response:', response);
      onNext();
    } catch (error) {
      console.error('Failed to add attributes:', error, 'Payload:', validPayload);
    }
  };
  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Attributes</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attributes.map(attribute => (
            <div key={attribute.id} className="flex flex-col gap-2 w-full">
              <label htmlFor={attribute.id} className="block text-sm font-medium text-gray-700 mb-1">
                {attribute.name}
              </label>
              <input
                id={attribute.id}
                name={attribute.id}
                type="text"
                value={formData[attribute.id] || ''}
                onChange={handleChange}
                placeholder={`Enter ${attribute.name}`}
                className="w-full px-3 py-2 border rounded-md"
              /> {attribute.unit && <span className="text-sm text-gray-500 whitespace-nowrap">{attribute.unit}</span>}
            </div>
          ))}
        </div>
        <div className="flex justify-end w-[100%] mt-4">
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">Next</button>
        </div>
      </form>
    </div>
  );
};

ProductPricing.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;