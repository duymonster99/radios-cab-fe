// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import { DataProvider } from '../CompanyProvider/DataProvider';
import TableAdminPage from '../../../Components/TableAdmin/table';
import TableCompanyType from './TableType';

export default function TypeCompanyLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'serviceType', header: 'Service Type Name' },
    ];

    const breadcrumb = "Service Type"
    
    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableCompanyType columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
