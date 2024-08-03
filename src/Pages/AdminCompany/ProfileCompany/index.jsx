// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import ProfileCompany from './profile';
import { DataProvider } from '../CompanyProvider/DataProvider';


export default function ProfileCompanyLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <ProfileCompany />
            </AdminLayout>
        </DataProvider>
    );
}
