import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms/isUserAtom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function Logout() {
  const setUser = useSetRecoilState(isUserAtom);
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-offblck flex items-center justify-center ">
      <div className="mb-32 md:mb-10 p-4 sm:p-10 bg-charco shadow-[0_8px_30px_rgb(0,0,0,0.12)]  rounded-md  w-[300px] md:w-[500px] text-center overflow-y-auto">
        <div className="flex justify-center items-center sm:inline-block">
        <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
          </svg>
        </span>

        <h3 className="ml-2 font-poppins mb-5 text-2xl font-bold text-gray-100">Sign out</h3>
        </div>
        <p className="font-poppins text-gray-300 text-xs sm:text-sm">
          Are you sure you would like to sign out of your account?
        </p>

        <div className="mt-6 flex justify-center gap-x-4">
          <button type="Signout"   onClick={() => {
            setTimeout(() => {
              toast.success("Logged out successfully");
            }, 10)
     localStorage.removeItem("token");
     localStorage.removeItem("userDetails");
     localStorage.removeItem("trans");
     localStorage.removeItem("not");
     localStorage.removeItem("accDetails");
     
     
     setUser(null);
   }} className="text-white bg-700 m-4 mr-0 hover:bg-rose-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-rose-600 dark:hover:bg-rose-700 focus:outline-none dark:focus:ring-rose-800">
    <Toaster/>
    Signout</button>
          <button className="text-white bg-700 m-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
             onClick={()=>{
              navigate('/dashboard')
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
