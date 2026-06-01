import React from "react";

const Contact = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <div className="flex flex-col items-center gap-y-5">
        <div className="h-18 w-18 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer">
          <div className="h-12 w-12 p-2 bg-black rounded-full">
            <img
              src="/contacts-icons/icon-delivery.svg"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="text-center cursor-pointer">
          <p className="text-xl font-bold">FREE AND FAST DELIVERY</p>
          <p className="text-sm">Free delivery for all orders over $140</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <div className="h-18 w-18 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer">
          <div className="h-12 w-12 p-2 bg-black rounded-full">
            <img
              src="/contacts-icons/icon-customer-service.svg"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="text-center cursor-pointer">
          <p className="font-bold">24/7 CUSTOMER SERVICE</p>
          <p className="text-sm">Friendly 24/7 customer support</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <div className="h-18 w-18 flex justify-center items-center rounded-full bg-gray-300 cursor-pointer">
          <div className="h-12 w-12 p-2 bg-black rounded-full">
            <img
              src="/contacts-icons/guarantee-ticket-icon.svg"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="text-center cursor-pointer">
          <p className="font-bold">MONEY BACK GUARANTEE</p>
          <p className="text-sm">We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
