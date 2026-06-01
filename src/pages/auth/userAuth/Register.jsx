import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = formState;
  const password = watch("password");
  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        console.log("register-data:", data);
        // navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Unknown error has occured", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-300 mx-auto space-y-10">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 md:max-w-300 mx-auto items-center gap-x-30 gap-y-10 mb-40 ">
        <div className=" w-140 h-160">
          <div className="h-full">
            <img src="app-socials/auth-side-image.svg" alt="" className="h-full  object-cover"/>
          </div>
        </div>
        <div className="w-90 ">
          <h2 className="text-4xl font-semibold mb-5">Create an account</h2>
          <p className="mb-8 text-sm">Enter your details below</p>
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <div className="flex gap-x-3">
              <div className="">
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="First Name"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.firstName && errors.firstName.message}
                </div>
              </div>
              <div className="">
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Last Name"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.lastName && errors.lastName.message}
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
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
                  placeholder="Email"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.email && errors.email.message}
                </div>
              </div>
              <div className="">
                <input
                  {...register("age", {
                    required: "Age is required",
                  })}
                  type="text"
                  placeholder=" Age"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.age && errors.age.message}
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div className="">
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  type="text"
                  placeholder="Phone Number"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.phoneNumber && errors.phoneNumber.message}
                </div>
              </div>
              <div className="">
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  type="text"
                  placeholder="Address"
                  className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300"
                />
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.address && errors.address.message}
                </div>
              </div>
            </div>
            <div className="flex gap-x-3">
              <div>
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
                </div>
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.password && errors.password.message}
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Field required",
                      validate: (value) => {
                        return value === password || "Password do not match";
                      },
                    })}
                    className="text-gray-700 text-sm w-full outline-0 border-b-2 border-gray-300 py-1"
                  />
                </div>
                <div className=" h-5 mt-1 text-red-500 text-[13px] ">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-x-24">
              {isLoading ? (
                <button className="h-4 w-4 border-[3px] border-gray-300 border-t-black rounded-full animate-spin"></button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#DB4444] text-white h-12 w-full rounded-sm cursor-pointer"
                >
                  Log In
                </button>
              )}
            </div>
            <div className="flex justify-center items-center gap-x-3 h-12 w-full rounded-sm border border-gray-300">
              <div>
                <img src="app-socials/google-icon.svg" alt="" />
              </div>
              Sign up with Google
            </div>
            <div className="flex justify-center items-center text-gray-500 mt-2">
              <p>
                Already have an account?
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-gray-500 font-semibold pb-0.5 border-b-2 ml-3 border-gray-300 cursor-pointer"
                >
                  Log In
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

export default Register;
