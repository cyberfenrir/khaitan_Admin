import PropTypes from 'prop-types';
import ProductHeader from './utils/ProductHeader';
import ProductPage from './utils/ProductPage';
import TablePagination from './utils/TablePagination';

export default function ProductList({ products, currentPage, totalPages, onPageChange }) {
  return (
    <main className="flex flex-col px-3">
      <section className="flex flex-col w-full bg-white rounded-xl shadow-sm">
        <ProductHeader title="All Product List" addButtonText="Add Product" />
        <ProductPage products={products} />
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </section>
    </main>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  onPageChange: () => {},
};