import { useState, useEffect } from 'react';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';
import { fetchColors } from '../../Middlewares/data/colorsapi';
import { data } from 'autoprefixer';
import { getAllColors } from '../../services/colorService';
// import { addData } from '../../Utils/service';

function CreateProduct() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [screen, setScreen] = useState('details');

  useEffect(() => {
    const getColors = async () => {
      try {
        const colorsData = await getAllColors();
        setColors(colorsData.data || []);
      } catch (error) {
        console.error('Failed to fetch colors:', error);
      }
    };

    getColors();
  }, []);

  const handleColorNext = (data) => {
    setSelectedColor(data);
  };

  const handleNext = async (data) => {
    setProductInfo(data);
    console.log("Product Info:", data);
    setScreen('pricing');
  };

  const handlePricingNext = (data) => {
    setPricing(data);
    setScreen('image');
  };

  // const handleSubmit = () => {
  //   const productData = {
  //     image,
  //     productInfo,
  //     pricing,
  //     selectedColor,
  //   };

  //   // Send productData to the API
  //   console.log(productData);
  //   // Example: axios.post('/api/products', productData);
  // };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600 pl-5">CREATE PRODUCT</h1>
      <div className="w-full flex flex-col gap-6 pl-5 pr-4 pb-5">
        {screen === 'details' && (
          <div className='bg-white rounded-lg'>
            <ProductInformation setProductInfo={setProductInfo} mode = "create" onNext={handleNext} />
          </div>
        )}
        {screen === 'pricing' && (
          <div className='bg-white rounded-lg'>
            <ProductPricing productId = {productInfo.id} mode = "create" productInfo = {productInfo} categoryId={productInfo.categoryId} onNext={handlePricingNext} />
          </div>
        )}
        {screen === 'image' && (
          <div className='bg-white rounded-lg'>
            <ImageDropZone setImage={setImage} mode = "create" productInfo={productInfo} pricing={pricing} colors={colors} nextColor={handleColorNext} />
          </div>
        )}
        {/* <div className="flex justify-end w-[55%] px-3 pt-6">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg justify-center w-1/4" onClick={handleSubmit}>
            Submit
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default CreateProduct;