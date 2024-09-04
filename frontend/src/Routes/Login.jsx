import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isUserAtom } from "../atoms/isUserAtom";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import {z} from 'zod';
const baseUrl = import.meta.env.BASE_URL;
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export default function Login() {
  const setUser = useSetRecoilState(isUserAtom);
  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email(
    { message: "Invalid email address" }).refine(value=>/^[a-z0-9_]+@gmail\.com$/.test(value),{
    message : "Invalid email address"}),
    password: z.string().min(4, { message: "Password must be at least 4 characters" }),
  });

  const {
    register, handleSubmit, formState: { errors },} = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit =  async (data) => {
    try {
      const res = await axios.post(`${baseUrl}+/api/v1/user/signin`, {
        username: data.email,
        password: data.password,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userDetails", JSON.stringify(res.data.user));
        localStorage.setItem("accBalance", res.data.accBalance);
        localStorage.setItem("accNot", res.data.accNot);
        setUser(true);
        navigate("/dashboard");
        setTimeout(() => {
          toast.success(`${res.data.msg}`);
        }, 10);
      }
      else{
      toast.error(`${res.data.msg}`);
      }  
    } 
    catch (error) {
      toast.error("An error occurred. Please try again later.");
      // console.log(`${baseUrl}`);
    }
  };
  
  
  return (
    <div >
    <nav>
    <a href="#" className="w-full bg-offblck flex justify-center items-center text-5xl font-extrabold font-poppins text-blu absolute h-16 rounded-b-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
       Paykaro
    </a>
    </nav>
    <div className="flex bg-gray-900">
      <section className="w-screen lg:w-1/2  ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="lg:w-2/3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-offblck dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="bg-offblck text-gray-50" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col m-1 ">
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
   
   <div className="flex flex-col m-1">
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
        <div className="flex justify-center">
        <button
                className="text-white bg-700 m-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                 type="submit"
                 onClick={()=>{
                  setTimeout(() => {
                    onSubmit
                  }, 1);  
                }
                 }><Toaster/>Login</button>
               </div>
   </form>
               
                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                  New user ?{" "}
                  <Link className="text-blu underline" to="/signup">
                    {" "}
                    register
                  </Link>{" "}
                  here
                </p>
            
            </div>
          </div>
        </div>
      </section>

      <section className="w-1/2 lg:flex justify-center bg-gray-900 hidden">
      <div className="hidden md:flex  w-full flex-col justify-center  rounded-3xl text-center  ">
    <div className="flex  flex-col justify-center mb-30 lg:mb-23 p-10 text-offblu">
      <div className="text-3xl  lg:text-5xl font-poppins font-extrabold mb-10 ">
      Welcome Back to Paykaro!
      </div>
      <div className=" text-2xl  lg:text-3xl font-poppins font-extrabold mb-10">
      Sign in to access your account and manage your transactions with ease.
      </div>
    </div>
  </div>
      </section>
      </div>
    </div>
  );
}
