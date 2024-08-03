// libraries
import { faClipboardList, faTable, faTv, faUser } from '@fortawesome/free-solid-svg-icons';

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import ProfileDriverApp from './profile';

// services
import { DataContext } from '../../../Hooks/context';
import { DataProvider } from '../DriverProvider';

export default function ProfileCompanyLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <ProfileDriverApp />
            </AdminLayout>
        </DataProvider>
    );
}
