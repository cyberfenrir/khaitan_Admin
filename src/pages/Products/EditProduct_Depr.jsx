import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getAttributesbyCategory, updateProduct, updateProductAttributes, getAllCategories, fetchCategoryById, getAllMedia, addMedia, deleteMedia, uploadImageToStorage, getAttributesforProduct, getAllAttributes } from '../../Utils/service';
import MessageBox from '../../Utils/message';

function EditProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [allAttr, setAllAttr] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [updatedAttributes, setUpdatedAttributes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const intSlug = parseInt(slug, 10);
      console.log('Fetching product details for slug:', intSlug);
      
      const productData = await getProductById(intSlug);
      console.log('Fetched product data:', productData);
      
      if (productData.success) {
        setProduct(productData.data);
        setUpdatedProduct(productData.data);
        
        const attributesData = await getAttributesforProduct(productData.data.id);
        console.log('Fetched attributes data:', attributesData);
        
        const allAttributes = await getAllAttributes();
        if(allAttributes.success) {
          console.log("All Attributes: ", allAttributes.data);
          const productAttr = allAttributes.data.filter((a) => Number(productData.data.categoryId) === Number(a.categoryId));
          
          const attributeMap = {};
          productAttr.forEach(attr => {
            const matchingAttr = attributesData.data.find(a => a.attributeId === attr.id);
            if (matchingAttr) {
              attributeMap[attr.name] = matchingAttr.value;
            }
          });
          
          setAllAttr(attributeMap);
          console.log("Attribute Map: ", attributeMap);
        }
        
        if (attributesData.success) {
          setAttributes(attributesData.data);
          setUpdatedAttributes(attributesData.data);
        }

        const categoryData = await fetchCategoryById(productData.data.categoryId);
        console.log('Fetched category data:', categoryData);
        
        if (categoryData.success) {
          setSelectedCategory(categoryData.data.id);
        }
        
        const allCategories = await getAllCategories();
        console.log('Fetched all categories:', allCategories);
        
        if (allCategories.success) {
          setCategories(allCategories.data);
        }

        const mediaData = await getAllMedia();
        console.log('Fetched media data:', mediaData);
        
        if (mediaData.success) {
          const productImage = mediaData.data.find(media => media.productId === intSlug);
          console.log('Found product image:', productImage);
          
          if (productImage) {
            setImage(productImage);
          }
        }
      }
    };

    fetchProductDetails();
  }, [slug]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    console.log('Product field change:', { field: name, value });
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttributesChange = (e, id) => {
    const { name, value } = e.target;
    console.log('Attribute field change:', { attributeId: id, field: name, value });
    setUpdatedAttributes((prev) => prev.map(attr => 
      attr.id === id ? { ...attr, [name]: value } : attr
    ));
  };

  const handleCategoryChange = async (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setUpdatedProduct((prev) => ({ ...prev, categoryId: value }));

    const attributesData = await getAttributesbyCategory(parseInt(value, 10));
    if (attributesData.success) {
      setAttributes(attributesData.data);
      console.log(attributes);
      setUpdatedAttributes(attributesData.data);
    }
  };

  const handleSaveProduct = async () => {
    const intSlug = parseInt(slug, 10);
    const result = await updateProduct(intSlug, updatedProduct);
    if (result.success) {
      setMessage('Product updated successfully');
      setMessageType('success');
    } else {
      setMessage('Failed to update product');
      setMessageType('error');
    }
  };

  const handleSaveAttributes = async () => {
    const intSlug = parseInt(slug, 10);
    const result = await updateProductAttributes(intSlug, updatedAttributes);
    if (result.success) {
      setMessage('Attributes updated successfully');
      setMessageType('success');
    } else {
      setMessage('Failed to update attributes');
      setMessageType('error');
    }
  };

  const handleSaveImage = async () => {
    if (newImage) {
      console.log('Saving new image:', {
        existingImage: image,
        newImage: 'Base64 image data available'
      });
      
      if (image) {
        console.log('Deleting existing image:', image.id);
        await deleteMedia(image.id);
      }
      
      try {
        const file = newImage;
        const downloadURL = await uploadImageToStorage(file);
        const mediaData = {
          productId: slug,
          imageUrl: downloadURL
        };
        const response = await addMedia(mediaData);
        console.log('Media uploaded:', response);
        setMessage('Image updated successfully');
        setMessageType('success');
      } catch (error) {
        console.error('Failed to upload media:', error);
        setMessage('Failed to upload media.');
        setMessageType('error');
      }
    }
  };

  const handleSaveAll = async () => {
    console.log('Starting save all operation');
    console.log('Current state:', {
      product: updatedProduct,
      attributes: updatedAttributes,
      image: newImage ? 'New image present' : 'No new image'
    });
    
    await handleSaveProduct();
    await handleSaveAttributes();
    await handleSaveImage();
    console.log('Save all operation completed');
  };

  const handleCloseMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('New image selected:', {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type
    });
    
    if (file) {
      setNewImage(file);
    }
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
            <button onClick={handleSaveProduct} className="bg-orange-500 text-white rounded-xl p-2 hover:bg-orange-600 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">Save Product</button>
          </div>
          <div className='bg-white rounded-lg p-4'>
            <h2 className="text-xl font-bold mb-4">Product Attributes</h2>
            {updatedAttributes.map(attr => (
              <div key={attr.id} className="mb-4">
                <label className="block mb-2">
                  {attr.name}:
                  <div className="flex items-center w-1/3">
                    <input type="text" name="value" value={attr.id || ''} onChange={(e) => handleAttributesChange(e, attr.id)} className="block w-full mt-1 p-2 border rounded" />
                    <span className="ml-2">{attr.unit}</span>
                  </div>
                </label>
              </div>
            ))}
            <button onClick={handleSaveAttributes} className="bg-orange-500 text-white rounded-xl p-2 hover:bg-orange-600 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">Save Attributes</button>
          </div>
          <div className='bg-white rounded-lg p-4'>
            <h2 className="text-xl font-bold mb-4">Product Image</h2>
            {image && <img src={image.imageUrl} alt="Product" className="mb-4 w-32 h-32 object-cover" />}
            <input type="file" onChange={handleImageChange} className="block w-full mt-1 p-2 border rounded" />
            <button onClick={handleSaveImage} className="bg-orange-500 text-white rounded-xl p-2 hover:bg-orange-600 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">Save Image</button>
          </div>
          <div className='flex justify-center'>
            <button onClick={handleSaveAll} className="bg-green-500 text-white p-2 w-1/2 rounded mt-4">Save All Changes</button>
          </div>
        </div>
      </div>
      {message && (
        <div className="mt-4">
          <MessageBox message={message} type={messageType} onClose={handleCloseMessage} />
        </div>
      )}
    </div>
  );
}

export default EditProduct;