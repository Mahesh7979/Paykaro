// @/components/Layout/index.js
import { useState } from 'react'
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';

export default function Layout() {

    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            <div className="min-h-screen">
                <div className="flex">
                    <MenuBarMobile setter={setShowSidebar} />
                    <Sidebar show={showSidebar} setter={setShowSidebar} />
                </div>
            </div>
        </>
    )
}
