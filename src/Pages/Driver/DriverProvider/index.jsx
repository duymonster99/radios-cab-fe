// libraries
import { jwtDecode } from 'jwt-decode';
import { faClipboardList, faTable, faTv, faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// services
import { DataContext } from '../../../Hooks/context';
import { getOneDriverService } from '../../../Services/apiService';

export const DataProvider = ({ children }) => {
    const [driver, setDriver] = useState({})
    // ? -------------------------------------- get jwt token ------------------------
    const tokenStorage = localStorage.getItem('tokenDriver');
    const { unique_name } = jwtDecode(tokenStorage);

    // ? ------------------------ gte one driver -------------------------
    // const fetchOneCompany = async () => {
    //     await fetch(`http://localhost:5192/api/AdminReferenceAction/company/${unique_name}`)
    //             .then((res) => res.json())
    //             .then((data) => setCompany(data))
    //             .catch((error) => console.log(error))
    // }

    const getOneDriver = () => getOneDriverService(`Admin/getDriverById/${unique_name}`)
    const { data, isSuccess, isPending } = useQuery({
        queryKey: ['getOneDriver'],
        queryFn: getOneDriver,
        retry: false
    })

    useEffect(() => {
        if (isSuccess) {
            setDriver(data.data)
        }
    }, [data, isSuccess, isPending])
    

    const navName = [
        { id: 1, title: 'Dashboard', slug: '/app-driver/dashboard', icon: faTv, iconColor: 'text-blue-500' },
        { id: 2, title: 'Driver', slug: '/app-driver', icon: faUser, iconColor: 'text-green-500' },
        { id: 3, title: 'Profile', slug: '/app-driver/profile', icon: faTable, iconColor: 'text-orange-500' },
        { id: 3, title: 'Feedback', slug: '/app-driver/feedback', icon: faClipboardList, iconColor: 'text-violet-500' },
    ];

    const filteredNav = navName;

    const breadcrumb = 'Dashboard';

    const nameSidebar = 'Dashboard Driver';

    return <DataContext.Provider value={{ filteredNav, breadcrumb, nameSidebar, driver }}>{children}</DataContext.Provider>;
};
