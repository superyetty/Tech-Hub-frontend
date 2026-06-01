import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartThin } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchProduct(params.get("search") || "");
  }, [location.pathname, location.search]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const normalizedSearch = searchProduct.trim();

    if (!normalizedSearch) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(normalizedSearch)}`);
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
          <ul className="hidden md:flex justify-between items-center w-90 ">
            <li
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer"
            >
              Contact
            </li>
            <li
              onClick={() => {
                navigate("/about");
              }}
              className="cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => {
                navigate("/register");
              }}
              className="cursor-pointer"
            >
              Sign Up
            </li>
          </ul>
        </div>
        <div className="flex  items-center w- gap-x-5 h-full ">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-x-4 w-70 h-full 10 pl-5 pr-3 bg-gray-100 rounded-sm "
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full h-full text-sm outline-0 "
              value={searchProduct}
              onChange={(event) => setSearchProduct(event.target.value)}
            />
            <button type="submit" aria-label="Search products">
              <FiSearch size={20} className=" h-full cursor-pointer" />
            </button>
          </form>
          <div className="flex justify-between items-center w-20 35 h-full">
            <div className="relativ cursor-pointer">
              <FaRegHeart
                size={24}
                onClick={() => {
                  navigate("/login");
                }}
              />
            </div>

            <PiShoppingCartThin
              size={30}
              className="cursor-pointer "
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
