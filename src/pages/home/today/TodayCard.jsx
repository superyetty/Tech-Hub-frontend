import { useState } from "react";
import { useUser } from "../../../components/context/UserProvider";
import FlashSalesCard from "./FlashSalesCard";

const PRODUCTS_PER_SLIDE = 5;

const TodayCard = ({ index }) => {
  const { products, isFetching, addWishlist } = useUser();
  const [, setIsLoading] = useState(false);
  
  const productSlides = [];

  for (let i = 0; i < products.length; i += PRODUCTS_PER_SLIDE) {
    productSlides.push(products.slice(i, i + PRODUCTS_PER_SLIDE));
  }

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <div className="h-full w-full overflow-hidden ">
        { productSlides.length === 0 ? (
          <p className="py-8 text-center">No products available right now.</p>
        ) : (
          <div
            className="flex w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {productSlides.map((slide, slideIndex) => {
              return (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                  {slide.map((product, productIndex) => (
                    <FlashSalesCard
                      key={`${slideIndex}-${product._id || product.slug || productIndex}`}
                      productId={product._id || product.slug}
                      product={product}
                      image={product.image}
                      name={product.name}
                      currentPrice={product.priceCents}
                      previousPrice={product.previousPrice}
                      stars={product.rating?.stars || 0}
                      counts={product.rating?.counts || 0}
                      discount={product.discount || 0}
                      addWishlist={addWishlist}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="">
        <p className="py-4 px-12 bg-[#DB4444] text-white font-semibold rounded-sm cursor-pointer">
          View All Products
        </p>
      </div>
    </div>
  );
};

export default TodayCard;
