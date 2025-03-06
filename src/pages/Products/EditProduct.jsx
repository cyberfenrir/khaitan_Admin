import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageDropZone from './utils/ImageDropZone';
import ProductInformation from './utils/ProductInformation';
import ProductPricing from './utils/ProductPricing';
// import { fetchColors } from '../../Middlewares/data/colorsapi';
import { getProductById, getAllMedia, getAttributesforProduct, getAllAttributes }from '../../Utils/service';
//  getAttributesbyCategory, updateProduct, updateProductAttributes, getAllCategories, fetchCategoryById, getAllMedia, addMedia, deleteMedia, uploadImageToStorage, getAttributesforProduct, getAllAttributes } from '../../Utils/service';

function EditProduct({ productId }) {
  const { slug } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [screen, setScreen] = useState('details');

  useEffect(() => {
    const fetchProductDetails = async () => {
          const intProductId = parseInt(slug, 10);
          console.log('Fetching product details for productId:', intProductId);
          
          const productData = await getProductById(intProductId);
          console.log('Fetched product data:', productData);
          
          if (productData.success) {
            setProductInfo(productData.data);
            // setUpdatedProduct(productData.data);
            
            const attributesData = await getAttributesforProduct(productData.data.id);
            console.log('Fetched attributes data:', attributesData);
            
            const allAttributes = await getAllAttributes();
            if(allAttributes.success) {
              console.log("All Attributes: ", allAttributes.data);
              const productAttr = allAttributes.data.filter((a) => Number(productData.data.categoryId) === Number(a.categoryId));
              
              const attributeMap = {};
              productAttr.forEach(attr => {
                const matchingAttr = attributesData.data.find(a => a.attributeId === attr.id);
                if (matchingAttr) {
                  attributeMap[attr.name] = matchingAttr.value;
                }
              });
              
            //   setAllAttr(attributeMap);
              console.log("Attribute Map: ", attributeMap);
            }
            
            // if (attributesData.success) {
            //   setAttributes(attributesData.data);
            //   setUpdatedAttributes(attributesData.data);
            // }
    
            // const categoryData = await fetchCategoryById(productData.data.categoryId);
            // console.log('Fetched category data:', categoryData);
            
            // if (categoryData.success) {
            //   setSelectedCategory(categoryData.data.id);
            // }
            
            // const allCategories = await getAllCategories();
            // console.log('Fetched all categories:', allCategories);
            
            // if (allCategories.success) {
            //   setCategories(allCategories.data);
            // }
    
            const mediaData = await getAllMedia();
            console.log('Fetched media data:', mediaData);
            
            if (mediaData.success) {
              const productImage = mediaData.data.find(media => media.productId === intProductId);
              console.log('Found product image:', productImage);
              
              if (productImage) {
                setImage(productImage);
              }
            }
          }
        };
    
        fetchProductDetails();
      }, [productId]);
    

  const handleColorNext = (data) => {
    setSelectedColor(data);
  };

  const handleNext = (data) => {
    console.log('Product Info:', data);
    setProductInfo(data);
    setScreen('pricing');
  };

  const handlePricingNext = (data) => {
    setPricing(data);
    setScreen('image');
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600 pl-5">EDIT PRODUCT</h1>
      <div className="w-full flex flex-col gap-6 pl-5 pr-4 pb-5">
        {screen === 'details' && (
          <div className='bg-white rounded-lg'>
            <ProductInformation productInfo={productInfo} setProductInfo={setProductInfo} onNext={handleNext} />
          </div>
        )}
        {screen === 'pricing' && (
          <div className='bg-white rounded-lg'>
            <ProductPricing productId={productInfo.id} categoryId={productInfo.categoryId} onNext={handlePricingNext} />
          </div>
        )}
        {screen === 'image' && (
          <div className='bg-white rounded-lg'>
            <ImageDropZone setImage={setImage} productInfo={productInfo} pricing={pricing} colors={colors} nextColor={handleColorNext} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProduct;
