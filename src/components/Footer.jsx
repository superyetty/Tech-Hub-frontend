import { BiSend } from "react-icons/bi";
const Footer = () => {
  return (
    <div className="max-w- 300 mx -auto  bg-black text-white p-10 mt-30">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <div className="flex flex-col text-[14px] ">
          <p className="text-2xl font-semibold"> Tech Wear Hub</p>
          <p className="text-[18px] my-5.5">Subscribe</p>
          <p className="mb-3">Get 10% off your first order</p>
          <div className="border h-10 w-45 rounded-md flex justify-between items-center px-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full outline-0 h-full"
            />
            <BiSend size={23} className="borde" />
          </div>
        </div>
        <div className="text-[14px] ">
          <p className="text-[19px] font ">Support</p>
          <p className="text my-5.5 w-40 ">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="mb-3">exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>
        <div className="text-[14px]">
          <p className="text-[19px] mb-5">Account</p>
          <p className="text w- 45">My Account</p>
          <p className="my-4">Login / Register</p>
          <p>Cart</p>
          <p className="my-4">Wishlist</p>
          <p>Shop</p>
        </div>
        <div className="text-[14px] ">
          <p className="text-[19px]  mb-5">Quick Link</p>
          <p className=" w-45">Privacy Policy</p>
          <p className="my-4">Terms Of Use</p>
          <p>FAQ</p>
          <p className="my-4">Contact</p>
        </div>
        <div className="">
          <p className="text-[19px] mb-5">Download App</p>
          <p className="text-[10.5px] text-[#a7a5a5] mb-2 borde">
            Save $3 with App New User Only
          </p>
          <div className="flex">
            <img src="/app-socials/barcode.svg" alt="" className="w-15" />
            <div className="flex flex-col gap-y-2 ml-2">
              <img src="/app-socials/google-play.svg" alt="" className="w-22" />
              <img src="/app-socials/appstore.svg" alt="" className="w-22" />
            </div>
          </div>
          <div className="flex gap-x-5 mt-5">
            <img
              src="/app-socials/facebook-icon.svg"
              alt=""
              className="w-2.5"
            />
            <img src="/app-socials/twitter.svg" alt="" className="w-4" />
            <img src="/app-socials/instagram.svg" alt="" className="w-4" />
            <img src="/app-socials/linkedin.svg" alt="" className="w-4.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
