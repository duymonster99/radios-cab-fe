// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import { DataProvider } from '../CompanyProvider/DataProvider';
import Dashboard from './dashboard';

export default function DashboardLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <Dashboard></Dashboard>
            </AdminLayout>
        </DataProvider>
    );
}
