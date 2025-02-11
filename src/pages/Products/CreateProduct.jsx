import { useState, useEffect } from 'react';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';
import { fetchColors } from '../../Middlewares/data/colorsapi';


function CreateProduct() {

  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [screen, setScreen] = useState('details');


  useEffect(() => {
    const getColors =async () => {
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

  const handleColorNext = (data) => {
    console.log(data);
    setSelectedColor(data);
  };


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

  const handleSubmit = () => {
    const productData = {
      image,
      productInfo,
      pricing,
      selectedColor,
    };

    // Send productData to the API
    console.log(productData);
    // Example: axios.post('/api/products', productData);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">CREATE PRODUCT</h1>
       
        <div className="w-full flex flex-col gap-6 pl-5 pr-4 pb-5">
          {
            screen === 'details' && (
              <div className='bg-white rounded-lg'>
                <ProductInformation setProductInfo={setProductInfo} onNext={handleNext} />
              </div>
            )
          }
          {
            screen === 'pricing' && (
              <div className='bg-white rounded-lg'>
                <ProductPricing setPricing={setPricing} productInfo={productInfo} onNext={handlePricingNext} />
              </div>
            )
          }
          {
            screen === 'image' && (
              <div className='bg-white rounded-lg'>
                <ImageDropZone setImage={setImage} productInfo={productInfo} pricing={pricing} colors = {colors} nextColor = {handleColorNext}  />
              </div>
              
            )
          }


          
          <div className="flex justify-end w-[55%] px-3 pt-6">

          

          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg justify-center w-1/4" onClick={handleSubmit}>
          Submit
        </button>
          </div>
          
        </div>
    </div>
  );
}

export default CreateProduct;