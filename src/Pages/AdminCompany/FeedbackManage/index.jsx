// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import TableFeedbackOfMyDriver from './components/TableFeedbackCompany';

// services
import { DataProvider } from '../CompanyProvider/DataProvider';

export default function FeedbackDriverLayout() {
    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'name', header: 'User Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'description', header: 'Description' },
        { accessorKey: 'rating', header: 'Rating' },
    ];

    const breadcrumb = "Feedback Driver"
    
    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableFeedbackOfMyDriver columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
