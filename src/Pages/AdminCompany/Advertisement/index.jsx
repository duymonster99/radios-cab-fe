// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import { DataProvider } from '../CompanyProvider/DataProvider';
import TableAdv from './TableAdv';

export default function AdvertisementCompany() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'imageUrl', header: 'Image Adv' },
        { accessorKey: 'description', header: 'Description' },
    ];
    
    return (
        <DataProvider>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableAdv columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
