import { useEffect } from 'react';
import ProductTable from './ProductTable';
import PropTypes from 'prop-types';

const ProductPage = ({ allProducts = [], currentPage, pageSize }) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedProducts = allProducts.slice(start, end);

  return (
    <div className="p-6">
      {paginatedProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ProductTable productsList={paginatedProducts} />
      )}
    </div>
  );
};

ProductPage.propTypes = {
  allProducts: PropTypes.array,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

export default ProductPage;