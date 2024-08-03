import { faAdjust, faClipboardList, faIdCard, faNewspaper, faPaperclip, faTable, faTv, faUser } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { DataContext } from "../../../Hooks/context";
import { useEffect, useState } from "react";
import { getAdminService } from "../../../Services/apiService";
import { useQuery } from "@tanstack/react-query";

const DataProvider = ({ children, breadcrumb }) => {
    const [isLogout, setIsLogout] = useState(false)
    const [user, setUser] = useState({})

    // ? -------------------------------------- get jwt token ------------------------
    const tokenStorage = localStorage.getItem('tokenUser');
    const { unique_name } = jwtDecode(tokenStorage);
    
    const getUserById = () => getAdminService(`Admin/getUserById/${unique_name}`)

    const { data, isSuccess } = useQuery({
        queryKey: ['getUserById'],
        queryFn: getUserById,
        retry: false
    })

    // ? ----------------------------------- handle after get user -------------------------
    useEffect(() => {
        if (isSuccess) {
            setUser(data.data)
        }
    }, [data, isSuccess])    
    
    const navName = [
        { id: 1, title: 'Dashboard', slug: '/admin', icon: faTv, iconColor: "text-[rgb(94,114,228)]" },
        { id: 2, title: 'User Manage', slug: '/admin/user', icon: faUser, iconColor: "text-[rgb(45,206,137)]" },
        { id: 3, title: 'New Company', slug: '/admin/new-company', icon: faNewspaper, iconColor: "text-yellow-500" },
        { id: 3, title: 'Company Manage', slug: '/admin/company', icon: faTable, iconColor: "text-red-500" },
        { id: 4, title: 'Driver Manage', slug: '/admin/driver', icon: faIdCard, iconColor: "text-red-500" },
        { id: 5, title: 'Feedback Manage', slug: '/admin/feedback', icon: faClipboardList, iconColor: "text-violet-400" },
        { id: 5, title: 'Advertisement Manage', slug: '/admin/advertisement', icon: faAdjust, iconColor: "text-gray-400" },
        { id: 6, title: 'Profile', slug: '/admin/profile', icon: faPaperclip, iconColor: "text-orange-400" },
    ];

    const nameSidebar = 'Admin Dashboard';

    const filteredNav = navName;

    return (
        <DataContext.Provider value={{ navName, nameSidebar, breadcrumb, filteredNav, unique_name, setIsLogout, user }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider