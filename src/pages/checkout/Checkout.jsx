import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import { useUser } from "../../components/context/UserProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { addToCheckout, carts, isFetching } = useUser();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      company: "",
      address: "",
      apartment: "",
      city: "",
      phoneNumber: "",
      email: "",
    },
  });
  const { errors } = formState;

  const onSubmit = async (form) => {
    const cartId = carts[0]?._id;
    const billing = {
      firstName: form.firstName,
      company: form.company,
      address: form.address,
      apartment: form.apartment,
      city: form.city,
      phoneNumber: form.phoneNumber,
      email: form.email,
    };
    const result = await addToCheckout({
      cartId,
      billing,
      paymentMethod,
      couponCode,
    });
    if (result.success) {
      navigate(`/user/payment?checkoutId=${result.checkout._id}`);
    } else {
      console.error(result.message);
    }
  };
  const cartItems = carts.flatMap((cart) => cart.items);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceCents * item.quantity,
    0,
  );

  const shipping = carts[0]?.shipping;
  const total = subTotal + shipping;
  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-20">
      <AuthHeader />
      <div className="flex items-center gap-x-3 ">
        <p className="text-sm text-gray-400 cursor-pointer">Account</p>
        <span className="text-gray-400">/</span>
        <p className="text-sm text-gray-400 cursor-pointer">My Account</p>
        <span className="text-gray-400">/</span>
        <p className="text-sm text-gray-400 cursor-pointer">Product</p>
        <span className="text-gray-400">/</span>
        <p className="text-sm text-gray-400 cursor-pointer">View Cart</p>
        <span className="text-gray-400">/</span>
        <p className="text-sm cursor-pointer">Checkout</p>
      </div>

      <div className="flex flex-col gap-y-10">
        <p className="text-[36px] font-semibold">Billing Details</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-44 items-center gap-y-10"
        >
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="firstName" className="text-sm text-gray-400 ">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="h-10 bg-gray-100 outline-0"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="comapny" className="text-sm text-gray-400">
                Company Name
              </label>
              <input
                type="text"
                id="comapny"
                className="h-10 bg-gray-100 outline-0"
                {...register("company")}
              />
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="address" className="text-sm text-gray-400">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                className="h-10 bg-gray-100 outline-0"
                {...register("address", { required: "Street is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="apartment" className="text-sm text-gray-400">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                className="h-10 bg-gray-100 outline-0"
                {...register("apartment")}
              />
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="city" className="text-sm text-gray-400">
                Town/City
              </label>
              <input
                type="text"
                id="city"
                className="h-10 bg-gray-100 outline-0"
                {...register("city", { required: "Town/City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="phoneNumber" className="text-sm text-gray-400">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="h-10 bg-gray-100 outline-0"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-2 ">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="h-10 bg-gray-100 outline-0"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="accent-[#DB4444] hover:accent-[#DB4444] cursor-pointer"
              />
              <p>Save this information for faster check-out next time</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">
            <div>
              {cartItems.map((item) => {
                const itemTotal = item.product.priceCents * item.quantity;
                return (
                  <div key={item._id} 
                  className="flex gap-x-6 items-center w-110 mt-8">
                    <div className="h-15 w-18">
                      <img
                        src={item.product.image}
                        alt=""
                        className="h-full w-full rounded object-cover"
                      />
                    </div>
                    <div className="flex justify-between w-full ">
                      <p>{item.product.name}</p>
                      <p>{`$${itemTotal}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex flex-col gap-y-8 w-110">
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p>Subtotal:</p>
                  <p>{`$${subTotal}`}</p>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-4">
                  <p>Shipping:</p>
                  <p>{shipping === 0 ? "FREE" : `$${shipping}`}</p>
                </div>
                <div className="flex justify-between ">
                  <p>Total:</p>
                  <p>{`$${total}`}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-8 borde">
              <div className="flex flex-col gap-y-8">
                <div className="flex justify-between items-center w-110 h-8 ">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center justify-center cursor-pointer h-6 w-6 rounded-full border border-gray-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="hidden peer"
                        onChange={() => setPaymentMethod("bank")}
                      />
                      <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-[#DB4444]"></div>
                    </label>
                    <p>Bank</p>
                  </div>
                  <div className="flex items-center gap-x-2 h-full ">
                    <div className="h-full w-12  cursor-pointer">
                      <img
                        src="/payment/b-kash.svg"
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                    <div className="h-full w-12 cursor-pointer">
                      <img src="/payment/visa.svg" alt="" className="h-full" />
                    </div>
                    <div className="h-full w-12 cursor-pointer">
                      <img
                        src="/payment/mastercard.svg"
                        alt=""
                        className="h-full"
                      />
                    </div>
                    <div className="h-full w-12 cursor-pointer">
                      <img
                        src="/payment/dubai-card.svg"
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <div>
                    <label className="flex justify-center items-center h-6 w-6 rounded-full border border-gray-300 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="hidden peer"
                        onChange={() => setPaymentMethod("cash_on_delivery")}
                      />
                      <div className="w-4 h-4 border border-gray-400 rounded-full peer-checked:bg-[#DB4444]"></div>
                    </label>
                  </div>
                  <p>Cash on delivery</p>
                </div>
                <div className="flex justify-between h-14">
                  <div className="flex items-center h-full w-70">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border border-gray-400 rounded pl-6 outline-0 h-full w-full text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-14 w-52 text-white flex justify-center items-center rounded bg-[#DB4444] cursor-pointer"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center gap-x-5">
                {isFetching ? (
                  <div className="flex items-center gap-5 h-14 w-52 bg-[#DB4444] text-white rounded cursor-not-allowed">
                    <button
                      type="button"
                      disabled
                      className="h-4 w-4 border-2 border-t-red-200 border-red-500 rounded-full animate-spin "
                    />
                    <span>Processing</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="h-14 w-52 text-white flex justify-center items-center rounded bg-[#DB4444] cursor-pointer"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
