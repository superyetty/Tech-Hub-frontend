import { useForm } from "react-hook-form";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../components/context/UserProvider";

const Login = () => {
  const navigate = useNavigate();
  const { fetchWishlist, fetchCart } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors } = formState;
  const onSubmit = async (formData) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (res.ok && data.success) {
        navigate("/user/dashboard");
        fetchCart();
        fetchWishlist();
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err?.message || "Unknown error has occured");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-300 mx-auto space-y-10">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 md:max-w-300 mx-auto items-center gap-x-30 mb-40 ">
        <div className=" w-140 h-160">
          <div className="h-full">
            <img src="app-socials/auth-side-image.svg" alt="" className="h-full object-cover" />
          </div>
        </div>
        <div className="w-90 ">
          <h2 className="text-3xl font-semibold mb-5">Log in to Exclusive</h2>
          <p className="mb-8 text-sm">Enter your details below</p>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-7"
          >
            <div className="">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter a valid email format",
                  },
                  validate: {
                    notAdmin: (value) => {
                      return (
                        value !== "admin@example.com" ||
                        "Enter a different email address"
                      );
                    },
                    hasAt: (value) =>
                      value.includes("@") || "Enter a valid email",
                    invalidDomains: (value) => {
                      const domain = value.split("@")[1];
                      const validDomains = [
                        "yahoo.com",
                        "gmail.com",
                        "outlook.com",
                      ];
                      return validDomains.includes(domain)
                        ? true
                        : "Only Gmail, Outlook, Yahoo domains are allowed";
                    },
                  },
                })}
                type="text"
                placeholder="Email or Phone Number"
                className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
              />
              <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                {errors.email && errors.email.message}
              </div>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be atleast 8 characters",
                  },
                })}
                className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300 py-1"
              />
              <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                {errors.password && errors.password.message}
              </div>
            </div>

            <div className="flex justify-between items-center gap-x-24">
              {isLoading ? (
                <button
                  type="button"
                  disabled
                  className="h-10 w-10 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"
                />
              ) : (
                <button
                  type="submit"
                  className="bg-[#DB4444] text-white h-12 w-28 rounded-sm cursor-pointer"
                >
                  Log In
                </button>
              )}

              <p className="text-[#DB4444]">Forget Password?</p>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-center items-center text-gray-500 mt-2">
              <p>
                Dont't have an account?
                <span
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="text-gray-500 font-semibold pb-0.5 border-b-2 ml-3 border-gray-300 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
