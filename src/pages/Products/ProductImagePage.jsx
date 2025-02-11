import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ImageDropZone from './utils/ImageDropZone';
import { fetchColors } from '../../Middlewares/data/colorsapi';

function ProductImagePage() {
  const { productInfo, setProductInfo, imageData, setImageData, selectedColor, setSelectedColor } = useContext(ProductContext);
  const { product_id } = useParams();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const getColors = async () => {
      try {
        const colorsData = await fetchColors();
        setColors(colorsData);
        console.log(colorsData);
      } catch (error) {
        console.error('Failed to fetch colors:', error);
      }
    };

    getColors();
  }, []);

  const handleImageUpload = (uploadedImageData) => {
    setImageData(uploadedImageData);
  };

  const handleSubmit = () => {
    const productData = {
      ...productInfo,
      imageData,
      color: selectedColor,
      productId: product_id,
    };

    // Send productData to the API
    console.log(productData);
    // Example: axios.post('/api/products', productData);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Image</h1>
      <ImageDropZone setImage={setImageData} onImageUpload={handleImageUpload} />
     
      <div className="flex justify-end w-[55%] px-3 pt-6">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg justify-center w-1/4" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProductImagePage;