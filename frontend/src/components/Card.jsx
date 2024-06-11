export default function Card(props) {
    return (
      <div
      className="flex flex-col  gap-3 h-28 mt-3   md:h-40 ml-5 w-72 text-gray-100 rounded-xl shadow-xl p-3 md:p-7  bg-charco">
      <div className="font-semibold text-md md:text-xl">{props.title}</div>
      <div className="font-semibold text-2xl md:text-5xl tracking-tight font-poppins">{props.des}</div>
  </div>
    )
  
}









// (
//   <div className="md:ml-3 m-2 bg-charco shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-gray-100 w-52 h-32 md:w-72 md:h-44 rounded-lg ">
//               <div className="text-xl md:text-3xl font-semibold p-3 ">{props.title}</div>
//               <div className="text-lg md:text-2xl font-semibold p-3">{props.des}</div>
//       </div>
//         )