// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import { DataProvider } from '../CompanyProvider/DataProvider';
import Dashboard from './dashboard';

export default function DashboardLayout() {
    const breadcrumb = "Dashboard"

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <Dashboard></Dashboard>
            </AdminLayout>
        </DataProvider>
    );
}
