import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ProductPricing from './utils/ProductPricing';

function ProductPricingPage() {
  const { productInfo, setProductInfo, pricing, setPricing } = useContext(ProductContext);
  const navigate = useNavigate();
  const { product_id } = useParams();

  const handleNext = () => {
    const updatedProductInfo = { ...productInfo, pricing };
    setProductInfo(updatedProductInfo);
    navigate(`/products/add-product/${product_id}/image`);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Pricing</h1>
      <ProductPricing setPricing={setPricing} />
      <div className="flex justify-end w-[55%] px-3 pt-6">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg justify-center w-1/4" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductPricingPage;