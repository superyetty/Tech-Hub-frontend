import { FaApple } from "react-icons/fa";
import { MdOutlineArrowForward } from "react-icons/md";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Category from "./category/Category";
import Todaysales from "./today/Todaysales";
import ThisMonth from "./this-month/ThisMonth";
import ProductExplore from "./explore-product/ProductExplore";
import NewArrival from "./newArrival/NewArrival";
import Contact from "./contacts/Contact";

const Homepage = () => {
  const sideBar = [
    "Woman's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sport's & Toys",
    "Groceries & Pets",
    "Health & Beauty",
  ];
  return (
    <div className="w-full max-w-300 mx-auto ">
      <Header />
      <div className="grid sm:grid-cols-1 md:grid-cols-[200px_1fr] gap-x-10 max-w-400 mx-auto mb-30">
        <div className="lg:border-r md:border-r sm:border-0 border-gray-400 pt-10 border">
          {
            sideBar.map((link) => <div className="">
            <p className="py-3">{link}</p>
          </div>)
          }
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:gird-cols-[1fr_3fr] lg:grid-cols-[1fr_3fr] items-center b gap-x- 30 gap-y- 5 pl- 20 bg-black text-white mt-12">
          <div className="h-full w-100 flex flex-col justify-center py-2 pl-30">
            <div className="flex items-center gap-x-4">
              <FaApple size={35} />
              <p>iPhone 14 series</p>
            </div>
            <p className="text-5xl text -center w- 50 font-semibold leading-15 my- 6">
              Up to 10% <br />
              off Voucher
            </p>
            <div className="flex items-center gap-x-1 mt-5">
              <p className="border-b">Shop Now</p>
              <MdOutlineArrowForward size={20} />
            </div>
          </div>
          <div>
            <img src="homepage/iphone-series.svg" alt="" />
          </div>
        </div>
      </div>

      <div className=" mb-20">
        <Todaysales />
      </div>

      <div className=" mb-20">
        <Category />
      </div>

      <div className=" mb-20">
        <ThisMonth />
      </div>

      <div className="">
        <ProductExplore />
      </div>

      <div className="mb-20">
        <NewArrival />
      </div>

      <div className="mb-20">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
