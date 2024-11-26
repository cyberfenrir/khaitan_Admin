import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const ProductTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="flex justify-center py-3.5 px-5 bg-gray-50 border-b border-slate-200">
        <input
          type="checkbox"
          className="w-4 bg-white rounded border border-black border-opacity-20"
          aria-label="Select all products"
        />
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Product
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Category
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Price
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Stock
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Rating
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Actions
      </div>
    </div>
  );
};

const ProductTableRow = ({ product }) => {
  const actionIcons = [
    { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
    { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
    { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
  ];

  const handleAction = (action) => {
    switch (action) {
      case 'view':
        console.log(`View product ${product.id}`);
        break;
      case 'edit':
        console.log(`Edit product ${product.id}`);
        break;
      case 'delete':
        console.log(`Delete product ${product.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div role="row" className="contents group">
      <div className="flex justify-center py-4 px-5 border-b border-slate-200 group-hover:bg-slate-50">
        <input
          type="checkbox"
          className="w-4 h-4 bg-white rounded border border-black border-opacity-20"
          aria-label={`Select ${product.name}`}
        />
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center w-14 h-14 rounded-xl bg-slate-100">
            <img
              loading="lazy"
              src={product.image}
              alt={product.name}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-slate-700">{product.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Size: {product.sizes}</p>
          </div>
        </div>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{product.category}</span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm font-medium text-slate-700">{product.price}</span>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">{product.stock.left}</span>
          <span className="text-sm text-slate-500">{product.stock.sold}</span>
        </div>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">★ {product.rating.score}</span>
          <span className="text-sm text-slate-500">{product.rating.reviews}</span>
        </div>
      </div>
      <div className="py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <Actions icons={actionIcons} onAction={handleAction} />
      </div>
    </div>
  );
};

const ProductTable = ({ productsList }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200">
      {/* Outer container with shadow effect for scroll indication */}
      <div className="relative">
        {/* Left shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block" />
        {/* Right shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
        
        {/* Scrollable container */}
        <div className="overflow-auto">
          {/* Min-width ensures the table doesn't collapse too much */}
          <div className="min-w-[980px]">
            <div role="table" className="grid grid-cols-[59px_minmax(240px,1fr)_120px_120px_160px_140px_140px]">
              <ProductTableHeader />
              <div role="rowgroup" className="contents">
                {productsList.map((product) => (
                  <ProductTableRow 
                    key={product.id} 
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductTable.propTypes = {
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      sizes: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      stock: PropTypes.shape({
        left: PropTypes.string.isRequired,
        sold: PropTypes.string.isRequired,
      }).isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.shape({
        score: PropTypes.string.isRequired,
        reviews: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired
};

export default ProductTable;