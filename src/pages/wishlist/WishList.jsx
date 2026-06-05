import React, { useState } from "react";
import AuthHeader from "../../components/auth-header/AuthHeader";
import WishListCard from "./WishListCard";
import Footer from "../../components/Footer";
import ForYouCard from "./ForYouCard";
import { useUser } from "../../components/context/UserProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const navigate = useNavigate();
  const { products, wishlists, addToCart, deleteWishlist, isFetching } =
    useUser();
  const [isMovingAll, setIsMovingAll] = useState(false);

  const moveAllToBagButton = async () => {
    if (wishlists.length === 0 || isMovingAll) {
      return;
    }

    setIsMovingAll(true);

    try {
      for (const product of wishlists) {
        const addResult = await addToCart(product);

        if (!addResult?.success) {
          continue;
        }

        const productId = product?._id || product?.id;
        if (productId) {
          await deleteWishlist(productId);
        }
      }
    } finally {
      setIsMovingAll(false);
    }
  };

  const disableMoveAllButton =
    isFetching || isMovingAll || wishlists.length === 0;

  return (
    <div className="w-full max-w-300 mx-auto ">
      <AuthHeader />
      <div>
        <div className="flex flex-col gap-y-10 mt-10 mb-20">
          <div className="flex justify-between items-center  h-15">
            <p>Wishlist ({wishlists.length})</p>
            <div className="h-12 w-45 flex justify-center items-center border border-gray-400 rounded">
              <button
                onClick={moveAllToBagButton}
                disabled={disableMoveAllButton}
                className="font-semibold w-full h-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isMovingAll ? "Moving..." : "Move All To Bag"}
              </button>
            </div>
          </div>
          {wishlists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
              {wishlists.map((product) => {
                return (
                  <WishListCard
                    product={product}
                    key={product.wishlistId || product._id}
                    image={product.image}
                    name={product.name}
                    currentPrice={product.priceCents}
                  />
                );
              })}
            </div>
          ) : (
            <p>No wishlisted products yet.</p>
          )}
        </div>
        <div className="flex flex-col gap-y-10 mt-10">
          <div className="flex justify-between items-center h-15 ">
            <div className="flex items-center gap-x-4">
              <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
              <p className="font-semibold">Just For You</p>
            </div>
            <div className="h-12 w-37 flex justify-center items-center border border-gray-400 rounded">
              <button
                onClick={() => navigate("/products")}
                className="font-semibold w-full h-full cursor-pointer"
              >
                See All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
            {products.slice(0, 4).map((product, i) => {
              return (
                <ForYouCard
                  key={i}
                  image={product.image}
                  name={product.name}
                  currentPrice={product.priceCents ?? 0}
                  previousPrice={product.previousPrice}
                  discount={product?.discount || 0}
                  stars={product.rating.stars}
                  counts={product.rating.counts}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
