import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { deleteProduct } from '../../../Middlewares/data/productsapi';
import { deleteProductbyId, getAllMedia, getAllCategories, getCategoryById } from '../../../Utils/service';
import { useState, useEffect } from 'react';
import { getData } from '../../../Utils/service';

const ProductTableHeader = () => {
  return (
    <div role="rowheader" className="contents">
      <div className="flex justify-center py-3.5 px-5 bg-gray-50 border-b border-slate-200">
       Id
      </div>
      <div className="py-3.5 px-3.5 text-sm font-bold bg-gray-50 border-b border-slate-200 text-slate-500">
        Image
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
        Actions
      </div>
    </div>
  );
};

const ProductTableRow = ({ product, media, categories, onDelete }) => {
  const [categoryName, setCategoryName] = useState('Unknown');

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categoryId = parseInt(product.categoryId);
        const categoryData = await getCategoryById(categoryId);
        if (categoryData.success) {
          setCategoryName(categoryData.data.name);
        } else {
          console.error('Failed to fetch category:', categoryData.error);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategoryName();
  }, [product.categoryId]);

  const actionIcons = [
    { src: viewIcon, bgColor: "bg-slate-100", action: "view" },
    { src: editIcon, bgColor: "bg-orange-500 bg-opacity-10", action: "edit" },
    { src: deleteIcon, bgColor: "bg-red-400 bg-opacity-10", action: "delete" }
  ];

  const handleAction = async(action) => {
    switch (action) {
      case 'view':
        console.log(`View product ${product.id}`);
        break;
      case 'edit':
        window.location.href = `/products/edit-product/${product.id}`;
        break;
      case 'delete': {
        deleteProduct(product.id);
        const result = await deleteProductbyId(product.id);
        if (result.success) {
          console.log('Product deleted:', result.productId);
          onDelete(product.id);
        } else {
          console.error('Error:', result.error);
        }
        break;
      }
      default:
        break;
    }
  };

  const productMedia = media.find(m => m.productId === product.id);

  return (
    <div role="row" className="flex justify-center contents group">
      <div className="flex justify-center items-center py-4 px-5 border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{product.id}</span>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            {productMedia ? (
              <img src={productMedia.imageUrl} alt="Product" className="w-16 h-16 object-cover" />
            ) : (
              <span className="text-sm text-slate-600">No Image</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center py-4 px-3.5 border-b border-slate-200 group-hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-slate-700">{product.title}</h2>
          </div>
        </div>
      </div>
      <div className="py-4 px-3.5 flex items-center border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm text-slate-600">{categoryName}</span>
      </div>
      <div className="py-4 px-3.5 flex items-center border-b border-slate-200 group-hover:bg-slate-50">
        <span className="text-sm font-medium text-slate-700">{product.price}</span>
      </div>
      <div className="py-4 px-3.5 flex items-center border-b border-slate-200 group-hover:bg-slate-50">
        <Actions icons={actionIcons} onAction={handleAction} />
      </div>
    </div>
  );
};

const ProductTable = ({ productsList }) => {
  const [products, setProducts] = useState(productsList);
  const [media, setMedia] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  // const [allProducts, setAllProducts] = useState([]);

  // const fetchAllProducts = async () => {
  //   try {
  //     const productsData = await getData('products');
  //     if(productsData.success) {
  //       setAllProducts(productsData.data);
  //     } else {
  //       console.error('Failed to fetch products:', productsData.error);
  //     }
  //   }
  //   catch(error) {
  //     console.error('Error fetching products:', error);
  //   }
  // }

  // useEffect(()=>{
  //   fetchAllProducts();
  // },[]);

  useEffect(() => {
    setProducts(productsList);
  }, [productsList]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await getAllMedia();
        if (mediaData.success) {
          setMedia(mediaData.data);
        } else {
          console.error('Failed to fetch media:', mediaData.error);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        if (categoriesData.success) {
          setCategories(categoriesData.data);
          // console.log('Categories:', categoriesData.data);
        } else {
          console.error('Failed to fetch categories:', categoriesData.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMedia();
    fetchCategories();
  }, []);

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const categoryName = categories.find(category => category.id === parseInt(product.categoryId))?.name || '';
    // console.log('Filtered:', categoryName);
    return categoryName.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 overflow-x-auto">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 hidden md:block" />
        <div className="overflow-auto">
          <div className="min-w-[1200px]">
            <div className="p-4">
              <input
                type="text"
                placeholder="Filter by category"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-md"
              />
            </div>
            <div role="table" className="grid grid-cols-6">
              <ProductTableHeader />
              <div role="rowgroup" className="contents">
                {filteredProducts.map((product) => (
                  <ProductTableRow 
                    key={product.id} 
                    product={product}
                    media={media}
                    categories={categories}
                    onDelete={handleDelete}
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
  productsList: PropTypes.array.isRequired
};
ProductTableRow.propTypes = {
  product: PropTypes.object.isRequired,
  media: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProductTable;