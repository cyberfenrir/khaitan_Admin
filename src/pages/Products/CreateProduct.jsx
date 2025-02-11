import { useState } from 'react';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';

function CreateProduct() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});

  const handleSubmit = () => {
    const productData = {
      image,
      productInfo,
      pricing,
      color: selectedColor,
    };

    // Send productData to the API
    console.log(productData);
    // Example: axios.post('/api/products', productData);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">CREATE PRODUCT</h1>
       
        <div className="w-full flex flex-col gap-6 pl-5 pr-4 pb-5">
          <div className='bg-white rounded-lg'>
            <ImageDropZone setImage={setImage} />
          </div>
          <div className='bg-white rounded-lg'>
            <ProductInformation setProductInfo={setProductInfo} />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color
            </label>
            <div className="flex items-center gap-3">
                <input 
                    type="color"
                    id="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-12 h-8 p-0 border rounded cursor-pointer"
                />
                <span className="text-sm text-gray-600">{selectedColor}</span>
            </div>
          </div>
          <div className='bg-white rounded-lg'>
            <ProductPricing setPricing={setPricing} />
          </div>
          <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
    </div>
  );
}

export default CreateProduct;