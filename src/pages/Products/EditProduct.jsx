import FanProduct from './utils/productCard';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';

function EditProduct() {
  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">EDIT PRODUCT</h1>
      <div className="flex flex-row gap-1">
        <div className="w-1/4">
          <FanProduct />
        </div>
        <div className="w-3/4 flex flex-col gap-6 pl-5 pr-4 pb-5">
          <div className='bg-white rounded-lg'>
            <ImageDropZone />
          </div>
          <div className='bg-white rounded-lg'>
            <ProductInformation />
          </div>
          <div className='bg-white rounded-lg'>
            <ProductPricing />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;