// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import { DataProvider } from '../DriverProvider';
import Dashboard from './dashboard';

export default function DriverDashboard() {
    return (
        <DataProvider>
            <AdminLayout>
                <Dashboard></Dashboard>
            </AdminLayout>
        </DataProvider>
    );
}
