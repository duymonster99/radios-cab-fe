// libraries

// components
import AdminLayout from "../../../Components/Layout/AdminLayout";

// services
import DataProvider from "../DataProvider/DataProvider";
import TableNewCompanyAdmin from "./TableNewCompany";

export default function NewCompanyManage() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'companyName', header: 'Company Name' },
        { accessorKey: 'companyEmail', header: 'Company Email' },
        { accessorKey: 'companyTaxCode', header: 'Company Tax Code' },
        { accessorKey: 'isActive', header: 'Status' },
    ];

    const breadcrumb = "New Company Manage"

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableNewCompanyAdmin columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    )
}