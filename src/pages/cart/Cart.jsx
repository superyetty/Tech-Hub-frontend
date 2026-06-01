// import React from "react";
import CartCard from "./CartCard";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserProvider";

const Cart = () => {
  const navigate = useNavigate();
  const { carts, deleteCartById, addToCheckout } = useUser();

  const cartItems = carts.flatMap((cart) => cart?.items || []);

  const handleCheckout = () => {
    const cartId = carts[0]?._id;
    if (!cartId ) return;
    navigate("/user/checkout");
  };

  const handleCartDeleteButton = async () => {
    const cartId = carts[0]?._id;

    const result = await deleteCartById(cartId);
    if (!result.success) {
      console.log("Cart not deleted successfully.");
    }
    if (result.success) {
      console.log("Cart deleted");
      navigate("/user/dashboard");
    }
  };

  const subtotal = carts[0]?.subtotal ?? cartItems.reduce((sum, item) => {
    return sum + (item?.product?.priceCents * item.quantity || 0);
  }, 0);

  const shipping = carts[0]?.shipping ?? 0;

  const total = subtotal + shipping;

  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-10">
      <AuthHeader />
      <div className="flex flex-col gap-y-20 mx-10 ">
        <div className="flex items-center gap-x-3 ">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="text-sm cursor-pointer"
          >
            Home
          </p>
          <span className="text-gray-400">/</span>
          <p className="text-sm cursor-pointer">Cart</p>
        </div>

        <div className="flex flex-col gap-y-6 ">
          <div className="flex flex-col justify-center gap-y-10 ">
            <div className=" flex flex-col justify-center h-13">
              <div className="grid grid-cols-4 mx-10">
                <p className="h-full ">Product</p>
                <p className="h-full text-center">Price</p>
                <p className="h-full text-center">Quantity</p>
                <p className="h-full text-end">Subtotal</p>
              </div>
            </div>

            <div className="mb-10">
              {carts.map((cart) =>
                cart?.items?.map((item) => (
                  <CartCard
                    key={item._id}
                    cartId={cart._id}
                    cartItemId={item._id}
                    productId={item?.product?._id}
                    image={item?.product?.image}
                    name={item?.product?.name}
                    priceCents={item?.product?.priceCents}
                    quantity={item.quantity}
                  />
                )),
              )}
            </div>
          </div>
          <div className="flex justify-between h-14 ">
            <button
              onClick={() => {
                navigate("/user/dashboard");
              }}
              className="w-50 border border-gray-400 rounded cursor-pointer"
            >
              Return To Shop
            </button>
            <button
              onClick={handleCartDeleteButton}
              className="w-50 border border-gray-400 rounded cursor-pointer"
            >
              Delete Cart
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-x-4 w-fit h-14">
            <div className="flex items-center h-full w-75">
              <input
                type="text"
                placeholder="Coupon Code"
                className="border border-gray-400 rounded pl-6 outline-0 h-full w-full text- sm"
              />
            </div>
            <button className="h-full w-52 bg-[#DB4444] text-sm text-white text-center rounded border cursor-pointer">
              Apply Coupon
            </button>
          </div>
          <div className="flex flex-col gap-y-4 w-118 px-6 py-8 border-2 border-gray-300 rounded">
            <p className="text-lg font-semibold">Cart Total</p>
            <div className="flex flex-col gap-y-8">
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <p>Subtotal:</p>
                <p>${subtotal}</p>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-4">
                <p>Shipping:</p>
                <p>{shipping === 0 ? "FREE" : shipping}</p>
              </div>
              <div className="flex justify-between ">
                <p>Total:</p>
                <p>${total}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={handleCheckout}
                className="bg-[#DB4444] text-center h-14 w-60 rounded text-white cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
