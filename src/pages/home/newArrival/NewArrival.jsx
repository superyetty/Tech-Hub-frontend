import React from "react";

const NewArrival = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-y-6 mb-15">
        <div className="flex items-center gap-x-4">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
          <p className="text-[#DB4444] font-bold">Featured</p>
        </div>
        <div className="flex items-center h-15">
          <p className="text-3xl font-semibold ">New Arrival</p>
        </div>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-8 ">
        <div className="flex items-end h-150 bg-black rounded-sm">
          <div className="flex items-end h-127 mx-auto relative ">
            <div className=" w-full">
              <div className="h-120 w-full ">
                <img
                  src="/homepage/playstation-5.svg"
                  alt=""
                  className="h-full w-full border "
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 w-56 h-30 text-white absolute bottom-9">
              <p className="text-[24px] font-semibold">Play Station 5</p>
              <p className="text-[14px]">
                Black and White version of the PS5 coming out on sale.
              </p>
              <p className="underline cursor-pointer">Shop Now</p>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 gap-7">
          <div className="bg-black border h-71 rounded-sm ">
            <div className="border h-full relative">
              <div className="border h-full absolute right-0 ">
                <div className="border h-full w-108 ">
                  <img
                    src="/homepage/woman-hat-black.svg"
                    alt=""
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 w-63 h-30 text-white absolute bottom-6 left-6 ">
                <p className="text-[24px] font-semibold">Women’s Collections</p>
                <p className="text-[14px]">
                  Featured woman collections that give you another vibe.
                </p>
                <p className="underline cursor-pointer">Shop Now</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div className="bg-black rounded-sm">
              <div className=" flex items-center relative borde border-white h-full">
                <div className="h-55 w-52 mx-auto">
                  <div className="h-full w-full">
                    <img src="/homepage/speakers.svg" alt="" className="h-full w-full"/>
                  </div>
                  <div className="flex flex-col gap-y- w-42 h- text-white absolute bottom-10 ">
                    <p className="text-[24px] font-semibold">Speakers</p>
                    <p className="text-[14px]">Amazon wireless speakers</p>
                    <p className="underline cursor-pointer">Shop Now</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black rounded-sm">
              <div className=" flex items-center relative borde border-white h-full">
                <div className="h-55 w-52 mx-auto">
                  <div className="h-full w-full">
                    <img src="/homepage/perfume.svg" alt="" className="h-full w-full"/>
                  </div>
                  <div className="flex flex-col gap-y- w-42 h- text-white absolute bottom-10 ">
                    <p className="text-[24px] font-semibold">Perfume</p>
                    <p className="text-[14px]">GUCCI INTENSE OUD EDP</p>
                    <p className="underline cursor-pointer">Shop Now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
