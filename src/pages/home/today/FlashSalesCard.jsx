import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const FlashSalesCard = ({
  product,
  productId,
  image,
  name,
  currentPrice,
  previousPrice,
  stars,
  counts,
  discount,
  addWishlist,
}) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    if (!productId) {
      console.warn("Product ID is missing");
      return;
    }
    navigate(`/user/product/${productId}`);
  };

  const handleAddToWishlishList = (product) => {
    addWishlist(product);
  };

  const ratingImage = `/ratings/rating-${stars * 10}.png`;
  return (
    <div className="">
      <div className="relative flex justify-center items-center bg-gray-200 mb-4 h-42 rounded-t-sm cursor-pointer">
        <div className="w-45 h-30  flex justify-center items-center  my-7 mx-8 ">
          <img src={image} alt="" className="h-full w-25 " />
        </div>
        <div className="absolute top-4 right-4">
          <FaRegHeart
            onClick={() => {
              addWishlist(product);
            }}
            className="mb-3 border"
          />
          <IoEyeOutline
            onClick={handleViewProduct}
            className="cursor-pointer"
          />
        </div>
        <p className="absolute top-2 left-3 bg-[#DB4444] text-[11px] text-white px-2 py-0.5 rounded-sm">
          -{discount}%
        </p>
      </div>

      <div className="">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold cursor-pointer w-fit ">{name}</p>
          <div className="flex items-center ">
            <p className="text-[#DB4444] text-sm font-semibold cursor-pointer ">
              ${currentPrice}
            </p>
            <p className="text-sm text-gray-400 font-semibold line-through ml-3 cursor-pointer">
              ${previousPrice}
            </p>
          </div>
          <div className="flex gap-x-2 w-fit cursor-pointer">
            <div className="">
              <img src={ratingImage} alt="" className="w-25 borde" />
            </div>
            <p className="text-gray-400 font-semibold text-sm">({counts})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalesCard;
