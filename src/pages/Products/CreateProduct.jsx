import { useState, useEffect } from 'react';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';
import { fetchColors } from '../../Middlewares/data/colorsapi';

function CreateProduct() {
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [screen, setScreen] = useState('details');

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

  const handleNext = (data) => {
    console.log(data);
    setProductInfo(data);
    setScreen('pricing');
  };

  const handlePricingNext = (data) => {
    console.log(data);
    setPricing(data);
    setScreen('image');
  };

  const handleNextColor = (color) => {
    console.log('Next color:', color);
    // Additional logic for handling the next color can be added here
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">CREATE PRODUCT</h1>
      <div className="w-full flex flex-col gap-6 pl-5 pr-4 pb-5">
        {screen === 'details' && (
          <div className='bg-white rounded-lg'>
            <ProductInformation setProductInfo={setProductInfo} onNext={handleNext} />
          </div>
        )}
        {screen === 'pricing' && (
          <div className='bg-white rounded-lg'>
            <ProductPricing setPricing={setPricing} productInfo={productInfo} onNext={handlePricingNext} />
          </div>
        )}
        {screen === 'image' && (
          <div className='bg-white rounded-lg'>
            <ImageDropZone setImage={setImage} productInfo={productInfo} pricing={pricing} colors={colors} nextColor={handleNextColor} />
          </div>
        )}
        <div className="flex justify-end w-[55%] px-3 pt-6"></div>
      </div>
    </div>
  );
}

export default CreateProduct;