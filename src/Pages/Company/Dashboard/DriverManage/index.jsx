// libraries
import { faTable, faTv, faUser } from "@fortawesome/free-solid-svg-icons";

// components
import HeaderAdmin from "../../../../Components/Header/Admin/header";
import SideBar from "../../../../Components/SideBar/sidebar";
import DriverManageLayout from "./components/DriverTable";

// services
import { DataContext } from "../../../../Hooks/context";

const DataProvider = ({ children }) => {
    const navName = [
        { id: 1, title: 'Dashboard', slug: '/company/dashboard', icon: faTv, iconColor: "text-[rgb(94,114,228)]" },
        { id: 2, title: 'Profile Company', slug: '/company/profile', icon: faUser, iconColor: "text-[rgb(45,206,137)]" },
        { id: 3, title: 'Driver Manage', slug: '/company/driver', icon: faTable },
    ];

    return (
        <DataContext.Provider value={{ navName }}>
            {children}
        </DataContext.Provider>
    )
}

export default function CompanyDashboard() {
    return (
        <div className="m-0 antialiased font-normal leading-[1.5] text-[1rem] bg-gray-50 text-slate-500 relative before:absolute before:z-0 before:w-full before:bg-[rgb(94,114,228)] before:min-h-[18.75rem] before:m-0">
            <DataProvider><SideBar /></DataProvider>

            <main className="touch-auto xl:ml-[17rem] ease-in-out duration-200 transition-all rounded-[.75rem] max-h-screen h-full">
                <HeaderAdmin breadcrumb="Manage Driver"></HeaderAdmin>
                <div className="body text-[.875rem] z-[500]">
                    <DriverManageLayout />
                </div>
            </main>
        </div>
    )
}