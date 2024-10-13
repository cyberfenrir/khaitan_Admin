import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CategoryGrid from './Utils/categoryList';
// import { Section } from 'lucide-react';

const categories = [
  { id: 'FS16276', name: "Fashion Men, Women & Kid's", startingPrice: '$80 to $400', createdBy: 'Seller', stock: '46233', image: './src/pages/Categories/Utils/prod1.png' },
  { id: 'HB73029', name: 'Women Hand Bag', startingPrice: '$120 to $500', createdBy: 'Admin', stock: '2739', image: './src/pages/Categories/Utils/prod2.png' },
];


const CellRendererParamsPropTypes = {
  value: PropTypes.string.isRequired, 
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};


const ActionCellRenderer = ({ params }) => (
  <div>
    <button className="w-10 h-10 bg-slate-100 border border-solid rounded-lg" aria-label="View">
      <img src="./src/pages/Categories/Utils/eye.svg" alt="view" />
    </button>
    <button className="w-10 h-10 bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg ml-2" aria-label="Edit">
      <img src="./src/pages/Categories/Utils/edit.svg" alt="edit" />
    </button>
    <button className="w-10 h-10 bg-red-400 bg-opacity-10 border border-red-400 rounded-lg ml-2" aria-label="Delete">
      <img src="./src/pages/Categories/Utils/bin.svg" alt="delete" />
    </button>
  </div>
);

ActionCellRenderer.propTypes = {
  params: PropTypes.shape(CellRendererParamsPropTypes).isRequired,
};

// CategoryPage Component
const CategoryPage = () => {
  // Define columns for the Ag-Grid table
  const columnDefs = useMemo(() => [
    {
      headerName: 'Image',
      field: 'image',
      cellRendererFramework: ({ value, data }) => (
        <img
          loading="lazy"
          src={value}
          alt={data.name}
          className="w-14 h-14 object-contain"
        />
      ),
      width: 120,
    },
    { headerName: 'Categories', field: 'name', width: 240 },
    { headerName: 'Starting Price', field: 'startingPrice', width: 188 },
    { headerName: 'Created By', field: 'createdBy' },
    { headerName: 'ID', field: 'id' },
    { headerName: 'Stock', field: 'stock' },
    {
      headerName: 'Actions',
      field: 'id',
      cellRendererFramework: params => <ActionCellRenderer params={params} />,
      width: 200,
    },
  ], []);

  return (   
    <section className="container mx-auto p-6">
      {/* Category Grid Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Category Grid</h2>
        <CategoryGrid />
      </div>
      
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <header className="flex justify-between items-center p-5 border-b border-slate-200">
          <h1 className="text-xl font-semibold text-slate-700">All Categories List</h1>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">Add Product</button>
        </header>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={categories}
            pagination={true}
            paginationPageSize={5}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
