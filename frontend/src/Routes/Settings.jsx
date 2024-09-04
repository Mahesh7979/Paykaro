import axios from "axios";
import Loader from "../components/Loader";
import { isUserAtom } from "../atoms/isUserAtom";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const baseUrl = import.meta.env.BASE_URL;
export default function Settings() {
  const [general, setGeneral] = useState(true);
  const setUser = useSetRecoilState(isUserAtom);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const schema = z.object({
    password: z.string().min(4, { message: "Password must be at least 4 characters" }),
    newPassword: z.string().min(4, { message: "Password must be at least 4 characters" }),
  });

  const {
    register, handleSubmit, formState: { errors }, } = useForm({
      resolver: zodResolver(schema),
    });

  const onSubmit = (data) => {
      axios
        .put(
          baseUrl+"/api/v1/user/update",
          {
            password: data.password,
            newPassword: data.newPassword,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.alert) {
            localStorage.removeItem("token");
            localStorage.removeItem("userDetails");
            localStorage.removeItem("trans");
            localStorage.removeItem("accBalance");
            localStorage.removeItem("accNot");
            setUser(null);
            setTimeout(() => {
              toast.success(`${res.data.msg}`);
              toast(`${res.data.alert}`, {
                duration: 5000
              });
            }, 10);
          }
          else {
            toast.error(`${res.data.msg}`);
          }
        });
    
  };
  if (!userDetails) {
    return <Loader />;
  }
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="font-poppins w-2/3 h-full flex flex-col justify-center pb-44">
        <div className="text-xl">
          <NavLink
            onClick={() => {
              setGeneral(true);
            }}
            className={() => {
              return general
                ? " text-blu font-bold p-3 border-b-2 border-blu"
                : "text-white font-semibold p-4";
            }}
          >
            {" "}
            General
          </NavLink>

          <NavLink
            onClick={() => {
              setGeneral(false);
            }}
            className={() => {
              return !general
                ? " text-blu font-bold p-3  border-b-2 border-blu"
                : "text-white font-semibold p-4";
            }}
          >
            {" "}
            Security
          </NavLink>
        </div>
        <div className="h-1/3 pt-10">
          {general ? (
           <div className=" text-white ">
            Name :
          <div className="relative m-3">  
                <input type="text"  id="Name" placeholder="Name" className="ml-2 md:w-1/2 cursor-not-allowed h-9 sm:h-11 px-2 pb-3 pt-3  text-sm text-gray-600 bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled readOnly
                 value={userDetails.firstname}/>
          </div>Email : 
            <div className="relative m-3"> 
                <input type="text"  id="Email" placeholder="Email" className="ml-2 md:w-1/2 cursor-not-allowed h-9 sm:h-11 px-2 pb-3 pt-3  text-sm text-gray-600 bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled readOnly
                 value={userDetails.username}/>
          </div>Mobile : 
          <div className="relative m-3"> 
                <input type="text"  id="Email" placeholder="Email" className="ml-2 md:w-1/2 cursor-not-allowed h-9 sm:h-11 px-2 pb-3 pt-3  text-sm text-gray-600 bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" disabled readOnly
                 value={userDetails.mobile}/>
          </div>
          {/* <div className="mt-3 m-2">
            Number of transactions : {localStorage.getItem("accNot")}
          </div> */}
           </div>
          ) : (
            <div className="">
              <form className="bg-offblck text-gray-50" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col m-1">
              <div className="relative m-1">
                <input type="password"  id="password" placeholder="Current password" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 text-md  md:w-1/2 text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...register("password")}
                />
                <label
                  htmlFor="password" className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Current password{" "}
                </label>
              </div>
              <div className="ml-1">
                {errors.password && (
                  <span className="text-xs text-rose-500">{errors.password?.message}</span>
                )}
              </div>
             </div>
             <div className="flex flex-col m-1">
            <div className="relative m-1">
              <input type="password"id="newPassword" placeholder="New password" className="h-10 sm:h-11 px-2.5 pb-2.5 pt-4 text-md md:w-1/2 text-white bg-transparent rounded-lg border-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("newPassword")}
              />
              <label
                htmlFor="password" className="absolute text-md md:text-lg  text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-offblck px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                New password{" "}
              </label>
            </div>
            <div className="ml-1">
              {errors.password && (
                <span className="text-xs text-rose-500">{errors.password?.message}</span>
              )}
            </div>
          </div>
            <button className="mt-4 ml-2 justify-center text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit" onClick={()=> {setTimeout(() => {
                onSubmit
              }, 1);} }>
              <Toaster />Change password
            </button>
          
        </form>
            </div>
          )}
        </div>
      </div>
  
    </div>
  );
}
