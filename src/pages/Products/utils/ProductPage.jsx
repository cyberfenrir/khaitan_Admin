import ProductTable from './ProductTable';
import PropTypes from 'prop-types';


const ProductPage = ({ allProducts = [] }) => {
  return (
    <div className="p-6">
      {allProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ProductTable productsList={allProducts} />
      )}
    </div>
  );
};

ProductPage.propTypes = {
  allProducts: PropTypes.array,
};

export default ProductPage;