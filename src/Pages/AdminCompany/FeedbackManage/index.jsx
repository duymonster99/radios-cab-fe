// libraries
import { faClipboardList, faTable, faTv, faUser } from '@fortawesome/free-solid-svg-icons';

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import TableAdminPage from '../../../Components/TableAdmin/table';

// services
import { DataContext } from '../../../Hooks/context';

const DataProvider = ({ children }) => {
    const navName = [
        { id: 1, title: 'Dashboard', slug: '/admin-company', icon: faTv, iconColor: 'text-[rgb(94,114,228)]' },
        {
            id: 2,
            title: 'Driver Manage',
            slug: '/admin-company/driver',
            icon: faUser,
            iconColor: 'text-[rgb(45,206,137)]',
        },
        {
            id: 3,
            title: 'Feedback Driver',
            slug: '/admin-company/feedback',
            icon: faClipboardList,
            iconColor: 'text-violet-400',
        },
        { id: 4, title: 'Profile', slug: '/admin-company/profile', icon: faTable, iconColor: 'text-red-500' },
    ];

    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'name', header: 'User Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'content', header: 'Description' },
    ];

    const breadcrumb = 'Feedback Manage';

    return <DataContext.Provider value={{ navName, breadcrumb, columns }}>{children}</DataContext.Provider>;
};

export default function FeedbackDriverLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'name', header: 'User Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'content', header: 'Description' },
    ];
    
    return (
        <DataProvider>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableAdminPage />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
