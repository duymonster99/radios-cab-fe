// components
import AdminLayout from "../../../Components/Layout/AdminLayout";

// services
import DataProvider from "../DataProvider/DataProvider";
import ProfileAdmin from "./profile";

export default function ProfileCompanyLayout() {
    const breadcrumb = "Profile Admin"
    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <ProfileAdmin />
            </AdminLayout>
        </DataProvider>
    );
}
