import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const ProductCard = ({
  image,
  name,
  currentPrice,
  previousPrice,
  stars,
  counts,
  discount,
}) => {
  const ratingImage = `/ratings/rating-${stars * 10}.png`;
  return (
    <div className="h-87">
      <div className="relative flex justify-center items-center bg-gray-200 mb-4 h-60 rounded-t-sm  cursor-pointer">
        <div className="w-45 h-35 flex justify-center items-center">
          <img src={image} alt="" className="h-full w-full" />
        </div>
        <div className="absolute top-4 right-4">
          <FaRegHeart className="mb-3" />
          <IoEyeOutline />
        </div>
      </div>

      <div className="">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold cursor-pointer w-fit">{name}</p>
          <div className="flex items-center gap-x-3">
            <p className="text-[#DB4444] text-sm font-semibold cursor-pointer">
              ${currentPrice}
            </p>
            <p className="text-sm text-gray-400 font-semibold line-through cursor-pointer">
              ${previousPrice}
            </p>
          </div>
          <div className="flex gap-x-2 w-fit cursor-pointer">
            <div className="">
              <img src={ratingImage} alt="" className="w-25 borde" />
            </div>
            <p className="text-gray-400 font-semibold text-sm">{counts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
