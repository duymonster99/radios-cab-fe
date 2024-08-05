// libraries

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';

// services
import DataProvider from '../DataProvider/DataProvider';
import TableFeedback from './TableFeedback';

export default function FeedbackManage() {
    const columns = [
        { accessorKey: 'name', header: 'User Name' },
        { accessorKey: 'email', header: 'User Email' },
        { accessorKey: 'text', header: 'Description' },
    ];

    const breadcrumb = "Feedback Manage"

    return (
        <DataProvider breadcrumb={breadcrumb}>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableFeedback columns={columns} />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
