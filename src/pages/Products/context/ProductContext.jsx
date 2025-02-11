import { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productInfo, setProductInfo] = useState({});
  const [pricing, setPricing] = useState({});
  const [imageData, setImageData] = useState({ filePath: '', imageType: '' });
  const [selectedColor, setSelectedColor] = useState('#000000');

  return (
    <ProductContext.Provider
      value={{
        productInfo,
        setProductInfo,
        pricing,
        setPricing,
        imageData,
        setImageData,
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};