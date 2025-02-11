import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ProductInformation from './utils/ProductInformation';
import { v4 as uuidv4 } from 'uuid';

function ProductInformationPage() {
  const { productInfo, setProductInfo } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleNext = () => {
    const productId = uuidv4(); // Generate a unique product ID
    setProductInfo({ ...productInfo, id: productId });
    navigate(`/products/add-product/pricing/${productId}`,productInfo);
  };

  return (
    <div className="flex flex-col p-1 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Information</h1>
      <ProductInformation setProductInfo={setProductInfo} />

      <div className="flex justify-end w-[100%]">
        <button onClick={handleNext} className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          Next --&gt;
        </button>
      </div>
    </div>
  );
}

export default ProductInformationPage;