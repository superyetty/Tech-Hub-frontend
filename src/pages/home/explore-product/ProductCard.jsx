import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const ProductCard = ({
  image,
  name,
  currentPrice,
  previousPrice,
  stars,
  counts,
  status,
  colors = [],
}) => {
  const ratingImage = `/ratings/rating-${stars * 10}.png`;
  const [selectedColor, setSelectedColor] = useState(
    Array.isArray(colors) && colors.length > 0 ? colors[0] : null,
  );
  const hasColors = Array.isArray(colors) && colors.length > 0;

  const getColorStyle = (color) => {
    return color ? { backgroundColor: color } : {};
  };

  return (
    <div className="h-87 ">
      <div className="relative flex justify-center items-center bg-gray-200 mb-4 h-60 rounded-t-md ">
        <div className="w-45 h-45 flex justify-center items-center  ">
          <div className="relative w-full h-full isolaton-isolate cursor-pointer">
            <img src={image} alt="" className="h-full w-full rounded" />
            {selectedColor && (
              <div
                className="absolute top-0 bottom-0 left-5 right-5 inset- 0 mix-blend-multiply opacity-90  "
                style={getColorStyle(selectedColor)}
              />
            )}
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <FaRegHeart className="mb-3 cursor-pointer" />
          <IoEyeOutline className="cursor-pointer" />
        </div>
        {status ? (
          <p className="absolute top-2 left-3 bg-[#00FF66] text-[11px] text-white px-2 py-0.5 rounded-sm">
            {status}
          </p>
        ) : (
          ""
        )}
      </div>

      <div className="">
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold cursor-pointer w-fit">{name}</p>

          <div className="flex items-center gap-x-2 cursor-pointer w-fit ">
            <p className="text-[#DB4444] text-sm font-semibold w-fit cursor-pointer">
              ${currentPrice}
            </p>
            <div className="">
              <img src={ratingImage} alt="" className="w-20 " />
            </div>
            <p className="text-gray-400 font-semibold text-sm">({counts})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
