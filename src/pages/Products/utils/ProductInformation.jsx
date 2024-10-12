// import React from 'react';

const ProductInformation = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Product Information</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
                </label>
                <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="productCategories" className="block text-sm font-medium text-gray-700 mb-1">
                Product Categories
                </label>
                <input
                id="productCategories"
                type="text"
                placeholder="Select product category"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
                </label>
                <input
                id="brand"
                type="text"
                placeholder="Brand Name"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight
                </label>
                <input
                id="weight"
                type="text"
                placeholder="In gm & kg"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="fanType" className="block text-sm font-medium text-gray-700 mb-1">
                Fan Type
                </label>
                <input
                id="fanType"
                type="text"
                placeholder="Select Fan Type"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="Size" className="block text-sm font-medium text-gray-700 mb-1">
                Size
                </label>
                <input
                id="Size"
                type="text"
                placeholder="Enter dimensions"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="colour" className="block text-sm font-medium text-gray-700 mb-1">
                Colour
                </label>
                <input
                id="colour"
                type="text"
                placeholder="Select Colour"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
            </label>
            <textarea 
            placeholder="Description" 
            className="w-full px-3 py-2 border rounded-md" 
            rows={4}
            ></textarea>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor="tagno" className="block text-sm font-medium text-gray-700 mb-1">
                Tag Number
                </label>
                <input
                id="tagno"
                type="text"
                placeholder="#******"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="Stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock
                </label>
                <input
                id="Stock"
                type="number"
                placeholder="Quantity"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Tag
                </label>
                <input
                id="tag"
                type="text"
                placeholder="Tags"
                className="w-full px-3 py-2 border rounded-md"
                />
            </div>
        </div>
      </form>
    </div>
  );
};

export default ProductInformation;