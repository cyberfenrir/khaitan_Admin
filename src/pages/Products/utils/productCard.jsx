import PropTypes from 'prop-types';
import f1 from './duPics/f1.png';

function FanProduct() {
  const sizes = ['17.0', '10.5', '19.5', '12', '21', '24'];
  const colors = ['1', '2', '3', '4'];

  return (
    <article className="flex flex-col bg-white rounded-xl shadow-sm max-w-[365px]">
      <div className="flex flex-col p-6">
        <img 
          loading="lazy" 
          src={f1}
          alt="Fan type #1" 
          className="object-contain w-80 max-w-full aspect-[1.13]" 
        />
        <div className="mt-6">
          <header className="flex justify-between font-semibold">
            <h1 className="text-lg text-slate-700">Fan type #1</h1>
            <span className="text-sm text-slate-500">(Fan)</span>
          </header>
          <div className="mt-6 text-base font-medium text-slate-700">Price:</div>
          <div className="flex gap-3 items-center mt-3 text-lg font-semibold text-slate-500">
            <span className="whitespace-nowrap">Rs100</span>
            <span className="text-slate-700">Rs80</span>
            <span className="text-xs">(30% Off)</span>
          </div>
          <SizeSelector sizes={sizes} />
          <ColorSelector colors={colors} />
        </div>
      </div>
      <ProductActions />
    </article>
  );
}

function SizeSelector({ sizes }) {
  return (
    <div className="mt-6">
      <label htmlFor="size-select" className="text-base font-medium text-slate-700">Size:</label>
      <div className="flex gap-3 mt-2.5">
        {sizes.map((size, index) => (
          <button
            key={index}
            className="w-9 h-9 rounded-xl border border-slate-100 bg-slate-100"
            aria-label={`Select size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

SizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function ColorSelector({ colors }) {
  return (
    <div className="mt-6">
      <label htmlFor="color-select" className="text-base font-medium text-slate-700">Colors:</label>
      <div className="flex gap-3 mt-2.5">
        {colors.map((color, index) => (
          <button
            key={index}
            className="flex justify-center items-center w-9 h-9 rounded-xl border border-slate-100 bg-slate-100"
            aria-label={`Select color ${color}`}
          >
            <img 
              loading="lazy" 
              src={`http://b.io/ext_${parseInt(color) + 1}-`} 
              alt={`Color ${color}`} 
              className="object-contain aspect-square w-4 h-4" 
            />
          </button>
        ))}
      </div>
    </div>
  );
}

ColorSelector.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function ProductActions() {
  return (
    <footer className="flex justify-center p-5 bg-gray-50">
      <button className="py-2.5 px-7 rounded-xl border border-slate-500">Create Product</button>
      <button className="ml-3 py-2.5 px-7 bg-orange-500 text-white rounded-xl">Cancel Product</button>
    </footer>
  );
}

export default FanProduct;
