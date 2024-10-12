import FanProduct from './utils/productCard';

function CreateProduct() {
  return (
    <div className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-5">Create Product</h1>
      <FanProduct />
    </div>
  );
}

export default CreateProduct;
