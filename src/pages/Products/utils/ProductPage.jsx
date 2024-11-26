import ProductTable from './ProductTable';

const products = [
    {
      id: 1,
      name: "Black T-shirt",
      sizes: "S , M , L , Xl",
      price: "$80.00",
      stock: { left: "486 Item", sold: "155 Sold" },
      category: "Fashion",
      rating: { score: "4.5", reviews: "55 Review" },
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7fd0e71825c4aafc1f3902c076a18efbe30e21caa18f09a8a3b2806fd5e1708?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    },
    // Add more products as needed
];

const ProductPage = () => {
  return (
    <div className="p-6">
      <ProductTable productsList={products} />
    </div>
  );
};

export default ProductPage;