import AdminLayout from "../../../Components/Layout/AdminLayout";
import DataProvider from "../DataProvider/DataProvider";
import TableAds from "./TableAdvertisement";

const AdvertisementAdmin = () => {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'imageUrl', header: 'Image' },
        { accessorKey: 'description', header: 'Description' },
        { accessorKey: 'companyId', header: 'Company' },
    ];

    const breadcrumb = 'Advertisement Manage'

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableAds columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}

export default AdvertisementAdmin