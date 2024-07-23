// libraries
import { useContext } from "react"

// components
import SideBar from "../../SideBar/sidebar"
import HeaderAdmin from "../../Header/Admin/header"

// services
import { DataContext } from "../../../Hooks/context"

const AdminLayout = ({ children }) => {
    const { breadcrumb } = useContext(DataContext)
    return (
        <div className="m-0 antialiased font-normal leading-[1.5] text-[1rem] bg-gray-50 text-slate-500 relative before:absolute before:z-0 before:w-full before:bg-[rgb(94,114,228)] before:min-h-[18.75rem] before:m-0">
            <SideBar />

            <main className="touch-auto xl:ml-[17rem] ease-in-out duration-200 transition-all rounded-[.75rem] max-h-screen h-full">
                <HeaderAdmin breadcrumb={breadcrumb}></HeaderAdmin>
                <div className="body text-[.875rem] z-[500]">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AdminLayout