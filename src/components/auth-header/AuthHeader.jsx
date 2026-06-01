import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartThin } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const AuthHeader = () => {
  const navigate = useNavigate();
  const { carts, wishlists, logout } = useUser();
  const [openDropDown, setOpenDropDown] = useState(false);

  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log("carts:", carts);

  const cartQuantity = (carts[0]?.items || []).reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      setOpenDropDown(false);
      navigate("/login");
    } else {
      console.error(result.message);
    }
  };
  return (
    <div className="max-w-400 border-b border-gray-300 py-4">
      <div className="flex justify-between items-center h-10 ">
        <div className="flex justify-between w-160">
          <h2
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Tech Wear Hub
          </h2>
          <ul className="hidden md:flex justify-between items-center w-65">
            <li
              onClick={() => {
                navigate("/user/dashboard");
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/user/contact");
              }}
              className="cursor-pointer"
            >
              Contact
            </li>
            <li
              onClick={() => {
                navigate("/user/about");
              }}
              className="cursor-pointer"
            >
              About
            </li>
            {/* <li className="cursor-pointer">Sign Up</li> */}
          </ul>
        </div>
        <div className="flex items-center w- gap-x-5 h-full">
          <div className="flex items-center gap-x-4 w-60 h-full 10 pl-5 pr-3 bg-gray-100 rounded-sm ">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full h-full text-sm outline-0 "
            />
            <FiSearch size={20} className=" h-full cursor-pointer" />
          </div>
          <div className="flex justify-between items-center w-35 h-full">
            <div
              onClick={() => {
                navigate("/user/wishlist");
              }}
              className="relative cursor-pointer "
            >
              {wishlists.length === 0 ? (
                ""
              ) : (
                <p className="bg-[#DB4444] text-white w-6 h-6 text-center flex justify-center items-center  rounded-full font-semibold text-sm absolute bottom-3 left-4">
                  {wishlists.length}
                </p>
              )}

              <FaRegHeart size={24} />
            </div>

            <div
              onClick={() => {
                navigate("/user/cart");
              }}
              className="relative cursor-pointer"
            >
              {cartQuantity === 0 ? (
                ""
              ) : (
                <p className="absolute bottom-4 left-4 w-6 h-6 bg-[#DB4444] text-sm text-white rounded-full flex justify-center itens-center font-semibold">
                  {cartQuantity}
                </p>
              )}
              <PiShoppingCartThin size={30} className="cursor-pointer " />
            </div>

            <div ref={dropDownRef} className="relative">
              <div
                className="h-8 w-8 flex justify-center items-center rounded-full bg-[#DB4444] text-white cursor-pointer"
                onClick={() => {
                  setOpenDropDown(!openDropDown);
                }}
              >
                <GoPerson size={25} />
              </div>
              {openDropDown && (
                <div className="flex justify-center items-center w-53 h-52 absolute top-8 8 right-0 backdrop-blur-2xl bg-black/40  border-white/30  p-8 rounded-sm border">
                  <div className="flex flex-col gap-y-3 w- 56 h-45 text-white">
                    <div className="flex items-center gap-x-4 h-8 cursor-pointer  w-fit">
                      <div className="h-5 cursor-pointer">
                        <img
                          src="/contacts-icons/user.svg"
                          alt=""
                          className="h-full"
                        />
                      </div>
                      <p
                        onClick={() => {
                          navigate("/account");
                        }}
                        className="text-[12px] cursor-pointer whitespace-nowrap"
                      >
                        Manage My Account
                      </p>
                    </div>
                    <div className="flex items-center  gap-x-4 h-8 cursor-pointer w-fit">
                      <div className="h-5 cursor-pointer">
                        <img
                          src="/contacts-icons/icon-mallbag.svg"
                          alt=""
                          className="h-full"
                        />
                      </div>
                      <p className="text-[12px] cursor-pointer">My Order</p>
                    </div>
                    <div className="flex items-center  gap-x-4 h-8 cursor-pointer  w-fit">
                      <div className="h-5  cursor-pointer">
                        <img
                          src="/contacts-icons/icon-cancel.svg"
                          alt=""
                          className="h-full"
                        />
                      </div>
                      <p className="text-[12px] cursor-pointer">
                        My Cancellations
                      </p>
                    </div>
                    <div className="flex items-center  gap-x-4 h-8 cursor-pointer  w-fit">
                      <div className="h-5 cursor-pointer">
                        <img
                          src="/contacts-icons/Icon-Reviews.svg"
                          alt=""
                          className="h-full"
                        />
                      </div>
                      <p className="text-[12px] cursor-pointer">My Reviews</p>
                    </div>
                    <div
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex items-center gap-x-4 h-8 cursor-pointer  w-fit"
                    >
                      <div className="h-5 cursor-pointer">
                        <img
                          src="/contacts-icons/Icon-logout.svg"
                          alt=""
                          className="h-full"
                        />
                      </div>
                      <p className="text-[12px]">Logout</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
