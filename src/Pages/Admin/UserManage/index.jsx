// libraries

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import DataProvider from '../DataProvider/DataProvider';
import TableUserAdmin from './Table';

export default function AccountLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'fullName', header: 'User Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'mobile', header: 'Mobile' },
    ];

    const breadcrumb = "User Manage"

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableUserAdmin columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
