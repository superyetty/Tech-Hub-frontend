import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useUser } from "../../components/context/UserProvider";

const CartCard = ({
  cartId,
  cartItemId,
  productId,
  image,
  name,
  priceCents,
  quantity: initialQuantity,
}) => {
  const { updateCart, deleteCartItem } = useUser();
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleCartItemDelete = async () => {
    try {
      const result = await deleteCartItem(cartId, cartItemId);
      if (result.success) {
        console.log("Cart item deleted successfully");
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
  };

  const quantityIncrease = async () => {
    const previuosQuantity = quantity; //qty coming from database if there's any

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    try {
      const result = await updateCart(cartId, productId, newQuantity);
      if (!result?.success) {
        setQuantity(previuosQuantity);
      }
    } catch (err) {
      setQuantity(quantity);
      console.log("An error occured.");
    }
  };

  const quantityDecrease = async () => {
    const previuosQuantity = quantity; //qty coming from database if there's any

    if (quantity <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    
    try {
      const result = await updateCart(cartId, productId, newQuantity);
      if (!result?.success) {
        setQuantity(previuosQuantity);
      }
    } catch (err) {
      setQuantity(quantity);
      console.log("An error occured.");
    }
  };

  const cartItemTotalPrice = quantity * priceCents;

  return (
    <div className="grid grid-cols-4 items-center p-5">
      <div className="flex items-center gap-x-5">
        <div className="h-13 w-13 relative">
          <img src={image} alt="product" className="w-full h-full rounded" />
          <MdCancel
            onClick={handleCartItemDelete}
            size={20}
            className="text-red-500 absolute -top-3 -right-3 cursor-pointer"
          />
        </div>
        <p>{name}</p>
      </div>
      <div className="flex justify-center">
        <p>{priceCents}</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-17 h-10 flex justify-center items-center border-2 border-gray-400 rounded">
          <div className="h-8 flex justify-center items-center gap-x-4">
            <p>{quantity}</p>
            <div className="h-full w-fit">
              <div onClick={quantityIncrease} className="w-4 cursor-pointer">
                <img
                  src="/contacts-icons/icon-drop-up-small.svg"
                  alt=""
                  className=""
                />
              </div>
              <div onClick={quantityDecrease} className="w-4 cursor-pointer">
                <img
                  src="/contacts-icons/icon-drop-down-small.svg"
                  alt=""
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <p>{cartItemTotalPrice}</p>
      </div>
    </div>
  );
};

export default CartCard;
