import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchAttributesofCategory } from '../../../Middlewares/data/categoriesapi';
import { bulkAddAttributesToProduct } from '../../../Middlewares/data/productsapi';
import { addData, getAttributesbyCategory, getData } from '../../../Utils/service';

const ProductPricing = ({ productId, categoryId, onNext }) => {
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getAttributes = async () => {
      try {
        // const attributesData = await fetchAttributesofCategory(categoryId);
        const attributesData = await getAttributesbyCategory(categoryId);
        setAttributes(attributesData);
      } catch (error) {
        console.error('Failed to fetch attributes:', error);
      }
    };

    getAttributes();
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = attributes.map(attribute => ({
      productId,
      attributeId: attribute.id,
      value: formData[attribute.id] || ''
    }));

    try {
      const response = await addData(payload, 'attributes');
      console.log(response);
      await bulkAddAttributesToProduct(productId, payload);
      onNext();
    } catch (error) {
      console.error('Failed to add attributes:', error);
    }
  };

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
        <div className="flex justify-end w-[100%]">
          <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">Next</button>
        </div>
      </form>
    </div>
  );
};

ProductPricing.propTypes = {
  productId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;