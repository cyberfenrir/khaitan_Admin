import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bulkAddAttributesToProduct } from '../../../Middlewares/data/productsapi';
import { addData, getAttributesbyCategory } from '../../../Utils/service';

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
      
      try {
        const attributesData = await getAttributesbyCategory(productData.categoryId);
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

    const payload = attributes.map(attribute => ({
      productId: productData.productId,
      attributeId: attribute.id,
      value: formData[attribute.id] || ''
    }));

    try {
      const response = await addData(payload, 'attributes');
      console.log(response);
      await bulkAddAttributesToProduct(productData.productId, payload);
      onNext();
    } catch (error) {
      console.error('Failed to add attributes:', error);
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
            <div key={attribute.id} className="flex flex-col">
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
              />
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