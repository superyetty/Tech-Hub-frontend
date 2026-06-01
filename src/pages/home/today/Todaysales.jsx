import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import TodayCard from "./TodayCard";
import { useEffect, useState } from "react";
import { useUser } from "../../../components/context/UserProvider";

const Todaysales = () => {
  const { products = [] } = useUser();
  const [index, setIndex] = useState(0);
  
  const totalSlides = Math.max(1, Math.ceil(products.length / 5));

  useEffect(() => {
    setIndex((currentIndex) => {
      if (currentIndex <= totalSlides - 1) return currentIndex;
      return totalSlides - 1;
    });
  }, [totalSlides]);

  const prev = () => {
    if (totalSlides <= 1) return;
    setIndex((i) => (i === 0 ? totalSlides - 1 : i - 1));
  };

  const next = () => {
    if (totalSlides <= 1) return;
    setIndex((i) => (i === totalSlides - 1 ? 0 : i + 1));
  };
  return (
    <div className="border-b border-gray-300 pb-15 ">
      <div className="flex justify-between items-end mb-10">
        <div className="flex  flex-col gap-y-6 ">
          <div className="flex items-center gap-x-4 ">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
            <p className="text-[#DB4444] font-bold">Today's</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-22 ">
            <p className="text-3xl font-semibold">Flash Sales</p>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-4">
                <div>
                  <p className="text-[11px] font-bold ">Days</p>
                  <p className="flex text-3xl font-bold ">03</p>
                </div>
                <p className="text-red-500 font-semibold text-2xl">:</p>
              </div>
              <div className="flex items-center gap-x-4">
                <div>
                  <p className="text-[11px] font-bold  ">Hours</p>
                  <p className="flex text-3xl font-bold ">23</p>
                </div>
                <p className="text-red-500 font-semibold text-2xl">:</p>
              </div>
              <div className="flex items-center gap-x-4">
                <div>
                  <p className="text-[11px] font-bold  ">Minutes</p>
                  <p className="flex text-3xl font-bold ">19</p>
                </div>
                <p className="text-red-500 font-semibold text-2xl">:</p>
              </div>
              <div className="flex items-center gap-x-4">
                <div>
                  <p className="text-[11px] font-bold  ">Seconds</p>
                  <p className="flex text-3xl font-bold ">56</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden  md:flex items-center gap-x-3">
          <div
            onClick={() => {
              prev();
            }}
            className={`rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center ${
              totalSlides > 1
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-60"
            }`}
          >
            <MdOutlineArrowBack />
          </div>
          <div
            onClick={() => {
              next();
            }}
            className={`rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center ${
              totalSlides > 1
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-60"
            }`}
          >
            <MdOutlineArrowForward />
          </div>
        </div>
      </div>
      <div className="w-full ">
        <TodayCard index={index} />
      </div>
    </div>
  );
};

export default Todaysales;
