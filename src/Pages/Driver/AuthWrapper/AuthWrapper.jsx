import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompanyContext = createContext();

const AuthDriver = ({ path, children }) => {
    // ? ------------------------------------ deps ------------------------------
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation()

    // ? -------------------------------------- get jwt token ------------------------
    const tokenStorage = localStorage.getItem('tokenDriver');

    // check token exist ?
    useEffect(() => {
        if (tokenStorage === null || tokenStorage === undefined || tokenStorage === '') {
            navigate('/login/driver');
        } else {
            const { role } = jwtDecode(tokenStorage);
            if (role === 'Driver') {
                setIsAuthenticated(true);
            }
            else {
                if (pathname === '/app-driver/additional-profile') {
                    navigate('/login/driver')
                }
                else{
                    navigate(path);
                }
            }
        }
    }, [tokenStorage, navigate]);

    if (!isAuthenticated) {
        return null; // Or you can return a loading spinner or some placeholder
    }

    return <>{children}</>;
};

export default AuthDriver;
