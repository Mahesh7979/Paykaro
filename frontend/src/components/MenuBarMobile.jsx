// @/components/Layout/MenuBarMobile.js
import { FiMenu as Icon } from 'react-icons/fi'

// import logo from '@/img/logo.svg'

export default function MenuBarMobile({ setter }) {
    return (
        <span className="md:hidden absolute w-14 bg-offblck px-2">
            <button
                className="text-4xl flex text-white mt-3"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <Icon />
            </button>
        </span>
    )
}
