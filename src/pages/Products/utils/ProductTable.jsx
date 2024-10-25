import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const ProductTableHeader = () => {
  return (
    <div role="rowheader" className="flex flex-col bg-gray-50">
      <div className="flex items-center">
        <div role="columnheader" className="flex justify-center py-3.5 px-5 border-b border-slate-200 w-[59px]">
          <input
            type="checkbox"
            className="w-4 bg-white rounded border border-black border-opacity-20"
            aria-label="Select all products"
          />
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 min-w-[240px] text-slate-500">
          Product
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 w-[120px] text-slate-500">
          Category
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 w-[120px] text-slate-500">
          Price
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 w-[160px] text-slate-500">
          Stock
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 w-[140px] text-slate-500">
          Rating
        </div>
        <div role="columnheader" className="py-3.5 px-3.5 text-sm font-bold border-b border-slate-200 w-[140px] text-slate-500">
          Actions
        </div>
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
    <div role="row" className="flex items-center hover:bg-slate-50">
      <div role="cell" className="flex justify-center py-4 px-5 border-b border-slate-200 w-[59px]">
        <input
          type="checkbox"
          className="w-4 h-4 bg-white rounded border border-black border-opacity-20"
          aria-label={`Select ${product.name}`}
        />
      </div>
      <div role="cell" className="flex items-center py-4 px-3.5 border-b border-slate-200 min-w-[240px]">
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
      <div role="cell" className="py-4 px-3.5 border-b border-slate-200 w-[120px]">
        <span className="text-sm text-slate-600">{product.category}</span>
      </div>
      <div role="cell" className="py-4 px-3.5 border-b border-slate-200 w-[120px]">
        <span className="text-sm font-medium text-slate-700">{product.price}</span>
      </div>
      <div role="cell" className="py-4 px-3.5 border-b border-slate-200 w-[160px]">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">{product.stock.left}</span>
          <span className="text-sm text-slate-500">{product.stock.sold}</span>
        </div>
      </div>
      <div role="cell" className="py-4 px-3.5 border-b border-slate-200 w-[140px]">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate-600">★ {product.rating.score}</span>
          <span className="text-sm text-slate-500">{product.rating.reviews}</span>
        </div>
      </div>
      <div role="cell" className="py-4 px-3.5 border-b border-slate-200 w-[140px]">
        <Actions icons={actionIcons} onAction={handleAction} />
      </div>
    </div>
  );
};

const ProductTable = ({ productsList }) => {
  return (
    <section className="flex flex-col w-full bg-white rounded-lg border border-slate-200">
      <div role="table" className="flex flex-col w-full">
        <ProductTableHeader />
        <div role="rowgroup" className="flex flex-col">
          {productsList.map((product) => (
            <ProductTableRow 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
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