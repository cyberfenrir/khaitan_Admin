import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './context/ProductContext';
import ImageDropZone from './utils/ImageDropZone';

function ProductImagePage() {
  const { image, setImage, selectedColor, setSelectedColor } = useContext(ProductContext);
  const { product_id } = useParams();

  const handleSubmit = () => {
    const productData = {
      image,
      color: selectedColor,
      // Include other product data from state or context
    };

    // Send productData to the API
    console.log(productData);
    // Example: axios.post('/api/products', productData);
  };

  return (
    <div className="flex flex-col p-1">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Image</h1>
      <ImageDropZone setImage={setImage} />
      <div className="mt-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-12 h-8 p-0 border rounded cursor-pointer"
          />
          <span className="text-sm text-gray-600">{selectedColor}</span>
          <div
            className="w-12 h-8 border rounded"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
      </div>
      <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </div>
  );
}

export default ProductImagePage;




//uncomment after apis are ready

// import { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ProductContext } from './context/ProductContext';
// import ImageDropZone from './utils/ImageDropZone';
// import { fetchColors } from '../../utils/apiMiddleware';

// function ProductImagePage() {
//   const { image, setImage, selectedColor, setSelectedColor } = useContext(ProductContext);
//   const { product_id } = useParams();
//   const [colors, setColors] = useState([]);

//   useEffect(() => {
//     const getColors = async () => {
//       try {
//         const colorsData = await fetchColors();
//         setColors(colorsData);
//       } catch (error) {
//         console.error('Failed to fetch colors:', error);
//       }
//     };

//     getColors();
//   }, []);

//   const handleSubmit = () => {
//     const productData = {
//       image,
//       color: selectedColor,
//       // Include other product data from state or context
//     };

//     // Send productData to the API
//     console.log(productData);
//     // Example: axios.post('/api/products', productData);
//   };

//   return (
//     <div className="flex flex-col p-1">
//       <h1 className="text-2xl font-bold mb-4 text-slate-600">Product Image</h1>
//       <ImageDropZone setImage={setImage} />
//       <div className="mt-4">
//         <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
//           Color
//         </label>
//         <div className="flex items-center gap-3">
//           <select
//             id="color"
//             value={selectedColor}
//             onChange={(e) => setSelectedColor(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value="" disabled>Select a color</option>
//             {colors.map((color) => (
//               <option key={color.id} value={color.hexCode}>
//                 {color.name}
//               </option>
//             ))}
//           </select>
//           <div
//             className="w-12 h-8 border rounded"
//             style={{ backgroundColor: selectedColor }}
//           ></div>
//         </div>
//       </div>
//       <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded">
//         Submit
//       </button>
//     </div>
//   );
// }

// export default ProductImagePage;