import { useState } from "react";
import PropTypes from 'prop-types';

const ProductInformation = ({ onNext }) => {
    const [category, setCategory] = useState('fan');
    const productCategories = [
       { value: "fan", label: "Fan" },
       { value: "light", label: "Light" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        onNext(data);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            id="productName"
                            type="text"
                            name="productName"
                            placeholder="Enter product name"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="productCategories" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Categories
                        </label>
                        <select 
                            id="productCategories"
                            value={category}
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Select product category"
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            {productCategories.map((category) => (
                                <option value={category.value} key={category.value}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
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
                <div className="flex justify-end w-[100%]">
                    <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg ">Next</button>
                </div>
            </form>
        </div>
    );
};

ProductInformation.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default ProductInformation;