import { FaRegHeart } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { useUser } from "../../components/context/UserProvider";
import { useParams } from "react-router-dom";

const Product = () => {
  const { product, fetchProductById, isFetching } = useUser();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const { id } = useParams();

  const sizes = ["XS", "S", "M", "L", "XL"];
  const handleSizeColor = (size) => {
    return selectedSize === size
      ? "bg-red-500 text-white border-red-500"
      : "border-gray-300";
  };

  const quantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const quantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // useEffect(() => {
  //   if (id) {
  //     fetchProductById(id);
  //   }
  // }, [id, fetchProductById]);

  useEffect(() => {
    let isActive = true;

    setLoadedProductId(null);

    if (id) {
      fetchProductById(id).finally(() => {
        if (isActive) {
          setLoadedProductId(id);
        }
      });
    }

    return () => {
      isActive = false;
    };
  }, [id, fetchProductById]);

  // const [displayProductImage, setDisplayProducImage] = useState(images[0].src);

  // const productImage = (img) => {
  //   return setDisplayProducImage(img.src);
  // };
  // const images = [
  //   { src: "product/gamepad-5.svg" },
  //   { src: "product/gamepad-4.svg" },
  //   { src: "product/gamepad-3.svg" },
  //   { src: "product/gamepad-2.svg" },
  // ];

  if (loadedProductId !== id || (isFetching && product?._id !== id)) {
    return (
      <div className="max-w-300 mx-auto flex flex-col gap-y-10 ">
        <AuthHeader />
        <div className="py-16 text-center">Loading product...</div>
        <Footer />
      </div>
    );
  }

  if (!product?._id || product._id !== id) {
    return (
      <div className="max-w-300 mx-auto flex flex-col gap-y-10 ">
        <AuthHeader />
        <div className="py-16 text-center">Product not found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-10 ">
      <AuthHeader />

      <div key={product._id} className="flex flex-col gap-y-20">
        <div className="flex items-center gap-x-3 mb-11">
          <p className="text-sm cursor-pointer">Account</p>
          <span className="text-gray-400">/</span>
          <p className="text-sm cursor-pointer">Gaming</p>
          <span className="text-gray-400">/</span>
          <p className="text-sm cursor-pointer">{product.name}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr_1fr] gap-15">
          <div className="flex gap-x-8 h-full borde">
            {/* <div className="flex flex-col justify-between w-45 h-full ">
                  {product.image}
                </div> */}
            {/* <div className="flex flex-col justify-between w-45 h-full ">
                  {images.map((img, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          productImage(img);
                        }}
                        className="bg-[#F5F5F5] flex justify-center items-center w-full h-38 cursor-pointer rounded"
                      >
                        <img src={img.src} alt="" />
                      </div>
                    );
                  })}
                </div> */}
            <div className="flex flex-col h-full w- 110 bg-[#F5F5F5] items-center rounded justify-center ">
              <div className="h-full w- 100 ">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full rounded"
                />
                {/* <img src={displayProductImage} alt="" className="w-full" /> */}
              </div>
            </div>
          </div>
          <div className=" w-100 ">
            <p className="text-xl font-semibold mb-4">{product.name}</p>
            {/* <p className="text-xl font-semibold mb-4">
                  Havic HV G-92 Gamepad
                </p> */}
            <div className="flex items-center gap-x-4 h-6 mb-4 ">
              <div className="flex items-center gap-x-2">
                <div className="w-25 ">
                  <img src={`/ratings/rating-40.png`} alt="" />
                </div>
                <p className="text-gray-500 text-sm">(150 Reviews) </p>
              </div>
              <div className="pl-4 border-l border-gray-400">
                <p className="text-[#00FF66] text-sm">In Stock</p>
              </div>
            </div>
            <p className="text-2xl font-semibold mb-6">${product.priceCents}</p>
            <p className="mb-6">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>
            <div className="">
              <div className="flex gap-x-4 mb-6 ">
                <p className="text-[20px]">Colours:</p>
                <div className="flex gap-x-2 items-center">
                  <p className="h-5 w-5 rounded-full bg-[#A0BCE0] cursor-pointer"></p>
                  <p className="h-5 w-5 rounded-full bg-[#E07575] cursor-pointer"></p>
                </div>
              </div>
              <div className="flex items-center gap-x-6 mb-6">
                <p className="text-[20px]">Size:</p>
                {sizes.map((s) => {
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-sm flex justify-center items-center h-8 w-8 border rounded cursor-pointer ${handleSizeColor(s)}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-x-4 h-10 mb-10 ">
                <div className="flex justify-between  w-39 h-full border border-gray-400 rounded">
                  <div
                    onClick={quantityIncrease}
                    className="flex justify-center items-center w-10 border-r border-gray-400"
                  >
                    <FiPlus
                      size={20}
                      className="text-gray-700 cursor-pointer"
                    />
                  </div>
                  <p className="flex justify-center items-center text-xl font-semibold">
                    {quantity}
                  </p>
                  <div
                    onClick={quantityDecrease}
                    className=" flex justify-center items-center w-10 border-l border-gray-400"
                  >
                    <FiMinus
                      size={20}
                      className="text-gray-700 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <button className="w-42 bg-[#DB4444] h-full text-white rounded cursor-pointer">
                    Buy Now
                  </button>
                  <div className="border border-gray-400 rounded h-full w-10 flex justify-center items-center cursor-pointer">
                    <FaRegHeart size={17} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-8 border border-gray-400 rounded  py-6 ">
                <div className="w- 83 flex items-center gap-x-4 pl-4">
                  <div className=" cursor-pointer">
                    <img
                      src="contacts-icons/delivery.svg"
                      alt=""
                      className=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 font-semibold">
                    <p>Free Delivery</p>
                    <p className="text-sm cursor-pointer">
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>
                <p className="border border-gray-300 rounded "></p>
                <div className=" flex items-center gap-x-4 pl-4">
                  <div className="cursor-pointer">
                    <img
                      src="contacts-icons/Icon-return.svg"
                      alt=""
                      className=""
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 font-semibold cursor-pointer">
                    <p>Return Delivery</p>
                    <p>Free 30 Days Delivery Returns. Details</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
