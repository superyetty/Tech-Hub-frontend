import { useNavigate } from "react-router-dom";
import { CiDollar } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { LuTwitter } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import Contact from "../home/contacts/Contact";
import { useState } from "react";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-10">
      <AuthHeader />
      <div className="">
        <div className="flex items-center gap-x-3 mb-11">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="text-sm text-gray-400 cursor-pointer"
          >
            Home
          </p>
          <span className="text-sm text-gray-400">/</span>
          <p className="text-sm">About</p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[450px_1fr] items-center gap-20 mb-35">
          <div className="flex flex-col justify-center gap-y-8 h-fit">
            <p className="text-5xl font-semibold">Our Story</p>
            <div className="flex flex-col gap-y-6  text-start ">
              <p className="w- max-w-135 full text -sm lg ">
                Launced in 2015, Exclusive is South Asia's premier online
                shopping makterplace with an active presense in Bangladesh.
                Supported by wide range of tailored marketing, data and service
                solutions, Exclusive has 10,500 sallers and 300 brands and
                serves 3 millioons customers across the region.
              </p>
              <p className="text lg max-w-xl">
                Exclusive has more than 1 Million products to offer, growing at
                a very fast. Exclusive offers a diverse assotment in categories
                ranging from consumer.
              </p>
            </div>
          </div>
          <div className="h-152 ">
            <div className="h-full">
              <img
                src="/founders/customer-display.svg"
                alt=""
                className="h-full object-cover rounded-tl rounded-bl"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 mb-35">
          <div className="h-57 border border-gray-300 rounded flex flex-col items-center justify-center w-68 group hover:bg-[#DB4444] hover:text-white transition duration-300 cursor-pointer">
            <div className="py-2.5 px-2.5 rounded-full flex justify-center items-center bg-gray-300">
              <div className=" bg-black group-hover:bg-white text-white group-hover:text-black px-2 py-2 rounded-full ">
                <CiShop size={35} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[32px] font-bold">10.5k</p>
              <p>Seller active on our site</p>
            </div>
          </div>
          <div className="h-57 border border-gray-300 rounded flex flex-col items-center justify-center w-68 group hover:bg-[#DB4444] hover:text-white transition duration-300 cursor-pointer">
            <div className="py-2.5 px-2.5 rounded-full flex justify-center items-center bg-gray-300">
              <div className=" bg-black group-hover:bg-white  group-hover:text-black px-2 py-2 text-white rounded-full ">
                <CiDollar size={35} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[32px] font-bold">33k</p>
              <p>Monthly Product Sale</p>
            </div>
          </div>
          <div className="h-57 border border-gray-300 rounded flex flex-col items-center justify-center w-68 group hover:bg-[#DB4444] hover:text-white transition duration-300 cursor-pointer">
            <div className="py-2.5 px-2.5 rounded-full flex justify-center items-center bg-gray-300">
              <div className=" bg-black px-2 py-2 group-hover:bg-white text-white group-hover:text-black rounded-full ">
                <LuShoppingBag size={25} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[32px] font-bold">45.5k</p>
              <p>Customer active in our site</p>
            </div>
          </div>
          <div className="h-57 border border-gray-300 rounded flex flex-col items-center justify-center w-68 group hover:bg-[#DB4444] hover:text-white transition duration-300 cursor-pointer">
            <div className="py-2.5 px-2.5 rounded-full flex justify-center items-center bg-gray-300">
              <div className=" bg-black group-hover:bg-white group-hover:text-black fill-black text-white px-2 py-2 rounded-full ">
                <GiCash size={30} />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[32px] font-bold">25k</p>
              <p>Anual gross sale in our site</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full mb-35">
          <div className="w- 92 flex flex-col gap-y-8 ">
            <div className="bg-[#F5F5F5] h-107 flex items-end cursor-pointer">
              <div className="h-97 mx-auto pt -9 ">
                <img src="/founders/image-46.svg" alt="" className="h-full " />
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 w-fit">
                <p className="text-3xl font-semibold cursor-pointer">
                  Tom Cruise
                </p>
                <p className="cursor-pointer">Founder & Chairman</p>
              </div>
              <div className="flex gap-x-4 w-fit">
                <LuTwitter className="cursor-pointer" />
                <FaInstagram className="cursor-pointer" />
                <RiLinkedinLine className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="w- 92 flex flex-col gap-y-8 ">
            <div className="bg-[#F5F5F5] h-107 flex items-end cursor-pointer">
              <div className="h-97 mx-auto ">
                <img src="/founders/image-51.svg" alt="" className="h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 w-fit">
                <p className="text-3xl font-semibold cursor-pointer">
                  Emma Watson
                </p>
                <p className="cursor-pointer">Managing Director </p>
              </div>
              <div className="flex gap-x-4 w-fit">
                <LuTwitter className="cursor-pointer" />
                <FaInstagram className="cursor-pointer" />
                <RiLinkedinLine className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="w- 92 flex flex-col gap-y-8 ">
            <div className="bg-[#F5F5F5] h-107 flex items-end cursor-pointer">
              <div className="h-97 mx-auto pt- 9 ">
                <img src="/founders/image-47.svg" alt="" className="h-full" />
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 w-fit">
                <p className="text-3xl font-semibold cursor-pointer">
                  Will Smith
                </p>
                <p className="cursor-pointer">Product Designer </p>
              </div>
              <div className="flex gap-x-4 w-fit ">
                <LuTwitter className="cursor-pointer" />
                <FaInstagram className="cursor-pointer" />
                <RiLinkedinLine className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
