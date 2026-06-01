import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../components/context/UserProvider";
import ProductCard from "../home/explore-product/ProductCard";
import Header from "../../components/Header";

const AllProducts = () => {
  const { products } = useUser();
  const [searchParams] = useSearchParams();
  const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }

    return products.filter((product) => {
      const productName = String(product?.name || "").toLowerCase();
      const productCategory = Array.isArray(product?.category)
        ? product.category
        : [];

      return (
        productName.includes(searchTerm) ||
        productCategory.some((category) =>
          String(category).toLowerCase().includes(searchTerm),
        )
      );
    });
  }, [products, searchTerm]);

  return (
    <div className="w-full max-w-300 mx-auto space-y-10">
      <Header />
      {searchTerm ? (
        <p className="text-sm text-gray-600">Showing results for: {searchTerm}</p>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product?._id || product?.id || product?.name}
              image={product.image}
              name={product.name}
              status={product.status}
              currentPrice={product.priceCents}
              stars={product.rating.stars}
              counts={product.rating.counts}
            />
          );
        })}
      </div>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 pb-10">No products matched your search.</p>
      ) : null}
    </div>
  );
};

export default AllProducts;
