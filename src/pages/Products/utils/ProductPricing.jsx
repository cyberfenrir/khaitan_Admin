// import React from 'react';

const ProductPricing = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Pricing</h2>
      <form>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor="Price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                </label>
                <input 
                    type="number" 
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
                    placeholder="Enter discount" 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
            <div>
                <label htmlFor="Tex" className="block text-sm font-medium text-gray-700 mb-1">
                    Tex
                </label>
                <input 
                    type="number" 
                    placeholder="Enter tex" 
                    className="w-full px-3 py-2 border rounded-md" 
                />
            </div>
        </div>
      </form>
    </div>
  );
};

export default ProductPricing;