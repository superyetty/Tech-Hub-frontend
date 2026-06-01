import React from "react";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-10 ">
      <AuthHeader />
      <div className="">
        <div className="flex items-center gap-x-3 mb-11">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="text-sm cursor-pointer"
          >
            Home
          </p>
          <span className="text-gray-400">/</span>
          <p className="text-sm cursor-pointer">404 Error</p>
        </div>
        <div className="flex flex-col items-center gap-y-20 my-35">
          <div className="flex flex-col items-center gap-y-10 ">
            <p className="text-8xl font-semibold tracking-widest">
              404 Not Found
            </p>
            <p>Your visited page not found. You may go home page.</p>
          </div>
          <div className="flex justify-center text-white h-14 w-63  bg-[#DB4444] ">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="w-full cursor-pointer "
            >
              Back to home page
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
