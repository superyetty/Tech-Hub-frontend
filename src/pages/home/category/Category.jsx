import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FiSmartphone } from "react-icons/fi";
import { CiMonitor } from "react-icons/ci";
import { IoWatchOutline } from "react-icons/io5";
import { CiHeadphones } from "react-icons/ci";
import { PiGameControllerThin } from "react-icons/pi";
import CategoryCard from "./CategoryCard";
import { useUser } from "../../../components/context/UserProvider";

const Category = () => {
  const {products} = useUser()
  const category = [
    {
      icon: <IoPhonePortraitOutline size={40} />,
      title: "Phones",
    },
    {
      icon: <CiMonitor size={40} />,
      title: "Computers",
    },
    {
      icon: <IoWatchOutline size={40} />,
      title: "SmartWatch",
    },
    {
      icon: <CiCamera size={40} />,
      title: "Camera",
    },
    {
      icon: <CiHeadphones size={40} />,
      title: "HeadPhones",
    },
    {
      icon: <PiGameControllerThin size={40} />,
      title: "Gaming",
    },
  ];
  return (
    <div className="border-b border-gray-300 pb-15">
      <div className="flex flex-col gap-y-6 mb-15">
        {/* {
          products.map((product) => {
            return (
              (product.category === 'clothing'){

              }

            )
           
          })
        } */}
        <div className="flex items-center gap-x-4">
          <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
          <p className="text-[#DB4444] font-bold">Categories</p>
        </div>
        <div className="flex justify-between items-center end gap-x-22  h-15">
          <p className="text-3xl font-semibold ">Browse By Category</p>
          <div className="hidden md:flex items-center gap-x-3">
            <div className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center cursor-pointer">
              <MdOutlineArrowBack size={20} />
            </div>
            <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center cursor-pointer">
              <MdOutlineArrowForward size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7 ">
        {category.map((item, i) => {
          return <CategoryCard key={i} icon={item.icon} title={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Category;
