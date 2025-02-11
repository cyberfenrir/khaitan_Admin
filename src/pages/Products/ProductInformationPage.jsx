import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ProductInformation from './utils/ProductInformation';

function ProductInformationPage() {
  const { productInfo, setProductInfo } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleNext = () => {
    // Save productInfo to state or context
    navigate(`/products/add-product/pricing/${productInfo.id}`);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Information</h1>
      <ProductInformation setProductInfo={setProductInfo} />
      <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Next
      </button>
    </div>
  );
}

export default ProductInformationPage;