import PropTypes from 'prop-types';
import Actions from './actions';
import viewIcon from '../assets/view.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import { deleteProduct } from '../../../Middlewares/data/productsapi';
import { deleteProductbyId, getAllMedia, getAllCategories, getCategoryById, getProductById } from '../../../Utils/service';
import { useState, useEffect } from 'react';
import { getData, getAttributesbyCategory, getAttributesforProduct } from '../../../Utils/service';
import MessageBox from '../../../Utils/message';
// import { useNavigate } from 'react-router-dom';

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
  const [productDetails, setProductDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  // const navigate = useNavigate();

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
  try {
    const response = await getProductById(parseInt(product.id));
    if (!response.success || !response.data) {
      throw new Error('Failed to fetch product details');
    }
    
    console.log("Product Details:", response.data);

    const attr = await getAttributesforProduct(parseInt(product.id));
    if (!attr) {
      throw new Error('Attributes for product not found');
    }

    console.log("Product Attributes:", attr);

    const category = await getCategoryById(parseInt(response.data.categoryId));
    if (!category.success || !category.data) {
      throw new Error('Failed to fetch category details');
    }

    console.log("Category:", category.data);

    const attributesData = await getAttributesbyCategory(category.data.id);
    if (!attributesData.success || !Array.isArray(attributesData.data)) {
      throw new Error('Failed to fetch attributes data');
    }

    console.log("Fetched Attributes Data:", attributesData.data);

    const combinedAttributes = attributesData.data.map(attribute => {
      const matchingAttr = attr?.data?.find(a => a.attributeId === attribute.id);
      return {
        categoryId: attribute.categoryId,
        attributeId: attribute.id,
        name: attribute.name,
        type: attribute.type,
        unit: attribute.unit,
        value: matchingAttr ? matchingAttr.value : null,
      };
    });

    console.log("Combined Attributes:", combinedAttributes);

    setAttributes(combinedAttributes);
    setProductDetails(response.data);
    setShowPopup(true);
  } catch (error) {
    console.error("Error fetching product:", error);
    setErrorMessage('Error fetching product: ' + error.message);
  }
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
  console.log(media);

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
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-1/2 max-h-[80vh] overflow-auto">

    {/* 🖼️ Media Carousel */}
    <h3 className="text-lg font-semibold mb-2">Product Images</h3>
      {media.length > 0 ? (
        <div className="relative w-full flex justify-center">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-500 text-white rounded-l-lg"
          >
            ❮
          </button>
          <img
            src={media[currentIndex].imageUrl}
            alt="Product"
            className="w-full max-h-60 object-contain rounded-md"
          />
          <button
            onClick={() => setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-500 text-white rounded-r-lg"
          >
            ❯
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No images available</p>
      )}
      
      <h2 className="text-xl font-semibold mb-4">Product Details</h2>
      <div className="mb-4">
        <strong>Title:</strong> {productDetails.title}
      </div>
      <div className="mb-4">
        <strong>Description:</strong> {productDetails.description}
      </div>
      <div className="mb-4">
        <strong>Price:</strong> {productDetails.price}
      </div>
      <div className="mb-4">
        <strong>Category:</strong> {categoryName}
      </div>

      

      {/* 🏷️ Attributes Grid */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Attributes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {attributes.map((attr) => (
          <div key={attr.id} className="border p-4 rounded-lg shadow-md bg-gray-100">
            <p className="font-semibold text-gray-700">{attr.name}</p>
            <p className="text-sm text-gray-600"><strong>Type:</strong> {attr.type}</p>
            <p className="text-sm text-gray-600"><strong>Value:</strong> {attr.value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowPopup(false)}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  </div>
)}
      {errorMessage && <MessageBox message={errorMessage} onClose={() => setErrorMessage('')} />}
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
          console.log(mediaData);
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