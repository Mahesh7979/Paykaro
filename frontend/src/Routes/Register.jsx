"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms/isUserAtom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const baseUrl = "https://paykaro.vercel.app";

export default function Register() {

  const setUser = useSetRecoilState(isUserAtom);
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().min(1, { message: "Email is required" }).email(
      { message: "Invalid email address" }).refine(value=>/^[a-z0-9_]+@gmail\.com$/.test(value),{
      message : "Invalid email"}),
    password: z.string().min(4, { message: "Password must be at least 4 characters" }),
    mobile: z.string().refine(value => /^[0-9]{10}$/.test(value), { 
      message: "Mobile must be exactly 10 digits" 
    }),
  });
  

  const {
    register, handleSubmit, formState: { errors },} = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(baseUrl+"/api/v1/user/signup", {
        username:data.email,
        password:data.password,
        firstname:data.name,
        mobile:data.mobile,
      })
      .then((res) => {
        if(res.data.token && res.data.user){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userDetails",JSON.stringify(res.data.user));
        localStorage.setItem("accBalance", res.data.accBalance);
        localStorage.setItem("accNot", res.data.accNot);
        setUser(true);
        navigate("/dashboard");
        setTimeout(() => {
          toast.success(`${res.data.msg}`);
        }, 10);
      }
      else {
        toast.error(`${res.data.msg}`);
      }
      });
  };
  return (
    <div>
    <nav>
    <a href="#" className="w-full bg-offblck flex justify-center items-center text-5xl font-extrabold font-poppins text-blu absolute h-16 rounded-b-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
       Paykaro
    </a>
    </nav>
    <body className="flex bg-gray-900">
      <section className="w-screen lg:w-1/2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          
          <div className="lg:w-2/3 bg-white rounded-lg shadow dark:border md:mt-11 sm:max-w-md xl:p-0 dark:bg-offblck dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
             
              <form className="bg-offblck text-gray-50" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
     <div className="relative m-1">
       <input type="email" id="email" placeholder="Email" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
         {...register("email")}
       />
       <label htmlFor="email"  className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
       >
         Email{" "}
       </label>
       </div>
     <div className="m-1">
     {errors.email && (
       <span className="text-xs text-rose-500">{errors.email?.message}</span>
      )}
      </div>
      </div>
    <div className="flex">
     <div className="flex flex-col">
     <div className="relative m-1">
       <input type="text" id="name" placeholder="Name" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
         {...register("name")}
       />
       <label
         htmlFor="name" className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
       >
         Name
       </label>
     </div>
     <div className="text-xs m-1">
       {errors.name && (
       <span className="text-rose-500">{errors.name?.message}</span>
     )}</div>
     </div>
    <div className="flex flex-col">
      <div className="relative m-1">
       <input type="string" id="mobile" placeholder="Mobile" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
         {...register("mobile")}
       />
       <label
         htmlFor="mobile" className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
       >
         Mobile{" "}
       </label>
     </div>
     <div className="text-xs m-1">
       {errors.mobile && (
         <span className="text-rose-500">{errors.mobile?.message}</span>
       )}
       </div>
       </div>
   </div>
   <div className="flex flex-col">
     <div className="relative m-1">
       <input type="password" id="password" placeholder="Password" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 w-full text-md text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
         {...register("password")}
       />
       <label
         htmlFor="password" className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
       >
         Password{" "}
       </label>
     </div>
     <div className="ml-1">
     {errors.password && (
         <span className="text-xs text-rose-500">{errors.password?.message}</span>
       )}
        </div>
        </div>
    
     <div className="flex items-start m-3">
                 <div className="flex items-center h-5">
                   <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required />
                 </div>
                 <div className="ml-3 text-sm">
                   <label className="font-light text-gray-500 dark:text-gray-300">
                     I accept the{" "}
                     <a
                       className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                       href="#"
                     >
                       Terms and Conditions
                     </a>
                   </label>
                 </div>
               </div>
              <div className="flex justify-center">
               <button
                className="text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                 type="submit"
                 onClick={handleSubmit}
               ><Toaster/>create an account</button>
               </div>
   </form>
                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  Already a user ?{" "}
                  <Link className="text-blu underline" to={"/signin"}>
                    {" "}
                    Login
                  </Link>{" "}
                  here
                </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-1/2 lg:flex justify-center bg-gray-900 hidden ">
      <div className="hidden md:flex  w-full flex-col justify-center  rounded-3xl text-center  ">
    <div className="flex  flex-col justify-center mb-30 lg:mb-23 p-10 text-offblu">
      <div className="text-3xl  lg:text-5xl font-poppins font-extrabold mb-10 ">
      Welcome to Paykaro!
      </div>
      <div className=" text-2xl  lg:text-3xl font-poppins font-extrabold mb-10">
      Join thousands of satisfied users who trust Paykaro for secure and convenient payment solutions.
      </div>
    </div>
  </div>
      </section>
      </body>
    </div>
  );
}
