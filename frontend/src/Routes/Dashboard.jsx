import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Lasttrans from "../components/Lasttrans";
import Loader from "../components/Loader";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { transHistoryAtom } from "../atoms/transHistoryAtom";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const setTransH = useSetRecoilState(transHistoryAtom);
  const userDetails =JSON.parse( localStorage.getItem("userDetails") ); //userDetails this was set when user logged in / registerd.
  const [balance , setBalance] = useState("xxxx"); //balance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/user',{
          headers:{
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }
        }); 
        setBalance(response.data.accBalance); //set to balance state
        localStorage.setItem("accNot",response.data.accNot);
        setTransH(response.data.history); //set to recoilAtom
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [ setTransH]);

  if (!userDetails) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full  bg-offblck text-white">
      <div className="bg-offblck flex justify-between m-2 ml-14 md:ml-8">
        <div className="font-poppins font-bold text-4xl p-1">Dashboard</div>
        <div className="flex items-center">
          <button className="hidden sm:flex text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           onClick={() => navigate("/pay")}>Pay</button>
          <div className="hidden sm:flex ml-3 mr-1 font-poppins font-bold text-3xl ">
            Hello{" "}
          </div>
          <a><div className='bg-blu pt-1 h-7 w-7 rounded-full  text-center text-white font-poppins font-bold cursor-pointer ' onClick={()=>{
            navigate('/settings')
          }}>{userDetails.firstname[0].toUpperCase()}</div></a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row m-6">
        <Card title="Available balance" des={"₹" + balance } />
        <Card title="Welcome back!!" des={userDetails.firstname} />
      </div>
      <Lasttrans />
      <div className="bg-offblck flex justify-center">
        <button className="w-4/5 fixed bottom-4  sm:hidden  text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md  py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
           onClick={() => navigate("/pay")}>
            Pay</button>
      </div>
      <Toaster/>
    </div>
  );
}
