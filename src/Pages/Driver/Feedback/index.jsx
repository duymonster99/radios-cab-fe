// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import { DataProvider } from '../DriverProvider';
import TableFeedbackDriver from './TableFeedback';

export default function FeedbackDriver() {
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
                        <TableFeedbackDriver columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
