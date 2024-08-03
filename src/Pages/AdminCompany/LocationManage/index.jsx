// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import { DataProvider } from '../CompanyProvider/DataProvider';
import TableCompanyLocation from './TableLocation';

export default function LocationCompanyLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'cityService', header: 'Location Service' },
    ];
    
    return (
        <DataProvider>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableCompanyLocation columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
