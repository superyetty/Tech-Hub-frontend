import React from "react";
import ProductCard from "./ProductCard";
import { useUser } from "../../../components/context/UserProvider";
import { useNavigate } from "react-router-dom";

const ThisMonth = () => {
  const navigate = useNavigate();
  const { products, isFetching } = useUser();
  return (
    <div className="flex flex-col gap-y-30">
      <div className="">
        <div className="flex flex-col gap-y-6 mb-15">
          <div className="flex items-center gap-x-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
            <p className="text-[#DB4444] font-bold">This Month</p>
          </div>
          <div className="flex justify-between items-center end gap-x-22  h-15">
            <p className="text-3xl font-semibold ">Best Selling Products</p>
            <div className="h-12 w-29  flex bg-[#DB4444] text-white justify-center rounded-sm cursor-pointer">
              <button
                onClick={() => navigate("/best-selling-products")}
                className="cursor-pointer w-full "
              >
                View All
              </button>
            </div>
          </div>
        </div>
        <div>
          {isFetching ? (
            <p>Loading Products ...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 ">
              {products.map((product, i) => {
                if (i < 4) {
                  return (
                    <ProductCard
                      key={i}
                      image={product.image}
                      name={product.name}
                      currentPrice={product.priceCents}
                      previousPrice={product.previousPrice}
                      stars={product.rating.stars}
                      counts={product.rating.counts}
                      discount={product.discount}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 ">
          {products.map((product, i) => {
            return (
              <ProductCard
                key={i}
                image={product.image}
                name={product.name}
                currentPrice={product.currentPrice}
                previousPrice={product.previousPrice}
                stars={product.rating.stars}
                counts={product.rating.counts}
                discount={product.discount}
              />
            );
          })}
        </div> */}
      </div>
      <div className="bg-black text-white flex justify-between items-center px-14 h-120 cursor-pointer">
        <div className="flex flex-col gap-y-8">
          <p className="mb- 8 text-[#00FF66]">Categories</p>
          <p className="text-5xl leading-14 w-130 font-semibold mb- 8">
            Enhance Your Music Experience
          </p>
          <div className="flex items-center gap-x-6 text-black">
            <div className="flex flex-col items-center justify-center rounded-full bg-white w-14 h-14 border ">
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold">23</p>
                <p className="text-[10px] font-semibold">Hours</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-full bg-white w-14 h-14 border ">
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold">05</p>
                <p className="text-[10px] font-semibold">Days</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-full bg-white w-14 h-14 border ">
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold">59</p>
                <p className="text-[10px] font-semibold">Minutes</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-full bg-white w-14 h-14 border ">
              <div className="flex flex-col items-center">
                <p className="text-sm font-bold">35</p>
                <p className="text-[10px] font-semibold">Seconds</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-green-500 w-43 h-14 rounded-sm borde">
            <button className="text-white cursor-pointe">Buy Now!</button>
          </div>
        </div>
        <div className="flex items-center">
          <img src="/this-month/jbl-boombox.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ThisMonth;
