import { PiShoppingCartThin } from "react-icons/pi";
import { useUser } from "../../components/context/UserProvider";

const WishListCard = ({
  product,
  image,
  name,
  currentPrice,
  previousPrice,
  discount,
}) => {
  const { addToCart, deleteWishlist, fetchWishlist, isFetching } = useUser();

  const handleAddToCart = async () => {
    const productId = product?._id || product?.id;
    const addResult = await addToCart(product);

    if (!addResult?.success) {
      return;
    }

    await deleteWishlist(productId);
  };

  const handleDelete = () => {
    const productId = product?._id || product?.id;
    deleteWishlist(productId);
    // fetchWishlist()

  };

  return (
    <div className="h-87">
      <div className="flex flex-col mb-4 rounded h-67">
        <div className="relative flex justify-center items-center bg-gray-200 h-60 rounded  cursor-pointer">
          <div className="w-45 h-35 flex justify-center items-center  my-7 mx-8  ">
            <img src={image} alt="" className="h-full w-full" />
          </div>
          <div onClick={handleDelete} className="absolute top-4 right-4 w-5 border ">
            <img src="contacts-icons/icon-delete.svg" alt="" className="" />
          </div>
          {discount && (
            <p className="absolute top-4 left-4  bg-[#DB4444] text-[11px] text-white px-4 py-0.5 rounded-sm">
              {discount}
            </p>
          )}
        </div>
        <div
          onClick={handleAddToCart}
          className="flex justify-center items-center gap-x-2 h-9 bg-black text-white rounded-b cursor-pointer border"
        >
          <PiShoppingCartThin />
          <button className="text-[12px] cursor-pointer">Add To Cart</button>
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
              {previousPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;
