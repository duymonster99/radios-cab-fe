// libraries
import { faClipboardList, faTable, faTv, faUser } from '@fortawesome/free-solid-svg-icons';

// components
import AdminLayout from '../../../Components/Layout/AdminLayout';
import TableAdminPage from '../../../Components/TableAdmin/table';

// services
import { DataContext } from '../../../Hooks/context';

const DataProvider = ({ children }) => {
    const [dataApi, setDataApi] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const navName = [
        { id: 1, title: 'Dashboard', slug: '/admin', icon: faTv, iconColor: 'text-[rgb(94,114,228)]' },
        { id: 2, title: 'User Manage', slug: '/admin/user', icon: faUser, iconColor: 'text-[rgb(45,206,137)]' },
        { id: 3, title: 'Company Manage', slug: '/admin/company', icon: faTable, iconColor: 'text-red-500' },
        {
            id: 4,
            title: 'Feedback Manage',
            slug: '/admin/feedback',
            icon: faClipboardList,
            iconColor: 'text-violet-400',
        },
    ];

    const columns = [
        { accessorKey: 'id', header: 'Id' },
        { accessorKey: 'fullName', header: 'Họ tên' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'phone', header: 'Số điện thoại' },
        { accessorKey: 'isAdmin', header: 'Loại tài khoản' },
    ];

    const getAccount = () => getApi('user');
    const { data, isSuccess } = useQuery({ queryKey: ['getApis'], queryFn: getAccount });

    useEffect(() => {
        if (isSuccess) {
            setDataApi(data);
        }
    }, [data, isSuccess]);

    const breadcrumb = 'User';

    return (
        <DataContext.Provider value={{ navName, breadcrumb, dataApi, openForm, setOpenForm, setDataApi, columns }}>
            {children}
        </DataContext.Provider>
    );
};

export default function AccountLayout() {
    return (
        <DataProvider>
            <AdminLayout>
                <div className="w-full p-[1.5rem] mx-auto">
                    <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                        <TableAdminPage />
                    </div>
                </div>
            </AdminLayout>
        </DataProvider>
    );
}
