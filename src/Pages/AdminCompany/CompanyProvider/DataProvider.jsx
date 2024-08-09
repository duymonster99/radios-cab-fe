// libraries
import { jwtDecode } from 'jwt-decode';
import {
    faClipboardList,
    faIdCard,
    faNewspaper,
    faRectangleAd,
    faTable,
    faTv,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// services
import { DataContext } from '../../../Hooks/context';

export const DataProvider = ({ children, breadcrumb }) => {
    const [company, setCompany] = useState({});
    // ? -------------------------------------- get jwt token ------------------------
    const tokenStorage = localStorage.getItem('tokenCompany');
    const { unique_name } = jwtDecode(tokenStorage);

    // ? ------------------------ gte one company -------------------------
    const fetchOneCompany = async () => {
        await fetch(`http://localhost:5192/api/AdminReferenceAction/company/${unique_name}`)
            .then((res) => res.json())
            .then((data) => setCompany(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchOneCompany();
    }, []);

    const { companyName, membershipType } = company;

    const navName = [
        { id: 1, title: 'Dashboard', slug: '/admin-company', icon: faTv, iconColor: 'text-[rgb(94,114,228)]' },
        { id: 2, title: 'Profile', slug: '/admin-company/profile', icon: faUser, iconColor: 'text-blue-500' },
        {
            id: 3,
            title: 'Service Type',
            slug: '/admin-company/service-type',
            icon: faTable,
            iconColor: 'text-orange-500',
        },
        {
            id: 4,
            title: 'Location Service',
            slug: '/admin-company/location-service',
            icon: faClipboardList,
            iconColor: 'text-red-500',
        },
        {
            id: 5,
            title: 'New Driver',
            slug: '/admin-company/new-driver',
            icon: faNewspaper,
            iconColor: 'text-yellow-500',
        },
        {
            id: 5,
            title: 'Driver Manage',
            slug: '/admin-company/driver',
            icon: faIdCard,
            iconColor: 'text-[rgb(45,206,137)]',
        },
        {
            id: 6,
            title: 'Feedback Driver',
            slug: '/admin-company/feedback',
            icon: faNewspaper,
            iconColor: 'text-violet-400',
        },
        {
            id: 7,
            title: 'Advertisement Manage',
            slug: '/admin-company/advertisement',
            icon: faRectangleAd,
            iconColor: 'text-gray-400',
        },
    ];

    const getFilteredNav = (membershipType) => {
        switch (membershipType) {
            case 'Standard':
                return navName.slice(0, 4); // Show first 2 items for basic membership
            case 'Plus':
                return navName.slice(0, 7); // Show first 3 items for premium membership
            case 'Premium':
                return navName; // Show all items for vip membership
            default:
                return [];
        }
    };

    const filteredNav = getFilteredNav(membershipType);

    const nameSidebar = 'Dashboard Company';

    return (
        <DataContext.Provider value={{ filteredNav, breadcrumb, nameSidebar, companyName, company }}>
            {children}
        </DataContext.Provider>
    );
};
