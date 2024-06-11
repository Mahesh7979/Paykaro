import { useRecoilValue } from "recoil";
import { transHistoryAtom } from "../atoms/transHistoryAtom";
import Loader from "./Loader";

export default function Lasttrans() {
  const trans = useRecoilValue(transHistoryAtom);
  if (!trans) {
    return <Loader />; // Display a loader while user data is being fetched
  }
  return (
    <div className=" ml-8 mt-6 rounded-xl  text-offblck font-medium ">
      <div className="p-1 mb-1">
        <div className="bg-blu text-sm md:text-md p-2 text-white font-bold w-max rounded-xl">
          Last Transactions
        </div>
      </div>
      <div className="h-96 md:h-64 mr-6  overflow-auto no-scrollbar text-white p-2 bg-blcksh rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {Object.keys(trans).length === 0 ? (
          <div className="m-20">
            <div className=" flex justify-center items-center">
              No transactions YET
            </div>
          </div>
        ) : (
          trans
            .slice()
            .reverse()
            .map((t, index) => (
              <div
                key={index}
                className="flex p-4 border-b-[1px] border-gray-500 "
              >
                {t.transactionType == "credit" ? (
                  
                    <div className="p-2 h-2/3 rounded-2xl bg-amber-300 text-white mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.3"
                        stroke="currentColor"
                        className="w-7 h-7 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
                        />
                      </svg>
                    </div>
                  
                ) : (
                 
                    <div className="p-2  h-2/3 rounded-2xl bg-amber-300 text-white mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.3"
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                )}
                <div className="w-full  grid grid-cols-3 md:grid-cols-4">
                <div className="flex col-span-2 md:col-span-1">
                      <div className="rounded-full w-11 text-center bg-blu p-2">
                        {t.toOrFrom[0].toUpperCase()}
                      </div>
                      <div className="w-1 p-2">{t.toOrFrom}</div>
                    </div>
                <div className="p-2 flex justify-end md:justify-center">{"₹" + t.amount}</div>
                <div className="col-span-2 md:col-span-1 p-2">{t.timestamp.slice(0, 10)}</div>
                <div className="text-green-400 p-2 flex justify-end md:justify-center">{t.status}</div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
