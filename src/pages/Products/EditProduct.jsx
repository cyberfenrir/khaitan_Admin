import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getAttributesbyCategory, updateProduct, updateAttributes, getAllCategories, fetchCategoryById } from '../../Utils/service';

function EditProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [updatedAttributes, setUpdatedAttributes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    const fetchProductDetails = async () => {
      const intSlug = parseInt(slug, 10);
      const productData = await getProductById(intSlug);
      if (productData.success) {
        setProduct(productData.data);
        setUpdatedProduct(productData.data);
        const attributesData = await getAttributesbyCategory(productData.data.categoryId);
        if (attributesData.success) {
          setAttributes(attributesData.data);
          setUpdatedAttributes(attributesData.data);
        }

        const categoryData = await fetchCategoryById(productData.data.categoryId);
        if (categoryData.success) {
          setSelectedCategory(categoryData.data.id);
        }
        const allCategories = await getAllCategories();
        if (allCategories.success) {
          setCategories(allCategories.data);
        }

      }
    };

    fetchProductDetails();
  }, [slug]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (e, id) => {
    const { name, value } = e.target;
    setUpdatedAttributes((prev) => prev.map(attr => 
      attr.id === id ? { ...attr, [name]: value } : attr
    ));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setUpdatedProduct((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSave = async () => {
    await updateProduct(slug, updatedProduct);
    await Promise.all(updatedAttributes.map(attr => updateAttributes(attr.id, attr)));
    alert('Product updated successfully');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">EDIT PRODUCT</h1>
      <div className="flex flex-row gap-1">
        <div className="w-3/4 flex flex-col gap-6 pl-5 pr-4 pb-5">
          <div className='bg-white rounded-lg p-4'>
            <h2 className="text-xl font-bold mb-4">Product Information</h2>
            <label className="block mb-2">
              Title:
              <input type="text" name="title" value={updatedProduct.title || ''} onChange={handleProductChange} className="block w-full mt-1 p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Description:
              <textarea name="description" value={updatedProduct.description || ''} onChange={handleProductChange} className="block w-full mt-1 p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Category:
              <select name="categoryId" value={selectedCategory} onChange={handleCategoryChange} className="block w-full mt-1 p-2 border rounded">
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className='bg-white rounded-lg p-4'>
            <h2 className="text-xl font-bold mb-4">Product Pricing</h2>
            <label className="block mb-2">
              Price:
              <input type="number" name="price" value={updatedProduct.price || ''} onChange={handleProductChange} className="block w-full mt-1 p-2 border rounded" />
            </label>
            <label className="block mb-2">
              Discount:
              <input type="number" name="discount" value={updatedProduct.discount || ''} onChange={handleProductChange} className="block w-full mt-1 p-2 border rounded" />
            </label>
          </div>
          <div className='bg-white rounded-lg p-4'>
            <h2 className="text-xl font-bold mb-4">Product Attributes</h2>
            {updatedAttributes.map(attr => (
              <div key={attr.id} className="mb-4">
                <label className="block mb-2">
                  {attr.name}:
                  <input type="text" name="value" value={attr.value || ''} onChange={(e) => handleAttributesChange(e, attr.id)} className="block w-full mt-1 p-2 border rounded" />
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;