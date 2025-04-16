import PropTypes from 'prop-types';
import ProductHeader from './utils/ProductHeader';
import ProductPage from './utils/ProductPage';
import TablePagination from './utils/TablePagination';
import { useState, useEffect } from 'react';
import { getAllProducts } from '../../services/productService';

export default function ProductList() {
    const PAGE_SIZE = 5;
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const [paginatedProducts, setPaginatedProducts] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            const response = await getAllProducts();
            setAllProducts(response.data);
        }
        getProductData();
    }, []);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    
    const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const products = allProducts.slice(start, end);

    return (
        <main className="flex flex-col px-3">
            <section className="flex flex-col w-full bg-white rounded-xl shadow-sm">
                <ProductHeader title="All Product List" addButtonText="Add Product" />
                <ProductPage allProducts={allProducts} currentPage={currentPage} pageSize={PAGE_SIZE} /> 
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