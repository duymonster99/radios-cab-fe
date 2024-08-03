// libraries
import { faClipboardList, faTable, faTv, faUser } from "@fortawesome/free-solid-svg-icons";

// components
import AdminLayout from "../../Components/Layout/AdminLayout";

// services
import { DataContext } from "../../Hooks/context";
import AppDriver from "./DriverApp";
import { getDriverService } from "../../Services/apiService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DataProvider } from "./DriverProvider";


export default function DriverAppLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <AppDriver />
            </AdminLayout>
        </DataProvider>
    )
}