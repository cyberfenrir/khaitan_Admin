import { useState } from 'react';
import PropTypes from 'prop-types';

const ProductPricing = ({ onNext }) => {
  const [pricingData, setPricingData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setPricingData(data);
    onNext(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Pricing</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor="Price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input 
                    type="number" 
                    name="price"
                    placeholder="Enter Price" 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
            <div>
                <label htmlFor="Discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                </label>
                <input 
                    type="number" 
                    name="discount"
                    placeholder="Enter discount" 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
            <div>
                <label htmlFor="Tax" className="block text-sm font-medium text-gray-700 mb-1">
                    Tax
                </label>
                <input 
                    type="number" 
                    name="tax"
                    placeholder="Enter tax" 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
        </div>
        <div className='flex justify-end w-[100%]'>
        <button type="submit" className="bg-orange-500 px-6 py-2 rounded text-white mt-4">Next</button>
        </div>
        
      </form>
    </div>
  );
};

ProductPricing.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default ProductPricing;