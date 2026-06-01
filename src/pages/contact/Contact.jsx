import { HiOutlinePhone } from "react-icons/hi2";
import { RxEnvelopeClosed } from "react-icons/rx";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultValues = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  };
  const { register, handleSubmit, formState } = useForm({ defaultValues });
  const { errors } = formState;

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/message`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message,
          }),
        },
      );
      const data = await res.json();
      console.log("data", data);

      console.log("message data:", data.createdMessage);

      if (!data.success || !res.ok) {
        setError(data.message || "Error sending message");
        return;
      }

      if (data.success && res.ok) {
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "An unknown error has occurred");
      console.log("error:", err?.message);
    } finally {
      setIsLoading(false);
    }
  };
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
          <p className="text-sm cursor-pointer">Contact</p>
        </div>
        <div className="flex flex-col md:flex-row gap-10 h-120 ">
          <div className=" flex flex-col items-center justify-center w-85 rounded shadow">
            <div className="flex flex-col  w-67">
              <div className="flex flex-col gap-y-6 pb-8  border-b border-gray-300">
                <div className="flex items-center gap-x-4">
                  <div className=" text-white bg-[#DB4444] px-2 py-2 rounded-full cursor-pointer">
                    <HiOutlinePhone size={20} />
                  </div>
                  <p className="font-semibold">Call To Us</p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-8 pt-8 border-t border-gray-300">
                <div className="flex items-center gap-x-4">
                  <div className="border text-white bg-[#DB4444] px-2 py-2 rounded-full cursor-pointer">
                    <RxEnvelopeClosed size={20} />
                  </div>
                  <p className="font-semibold">Write To Us</p>
                </div>
                <div className="flex flex-col gap-y-6">
                  <p className="w-65">
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-200 h-full shadow ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-8 w-185  mx-auto"
            >
              <div className="flex justify-between ">
                <div>
                  <input
                    {...register("name", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="Your Name"
                    className="w-58 h-12 bg-[#F5F5F5] pl-4 rounded outline-0"
                  />
                  <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                    {errors.name && errors.name.message}
                  </div>
                </div>
                <div>
                  <input
                    {...register("email", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="Your Email"
                    className="w-58 h-12 bg-[#F5F5F5] pl-4 rounded outline-0"
                  />
                  <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                    {errors.email && errors.email.message}
                  </div>
                </div>
                <div>
                  <input
                    {...register("phoneNumber", {
                      required: "This field is required",
                    })}
                    type="text"
                    placeholder="Your Phone"
                    className="w-58 h-12 bg-[#F5F5F5] pl-4 rounded outline-0"
                  />
                  <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                    {errors.phoneNumber && errors.phoneNumber.message}
                  </div>
                </div>
              </div>
              <div>
                <textarea
                  {...register("message", {
                    required: "This field cannot be empty",
                  })}
                  id="message"
                  placeholder="Your Message"
                  className="h-55 w-full pl-5 pt-5 bg-[#F5F5F5] outline-0"
                ></textarea>
                <div className=" h-5 mt-1 text-red-500 text-[13px]">
                  {errors.message && errors.message.message}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 w-53 bg-[#DB4444] text-white rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-3 w-3 border-2 border-t-teal-600
                        border-r-pink-600 border-l-teal-600 border-b-pink-600
                        rounded-full animate-spin"
                      ></span>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
                {error && (
                  <p className="mt-2 text-sm text-red-500" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
