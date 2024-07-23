import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataContext } from '~/Hooks/context';
import { getApi } from '~/Services/apiService';
import TableAdminPage from '~/Pages/Admin/Foundations/table';

const CompanyProvider = ({ children }) => {
    const [dataApi, setDataApi] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const columns = [
        { accessorKey: '_id', header: 'Id' },
        { accessorKey: 'fullName', header: 'Company Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'phone', header: 'Số điện thoại' },
        { accessorKey: 'isAdmin', header: 'Loại tài khoản' },
    ];

    const titleModal = 'Create new Account';
    const page = 'Driver';

    const getDriver = () => getApi('user');
    const { data, isSuccess } = useQuery({ queryKey: ['getApis'], queryFn: getDriver });

    useEffect(() => {
        if (isSuccess) {
            setDataApi(data);
        }
    }, [data, isSuccess]);

    return (
        <DataContext.Provider value={{ dataApi, columns, titleModal, page, openForm, setOpenForm, setDataApi }}>
            {children}
        </DataContext.Provider>
    );
};

export default function DriverManageLayout() {
    return (
        <div className="w-full p-[1.5rem] mx-auto">
            <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                <CompanyProvider>
                    <TableAdminPage />
                </CompanyProvider>
            </div>
        </div>
    );
}
