import { faClipboardList, faTable, faTv, faUser } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../../Hooks/context";
import AdminLayout from "../../../Components/Layout/AdminLayout";
import Dashboard from "./dashboard";
import DataProvider from "../DataProvider/DataProvider";

export default function DashboardLayout() {
    const breadcrumb = "Dashboard"

    return (
        <DataProvider breadcrumb={breadcrumb} >
            <AdminLayout>
                <Dashboard />
            </AdminLayout>
        </DataProvider>
    )
}