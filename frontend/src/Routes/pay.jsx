import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MeIcon from "../components/MeIcon";
import Loader from "../components/Loader";
import { useRecoilValue } from "recoil";
import { transHistoryAtom } from "../atoms/transHistoryAtom";
const baseUrl = "https://paykaro.vercel.app";

export default function Pay() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  let trans =useRecoilValue(transHistoryAtom);
  if(trans == null) {
    const transFromLocalStorage = localStorage.getItem("trans");
    trans = JSON.parse(transFromLocalStorage) 
  }
  
  useEffect(() => {
    axios
      .get(baseUrl+"/api/v1/user/bulk?filter=" + filter,{
        headers:{
          Authorization : 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setUsers(res.data.fil);
        setLoading(false); // Set loading to false after fetching data
      });

       // Store trans in local storage
    localStorage.setItem("trans", JSON.stringify(trans));
  }, [filter]);

  return (
    <div className="bg-offblck h-screen w-full overflow-auto">
      <div className="p-4 ">
      <div className="max-w-md mx-auto bg-black ">
    <div className="fixed right-4 sm:right-60 md:right-32 lg:right-80 flex items-end sm:items-center w-74 md:w-96 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> */}
        </svg>
      </div>

      <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search someone.."
        onChange={(e)=>{
          setFilter(e.target.value);
        }}
      />
    </div>
  </div>
        {loading ? (
          <Loader />
        ) : (
          <UserList filter={filter} trans={trans} users={users}/>
        )}
      </div>
    </div>
  );
}

function UserList({ filter, trans, users}) {
  return (
    <div className="mt-24 h-96 overflow-auto no-scrollbar">
      {filter === "" ?
         trans.length ===0 ? (
            <div>
          <div className="text-blu font-poppins font-extrabold text-3xl ml-48 mb-10">No transactions</div>

              </div>
         )
         : (

        <div className="mt-20 h-96 overflow-auto no-scrollbar">
          <div className="text-blu font-poppins font-extrabold text-2xl sm:text-3xl ml-6 sm:ml-16 lg:ml-48 mb-10">Recent transactions</div>
          {trans
            .filter(
              (user, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.toOrFrom === user.toOrFrom &&
                    t.toOrFromId === user.toOrFromId
                )
            )
            .map((user) => (
              <User
                key={`${user.toOrFrom}_${user.toOrFromId}`}
                firstname={user.toOrFrom}
                userId={user.toOrFromId}
                send={"send again"}
              />
            ))}
        </div>
      ) :(  
        users
          .map((user) => (
            <User
              key={user.userId}
              firstname={user.firstname}
              userId={user.userId}
              send={"send money"}
            />
          ))
      )}
    </div>
  );
}

const User = ({ firstname, userId, send }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center m-5">
      <div className="flex justify-between w-4/5 sm:w-2/3 ">
        <div className="flex items-center">
          <MeIcon letter={firstname[0].toUpperCase()} />
          <div className="font-poppins text-white font-bold m-1">
            {firstname}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <button
          className="flex text-white bg-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-3 py-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              navigate(
                `/pay/transfer?userId=${userId}&name=${firstname}`
              );
            }}
          >{send}</button>
        </div>
      </div>
    </div>
  );
};

// Exporting UserList and MemoizedUser for better organization
export { UserList };
