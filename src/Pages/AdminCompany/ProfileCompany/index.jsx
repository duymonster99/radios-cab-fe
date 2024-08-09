// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import ProfileCompany from './profile';
import { DataProvider } from '../CompanyProvider/DataProvider';


export default function ProfileCompanyLayout() {
    const breadcrumb = "Profile"

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <ProfileCompany />
            </AdminLayout>
        </DataProvider>
    );
}
