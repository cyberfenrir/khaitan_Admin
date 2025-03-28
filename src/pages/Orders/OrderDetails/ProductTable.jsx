// import { useEffect } from "react";

// function ProductTable( { productsArray } ) {

//   const products = productsArray;

//   // useEffect(() => {
//   //   console.log(products);
//   // }, []);

//   return (
//     <section className="flex flex-col gap-6 pb-6 mt-6 w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
//       <h2 className="px-6 pt-5 pb-5 w-full text-base font-semibold leading-4 whitespace-nowrap border-b border-solid border-b-slate-200 text-slate-700 max-md:px-5 max-md:max-w-full">
//         Product
//       </h2>
//       <div className="flex overflow-hidden flex-col mt-6 w-full max-md:max-w-full">
//         <div className="overflow-x-auto">
//           <div className="min-w-[1080px]">
//             <div className="flex flex-col w-full text-sm font-bold leading-5 bg-gray-50 border-b border-solid border-b-slate-200 min-h-[49px] text-slate-500 max-md:max-w-full">
//               <div className="flex flex-wrap justify-center items-center w-full min-h-[49px] max-md:max-w-full">
//                 <div className="self-stretch p-3.5 my-auto border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] w-[425px] max-md:max-w-full">
//                   Product Name
//                 </div>
//                 {/* <div className="self-stretch py-3.5 pr-3.5 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[182px]">
//                   Status
//                 </div> */}
//                 <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[135px]">
//                   Quantity
//                 </div>
//                 <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[127px]">
//                   Price
//                 </div>
//                 <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[101px]">
//                   Amount
//                 </div>
//                 {/* <div className="self-stretch py-3.5 pr-3.5 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[127px]">
//                   Amount
//                 </div> */}
//               </div>
//             </div>
//             <div className="flex flex-col justify-center w-full h-[336px] max-md:max-w-full">
//               {products.map((product, index) => (
//                 <div key={index} className="flex flex-wrap justify-center items-center w-full min-h-[84px] max-md:max-w-full">
//                   <div className="flex gap-3 self-stretch py-3.5 pr-20 pl-3.5 my-auto border-b border-solid border-b-slate-200 min-w-[240px] w-[425px] max-md:pr-5 max-md:max-w-full">
//                     <div className="flex justify-center items-center w-14 h-14 rounded-xl bg-slate-100 min-h-[56px]">
//                       <img loading="lazy" src={product.image} alt={product.title} className="object-contain my-auto w-14 aspect-square" />
//                     </div>
//                     <div className="flex flex-col self-start">
//                       <div className="text-base leading-6 text-slate-700">{product.title}</div>
//                       {/* <div className="self-start mt-3 text-sm leading-5 text-slate-500">Size : {product.size}</div> */}
//                     </div>
//                   </div>
//                   {/* <div className="flex flex-col justify-center items-start self-stretch py-8 pr-3.5 pl-3.5 my-auto text-sm font-bold leading-3 text-center whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] w-[182px]">
//                     <div className={`px-3 py-1.5 rounded ${product.status === 'Ready' ? 'bg-emerald-100 text-green-500' : 'bg-slate-100 text-slate-700'}`}>
//                       {product.status}
//                     </div>
//                   </div> */}
//                   <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[135px]">
//                     {product.order_products.quantity}
//                   </div>
//                   <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[127px]">
//                     {product.price}
//                   </div>
//                   <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[101px]">
//                     {product.price * product.order_products.quantity}
//                   </div>
//                   {/* <div className="self-stretch py-8 pr-3.5 pl-3.5 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[127px]">
//                     {product.amount}
//                   </div> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductTable;

import React from 'react';

function ProductTable({ productsArray }) {
  const calculateTotal = (price, quantity) => (price * quantity).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-sm">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsArray.map((product, index) => (
              <tr 
                key={index} 
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4 flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <span className="font-medium text-gray-800">
                    {product.title}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-gray-600">
                  {product.order_products.quantity}
                </td>
                <td className="px-4 py-4 text-center text-gray-600">
                  ₹{product.price.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-center font-semibold text-gray-800">
                  ₹{calculateTotal(product.price, product.order_products.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productsArray.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          No products available
        </div>
      )}
    </div>
  );
}

export default ProductTable;