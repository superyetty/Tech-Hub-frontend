import React, { useMemo } from "react";
import { useUser } from "../../../../components/context/UserProvider";
import ProductCard from "../SharedProductCard";
import Header from "../../../../components/Header";

const BestSelling = () => {
  const { products, isFetching } = useUser();

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) {
      return [];
    }

    return products.filter((product) => product.category.includes("Clothing"));
  }, [products]);

  if (isFetching) {
    return <div>Loading best selling products...</div>;
  }
  return (
    <div className="w-full max-w-300 mx-auto space-y-10">
      <Header/>
      <p className="text-4xl font-medium">Best Selling Products</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5  ">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product._id || product.id}
              product={product}
              image={product.image}
              currentPrice={product.priceCents}
              name={product.name}
              stars={product.rating.stars}
              counts={product.rating.counts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSelling;
