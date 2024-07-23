import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApiService2 } from '../../../Services/apiService';
import TableAdminPage from '../../../Components/TableAdmin/table';
import { DataContext } from '~/Hooks/context';

const CompanyProvider = ({ children }) => {
    const [dataApi, setDataApi] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'companyName', header: 'Company Name' },
        { accessorKey: 'companyTaxCode', header: 'Company Tax Code' },
        { accessorKey: 'companyEmail', header: 'Company Email' },
        { accessorKey: 'contactPerson', header: 'Contact Person' },
        { accessorKey: 'contactPersonNumber', header: 'Contact Person Phone' },
    ];

    const titleModal = 'Create new Account';
    const page = 'CompanyAdmin';

    const getCompany = () => getApiService2('Admin/getCompanies');
    const { data, isSuccess } = useQuery({ queryKey: ['getCompany'], queryFn: getCompany });

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

export default function CompanyLayout() {
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
