
import { Link, useLocation } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { BiTransferAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
export default function Sidebar({ show, setter }) {
    const location = useLocation();  
    const className = "bg-blck h-screen w-[170px] sm:w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40  flex flex-col items-center";
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    
    const MenuItem = ({ icon, name, route }) => {
      
        const colorClass = location.pathname === route ? "text-gray-100 bg-blu rounded-xl" : "text-white/50 hover:text-white";

        return (
            <Link
                to={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex text-sm md:text-md justify-start py-4 px-2 my-1 font-poppins font-extrabold ${colorClass}`}
            >  <div className="text-xl flex [&>*]:mx-auto w-[30px]">
            {icon}
        </div>
                <div>{name}</div>
            </Link>
        )
    }

   
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 `}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="p-3 flex">
                    <Link to="/">
                    <div className="bg-blu inline-block text-transparent bg-clip-text p-1 font-poppins font-extrabold text-2xl md:text-4xl cursor-pointer">
                       PayKaro
                    </div>
                    </Link>
                </div>
                <div className="flex flex-col mt-24 h-full">
                    <MenuItem
                        name="Home"
                        route="/dashboard"
                        icon={<TiHome />}
                    />
                    <MenuItem
                        name="Transfer"
                        route="/pay"
                        icon={<BiTransferAlt />}
                    />
                    <MenuItem
                        name="Settings"
                        route="/settings"
                        icon={<IoMdSettings />}
                    />
                    <MenuItem
                        name="Logout"
                        route="/logout"
                        icon={<TbLogout2 />}
                    />
                </div>
                <div className=''></div>
            </div>
            {show ? <ModalOverlay /> : null}
        </>
    )
}
