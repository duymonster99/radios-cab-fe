// libraries

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import { DataProvider } from '../CompanyProvider/DataProvider';

// services
import TableDriver from './components/TableDriver';

export default function DriverManageLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'driverFullName', header: 'Driver Name' },
        { accessorKey: 'driverMobile', header: 'Driver Mobile' },
        { accessorKey: 'driverEmail', header: 'Driver Email' },
        { accessorKey: 'isActive', header: 'Profile Status' },
    ];

    return (
        <DataProvider>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableDriver columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
