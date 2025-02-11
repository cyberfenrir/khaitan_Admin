import { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('#000000');

  return (
    <ProductContext.Provider
      value={{
        productInfo,
        setProductInfo,
        pricing,
        setPricing,
        image,
        setImage,
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};