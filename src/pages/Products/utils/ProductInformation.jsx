import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { addData, getData } from '../../../Utils/service';

const ProductInformation = ({ onNext }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: ''
    });

    useEffect(() => {
        let isMounted = true;

        const getCategories = async () => {
            try {
                const result = await getData('categories');
                if (isMounted && result.success) {
                    setCategories(result.data);
                    console.log('Categories from Firebase:', result.data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        getCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const firebaseResponse = await addData(formData, 'products');
            console.log(firebaseResponse);
            const productData = { ...formData, productId: firebaseResponse.id };
            localStorage.setItem('productData', JSON.stringify(productData));
            console.log(productData);
            onNext(productData);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Product Information</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                            Product Categories
                        </label>
                        <select 
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="" disabled>Select a category</option>
                            {Array.isArray(categories) && categories.map((category) => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input 
                            id="price"
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price" 
                            className="w-full px-3 py-2 border rounded-md" 
                        />
                    </div>
                </div>
                <div className="flex justify-end w-[100%]">
                    <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg">Next</button>
                </div>
            </form>
        </div>
    );
};

ProductInformation.propTypes = {
    onNext: PropTypes.func.isRequired,
};

export default ProductInformation;