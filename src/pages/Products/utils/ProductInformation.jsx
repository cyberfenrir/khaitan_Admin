import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { addData, updateProduct, getData } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';
import { getAllCategories } from "../../../services/categoryService";
import { createProduct } from "../../../services/productService";

const ProductInformation = ({ productInfo = null, setProductInfo, onNext }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: ''
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Initialize form data when productInfo changes
    useEffect(() => {
        if (productInfo) {
            setIsEditing(true);
            // Ensure correct data types, especially for categoryId
            setFormData({
                title: productInfo.title || '',
                description: productInfo.description || '',
                price: productInfo.price || '',
                categoryId: productInfo.categoryId ? String(productInfo.categoryId) : ''
            });
        } else {
            setIsEditing(false);
            // Reset form when creating new product
            setFormData({
                title: '',
                description: '',
                price: '',
                categoryId: ''
            });
        }
    }, [productInfo]);

    // Fetch categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const result = await getAllCategories();
                if (result.sucess) {
                    setCategories(result.data);
                    console.log('Fetched categories:', result.data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        getCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Form validation
        if (!formData.title || !formData.description || !formData.price || !formData.categoryId) {
            setMessage('Please fill all the fields.');
            setMessageType('error');
            return;
        }
        
        if (isNaN(formData.price)) {
            setMessage('Price must be a number.');
            setMessageType('error');
            return;
        }
        
        try {
            // Format data for submission
            // const dataToSubmit = {
            //     ...formData,
            //     price: parseFloat(formData.price),
            //     categoryId: formData.categoryId ? parseInt(formData.categoryId) : null
            // };
            
            // if (isEditing && productInfo.id) {
            //     // Update existing product
            //     await updateProduct(`products/${productInfo.id}`, dataToSubmit);
            //     setMessage('Product updated successfully!');
            //     setMessageType('success');
                
            //     // Update parent state with new data
            //     const updatedProduct = { ...productInfo, ...dataToSubmit };
            //     setProductInfo(updatedProduct);
            //     onNext(updatedProduct);
            // } else {
            //     // Create new product
            // }
            const productResponse = await createProduct(formData.title, formData.description, formData.price, formData.categoryId);
            console.log('Product created:', productResponse.data);
            
            // Store in localStorage and update parent state
            localStorage.setItem('productData', JSON.stringify(productResponse.data));
            setMessage('Product created successfully!');
            setMessageType('success');
            setProductInfo(productResponse.data);
            onNext(productResponse.data);
        } catch (error) {
            console.error('Failed to save product:', error);
            setMessage('Failed to save product.');
            setMessageType('error');
        }
    };

    const handleCloseMessage = () => {
        setMessage('');
        setMessageType('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Create'} Product Information</h2>
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
                            {categories.map((category) => (
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
                            rows="4"
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
                            step="0.01"
                        />
                    </div>
                </div>
                <div className="flex justify-end w-[100%]">
                    <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200">
                        {isEditing ? 'Update & Continue' : 'Next'}
                    </button>
                </div>
            </form>
            {message && (
                <div className="mt-4">
                    <MessageBox message={message} type={messageType} onClose={handleCloseMessage} />
                </div>
            )}
        </div>
    );
};

ProductInformation.propTypes = {
    productInfo: PropTypes.object,
    setProductInfo: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
};

export default ProductInformation;