import { useNavigate } from "react-router-dom";
// import NavBar from "../components/NavsBar";
import MySvg from "../assets/demo-ss-home.png";
import MyMobileSvg from '../assets/demo-ss-home-mobile.png'
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-full bg-oxblu ">
      <nav className="w-screen h-20 bg-black flex justify-between md:justify-around items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] fixed ">
        <div className="p-2 ">
          <span className="text-blu font-poppins font-extrabold text-3xl  md:text-4xl text-center">
            Paykaro
          </span>
        </div>
        <div className="h-9 mr-2  md:h-12 flex justify-between">
          <button
            type="Signin"
            onClick={() => {
              navigate("/signin");
            }}
            className="mr-2 p-2 inline-flex justify-center items-center  rounded-md  border-transparent font-poppins font-semibold bg-offblck text-gray-100 hover:bg-blck border-2 hover:border-gray-50  transition-all text-xs md:text-sm"
          >
            Signin
          </button>
          <button
             className="p-2 inline-flex justify-center items-center  rounded-md  border-transparent font-poppins font-semibold bg-blue-600 text-gray-100 hover:bg-blue-700   transition-all text-xs md:text-sm"
            onClick={() => {
              navigate("/signup");
            }}
          >get started</button>
        </div>
      </nav>
      <body className="mt-28 m-10 sm:ml-15 md:ml-28 lg:ml-64 ">
        <div className="text-gray-100 font-poppins font-extrabold text-2xl md:text-4xl ">
          The <br></br>
          <p className="text-4xl md:text-6xl text-offblu mb-1">seamless & secure</p>
          payment solution <br></br>
        </div>

        <div className="hidden md:flex w-4/5 mt-9 mb-7">
          {/* <MySvg/> */}
          <img
            src={MySvg}
            className="rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          ></img>
        </div>
        <div className="w-7/8 p-3 md:hidden mt-9 mb-7 flex justify-center" >
          {/* <MySvg/> */}
          <img
            src={MyMobileSvg}
            className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          ></img>
        </div>
        <div className="text-gray-100 font-poppins font-extrabold text-2xl md:text-4xl text-right sm:mr-10 md:mr-28 lg:mr-52">
          that puts <br></br>
          <p className="text-4xl  md:text-6xl text-offblu mt-1 mb-1">convenience</p>
          at your fingertips.<br></br>
        </div>
        <div className="text-gray-100 font-poppins font-extrabold text-2xl md:text-4xl mt-20 md:mt-32 text-center md:text-center md:mr-28  lg:text-left ">
          Experience hassle-free payments today with<br> 
          </br>
          <div className="mt-3 text-blu font-poppins font-extrabold text-5xl md:text-6xl ">
            {" "}
            Paykaro!{" "}
          </div>
        </div>
        <div className="md:pr-40 mt-16 mb-32">
          <div className="text-center text-gray-200 font-poppins font-extrabold text-3xl mb-3" >
            Click here & 
          </div>
          <div className="flex justify-center">
          <button
             className="p-2 flex justify-center items-center  rounded-md  border-transparent font-poppins font-semibold bg-blue-600 text-gray-100 hover:bg-blue-700   transition-all text-xs md:text-sm"
            onClick={() => {
              navigate("/signup");
            }}
          >get started</button>
          </div>
        </div>
      </body>
      <footer className="h-40 bg-blck">
        <Footer/>
      </footer>
      <Toaster/>
    </div>
    // <>
    // <NavBar/>
    // </>
  );
}
