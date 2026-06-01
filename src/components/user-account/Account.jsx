import { useForm } from "react-hook-form";
import AuthHeader from "../auth-header/AuthHeader";
import Footer from "../Footer";

const Account = () => {
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
  const { register, formState, watch, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { errors } = formState;
  const password = watch("password");

  const onSubmit = async (formdata) => {
    console.log("form data:", formdata);
  };
  return (
    <div className="max-w-300 mx-auto flex flex-col gap-y-10">
      <AuthHeader />
      <div className="flex flex-col gap-y-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <p
              onClick={() => {
                navigate("/");
              }}
              className="text-sm cursor-pointer"
            >
              Home
            </p>
            <span className="text-gray-400">/</span>
            <p className="text-sm cursor-pointer">My Account</p>
          </div>
          <div className="borde">
            <p className="text-sm">
              Welcome! <span className=" text-[#DB4444]">Ms Yetty</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] borde">
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold borde">Manage My Account</p>
              <div className="pl-8 text-gray-500 ">
                <p className="text-[#DB4444] cursor-pointer">My Profile</p>
                <p className="cursor-pointer">Address Book</p>
                <p className="cursor-pointer">My Payment Options</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold borde">My Orders</p>
              <div className="pl-8 text-gray-500 ">
                <p className="cursor-pointer">My Returns</p>
                <p className="cursor-pointer">My Cancellations</p>
              </div>
            </div>
            <div>
              <p className="font-semibold borde">My Wishlist</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center shadow-lg rounded">
            <div className="flex flex-col gap-y-4 w-200 my-10">
              <h1 className="text-lg fonr-semibold text-[#DB4444]">
                Edit Your Profile 
              </h1>
              <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-6"
              >
                <div className="flex flex-col gap-y-6">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-y-2 w-83 ">
                      <label htmlFor="firstName" className="font-semibold">
                        First Name
                      </label>
                      <input
                        {...register("firstName", {
                          required: "Field required",
                        })}
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 "
                      />
                      {errors.firstName && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2 w-83 ">
                      <label htmlFor="lastName" className="font-semibold">
                        Last Name
                      </label>
                      <input
                        {...register("lastName", {
                          required: "Field required",
                        })}
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 "
                      />
                      {errors.lastName && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between ">
                    <div className="flex flex-col gap-y-2 w-83 ">
                      <label htmlFor="email" className="font-semibold">
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Field required",
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
                            hasAt: (value) => {
                              return (
                                value.includes("@") ||
                                "A valid email requires '@' "
                              );
                            },
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
                        id="email"
                        placeholder="Email"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 "
                      />
                      {errors.email && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2 w-83 ">
                      <label htmlFor="address" className="font-semibold">
                        Address
                      </label>
                      <input
                        {...register("address", {
                          required: "Field is required",
                        })}
                        type="text"
                        id="address"
                        placeholder="Address"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 "
                      />
                      {errors.address && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify- between ">
                    <label className="font-semibold mb-2">
                      Password Changes
                    </label>
                    <div className="mb-4 rounded">
                      <input
                        {...register("currentPassword", {
                          required: "Field required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message:
                              "Password must be 8+ characters and include uppercase, lowercase, number and special character",
                          },
                        })}
                        type="password"
                        placeholder="Current Password"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 w-full"
                      />
                      {errors.currentPassword && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 rounded">
                      <input
                        {...register("password", {
                          required: "Field required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message:
                              "Password must be 8+ characters and include uppercase, lowercase, number and special character",
                          },
                        })}
                        type="password"
                        placeholder="New Password"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 w-full"
                      />
                      {errors.password && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="rounded">
                      <input
                        {...register("confirmPassword", {
                          required: "Field is required",
                          validate: (value) => {
                            return (
                              value === password || "Password do not match"
                            );
                          },
                        })}
                        type="password"
                        placeholder="Confirm Password"
                        className="h-10 pl-4 bg-[#F5F5F5] outline-0 w-full"
                      />
                      {errors.confirmPassword && (
                        <p className=" h-5 mt-1 text-red-500 text-[13px] ">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end h-14 ">
                  <div className="flex items-center gap-x-8 h-full w-76 ">
                    <button
                      onClick={() => reset()}
                      className="h-full cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-53 h-full bg-[#DB4444] text-white rounded cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
