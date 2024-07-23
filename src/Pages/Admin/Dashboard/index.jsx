import { faClipboardList, faTable, faTv, faUser } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../../Hooks/context";
import AdminLayout from "../../../Components/Layout/AdminLayout";
import Dashboard from "./dashboard";

const DataProvider = ({ children }) => {
    const navName = [
        { id: 1, title: 'Dashboard', slug: '/admin', icon: faTv, iconColor: "text-[rgb(94,114,228)]" },
        { id: 2, title: 'User Manage', slug: '/admin/user', icon: faUser, iconColor: "text-[rgb(45,206,137)]" },
        { id: 3, title: 'Company Manage', slug: '/admin/company', icon: faTable, iconColor: "text-red-500" },
        { id: 4, title: 'Feedback Manage', slug: '/admin/feedback', icon: faClipboardList, iconColor: "text-violet-400" },
    ];

    const breadcrumb = "Dashboard"

    return (
        <DataContext.Provider value={{ navName, breadcrumb }}>
            {children}
        </DataContext.Provider>
    )
}

export default function DashboardLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <Dashboard></Dashboard>
            </AdminLayout>
        </DataProvider>
    )
}