import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

const CompanyContext = createContext();

const AuthCompany = ({ path, children }) => {
    // ? ------------------------------------ deps ------------------------------
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    // ? -------------------------------------- get jwt token ------------------------
    const tokenStorage = localStorage.getItem('tokenCompany');

    // check token exist ?
    useEffect(() => {
        if (tokenStorage === null || tokenStorage === undefined || tokenStorage === '') {
            navigate('/login/company');
        } else {
            const { role } = jwtDecode(tokenStorage);
            if (role === 'Company') {
                setIsAuthenticated(true);
            }
            else {
                navigate(path);
            }
        }
    }, [tokenStorage, navigate]);

    if (!isAuthenticated) {
        return null; // Or you can return a loading spinner or some placeholder
    }

    return <>{children}</>;
};

export default AuthCompany;
