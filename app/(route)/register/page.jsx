"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { addData } from "@/app/(services)/services";
import { useRouter } from "next/navigation";

const registerFormData = {
  username: "",
  email: "",
  password: "",
};

const controls = [
  {
    label: "Name",
    type: "text",
    placeholder: "Name",
    name: "username",
  },
  {
    label: "Email",
    type: "text",
    placeholder: "Msworld@gmail.com",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];
const Register = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(registerFormData);
  const [loading, setLoading] = useState(false);
  console.log(formData, "check register data ");
  const session = useSession();
  console.log(session, "session");

  const handleChange = (name, value) => {
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    try {
      setLoading(true);
      if (!username || !email || !password) {
        setError("please Fill all Fields!");
        return;
      }

      const response = await addData("register", formData);

      if (!response.success) {
        setError(response.message);
      } else {
        setFormData(registerFormData);
        router.push("/login");
        setError("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen ">
      <div className=" md:grid grid-cols-3">
        <div className="hidden md:flex col-span-2  items-center   bg-white">
          <div className=" padding-l padding-r   flex justify-center items-center ">
            <Image
              src="/assets/login/login1.jpeg"
              width={450}
              height={450}
              alt="login "
              className="object-contain  2xl:h-[550px] 2xl:w-[550px] "
            ></Image>
          </div>
        </div>
        <div className="md:bg-orange flex justify-center items-center w-full h-screen md:relative">
          <div className="bg-white w-[300px] sm:w-[400px] 2xl:top-48  flex flex-col  h-[500px]   px-6   rounded-sm  shadow-xl md:absolute -left-24 2xl:-left-32">
            <h1 className=" text-3xl mb-0 leading-7 max-md:flex-col font-bold mt-6 text-orange ">
              Register <br />{" "}
              <span className="text-sm text-gray-400 ">
                (Only Admin can Login this Dashboard)
              </span>
            </h1>

            <div className=" w-full mt-7 flex flex-col   gap-4 items-center ">
              {controls?.map((item, index) => {
                return (
                  <>
                    <div className="    w-full" key={index}>
                      <label className=" text-gray-400 font-semibold ">
                        {item.label}
                      </label>
                      <input
                        type={item.type}
                        className="bg-gray-100 w-full h-11 outline-none mt-1 focus:border px-3"
                        name={item.name}
                        placeholder={item.placeholder}
                        value={formData[item.name]}
                        onChange={(e) =>
                          handleChange(item.name, e.target.value)
                        }
                      />
                    </div>
                  </>
                );
              })}

              <span className="bg-red-400  text-center text-white rounded-md w-full  mt-4">
                {error && error}
              </span>
              <button
                onClick={handleFormSubmit}
                className="bg-orange px-11 py-2 w-full flex justify-center items-center  rounded-lg shadow-lg text-white"
              >
                {loading ? (
                  <HashLoader color="#ffffff" size={25} />
                ) : (
                  "Register"
                )}
              </button>
            </div>

            <Toaster />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
