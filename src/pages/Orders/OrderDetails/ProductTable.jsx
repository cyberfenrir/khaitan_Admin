function ProductTable() {
  const products = [
    {
      name: 'Men Black Slim Fit T-shirt',
      size: 'M',
      status: 'Ready',
      quantity: 1,
      price: '$80.00',
      tax: '$3.00',
      amount: '$83.00',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cffd0e4a04fe7036d7a6fa2e2496175824d0864285d08330223ea213f8ad9d17?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
    },
    {
      name: 'Dark Green Cargo Pent',
      size: 'M',
      status: 'Packaging',
      quantity: 3,
      price: '$330.00',
      tax: '$4.00',
      amount: '$334.00',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3fca359905368cec767dc4fc845a02cc77e21f7f08b7e6b867f5f737a77747ad?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
    },
    {
      name: 'Men Dark Brown Wallet',
      size: 'S',
      status: 'Ready',
      quantity: 1,
      price: '$132.00',
      tax: '$5.00',
      amount: '$137.00',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/47434b6ad6a50e051dff7cc8622aafc7cd6a761e357c7ff3fdc95d593d902f1c?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
    },
    {
      name: "Kid's Yellow T-shirt",
      size: 'S',
      status: 'Packaging',
      quantity: 2,
      price: '$220.00',
      tax: '$3.00',
      amount: '$223.00',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6ea221ca7b610df3241a8f50403b0bc67a1a08afad9d10330627ee7dc4e06069?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9'
    }
  ];

  return (
    <section className="flex flex-col gap-6 pb-6 mt-6 w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
      <h2 className="px-6 pt-5 pb-5 w-full text-base font-semibold leading-4 whitespace-nowrap border-b border-solid border-b-slate-200 text-slate-700 max-md:px-5 max-md:max-w-full">
        Product
      </h2>
      <div className="flex overflow-hidden flex-col mt-6 w-full max-md:max-w-full">
        <div className="overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="flex flex-col w-full text-sm font-bold leading-5 bg-gray-50 border-b border-solid border-b-slate-200 min-h-[49px] text-slate-500 max-md:max-w-full">
              <div className="flex flex-wrap justify-center items-center w-full min-h-[49px] max-md:max-w-full">
                <div className="self-stretch p-3.5 my-auto border-b border-solid border-b-slate-200 min-h-[49px] min-w-[240px] w-[425px] max-md:max-w-full">
                  Product Name & Size
                </div>
                <div className="self-stretch py-3.5 pr-3.5 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[182px]">
                  Status
                </div>
                <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[135px]">
                  Quantity
                </div>
                <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[127px]">
                  Price
                </div>
                <div className="self-stretch p-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[101px]">
                  Amount
                </div>
                {/* <div className="self-stretch py-3.5 pr-3.5 pl-3.5 my-auto whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[49px] w-[127px]">
                  Amount
                </div> */}
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[336px] max-md:max-w-full">
              {products.map((product, index) => (
                <div key={index} className="flex flex-wrap justify-center items-center w-full min-h-[84px] max-md:max-w-full">
                  <div className="flex gap-3 self-stretch py-3.5 pr-20 pl-3.5 my-auto border-b border-solid border-b-slate-200 min-w-[240px] w-[425px] max-md:pr-5 max-md:max-w-full">
                    <div className="flex justify-center items-center w-14 h-14 rounded-xl bg-slate-100 min-h-[56px]">
                      <img loading="lazy" src={product.image} alt={product.name} className="object-contain self-stretch my-auto w-14 aspect-square" />
                    </div>
                    <div className="flex flex-col self-start">
                      <div className="text-base leading-6 text-slate-700">{product.name}</div>
                      <div className="self-start mt-3 text-sm leading-5 text-slate-500">Size : {product.size}</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-start self-stretch py-8 pr-3.5 pl-3.5 my-auto text-sm font-bold leading-3 text-center whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] w-[182px]">
                    <div className={`px-3 py-1.5 rounded ${product.status === 'Ready' ? 'bg-emerald-100 text-green-500' : 'bg-slate-100 text-slate-700'}`}>
                      {product.status}
                    </div>
                  </div>
                  <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[135px]">
                    {product.quantity}
                  </div>
                  <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[127px]">
                    {product.price}
                  </div>
                  <div className="self-stretch px-3.5 py-8 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[101px]">
                    {product.tax}
                  </div>
                  {/* <div className="self-stretch py-8 pr-3.5 pl-3.5 my-auto text-sm leading-5 whitespace-nowrap border-b border-solid border-b-slate-200 min-h-[84px] text-slate-500 w-[127px]">
                    {product.amount}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductTable;