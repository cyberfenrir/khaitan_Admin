import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ProductPricing from './utils/ProductPricing';

function ProductPricingPage() {
  const { pricing, setPricing } = useContext(ProductContext);
  const navigate = useNavigate();
  const { product_id } = useParams();

  const handleNext = () => {
    // Save pricing to state or context
    navigate(`/products/add-product/${product_id}/image`);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Pricing</h1>
      <ProductPricing setPricing={setPricing} />
      <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Next
      </button>
    </div>
  );
}

export default ProductPricingPage;