import { FaApple } from "react-icons/fa";
import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import Footer from "../../components/Footer";
import FlashSalesCard from "./today/FlashSalesCard";
import Category from "./category/Category";
import Todaysales from "./today/Todaysales";
import ThisMonth from "./this-month/ThisMonth";
import ProductExplore from "./explore-product/ProductExplore";
import NewArrival from "./newArrival/NewArrival";
import Contact from "./contacts/Contact";
import AuthHeader from "../../components/auth-header/AuthHeader";

const UserDashboard = () => {
  return (
     <div className="w-full max-w-300 mx-auto ">
      <AuthHeader />
      <div className="grid sm:grid-cols-1 md:grid-cols-[200px_1fr] gap-x-10 max-w-400 mx-auto mb-30">
        <div className="border-r border-gray-400 pt-10">
          <div className="flex flex-col justify-between mr-4 h-full ">
            <p>Woman's Fashion</p>
            <p>Men's Fashion</p>
            <p>Electronics</p>
            <p>Home & Lifestyle</p>
            <p>Medicine</p>
            <p>Sport's & Toys</p>
            <p>Groceries & Pets</p>
            <p>Health & Beauty</p>
          </div>
        </div>
        <div className="flex items-center b gap-x-30 pl-20 bg-black text-white mt-12">
          <div>
            <div className="flex items-center gap-x-4">
              <FaApple size={35} />
              <p>iPhone 14 series</p>
            </div>
            <p className="text-4xl w-50 font-semibold leading-13 my-6">
              Up to 10% off Voucher
            </p>
            <div className="flex items-center gap-x-1">
              <p className="border-b">Shop Now</p>
              <MdOutlineArrowForward size={20} />
            </div>
          </div>
          <div className="">
            <img src="/homepage/iphone-series.svg" alt="iPhone 17 series" />
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

      <div>
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
  )
}

export default UserDashboard
