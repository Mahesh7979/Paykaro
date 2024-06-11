

export default function MeIcon(props) {
  return (
    <a><div className='bg-blu pt-1 h-7 w-7 rounded-full  text-center text-white font-poppins font-bold cursor-pointer ' onClick={props.onClick}>{props.letter}</div></a>
  )
}
