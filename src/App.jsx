import React, { Suspense, useEffect, useState, lazy } from 'react';

// Libraries
import { Routes, Route, useLocation } from 'react-router-dom';
// import retina from 'retinajs';
import { AnimatePresence } from 'framer-motion';

// Context
import GlobalContext from './Context/Context';

// Components
import ScrollToTopButton from './Components/ScrollToTop';
import ClientLayout from './Components/Layout/ClientLayout';
import Page404 from './Pages/Client/Driver/Login/Oops.jsx';

// ? =================================================================== Public Route
const HomePage = lazy(() => import('./Pages/Client/Home'));
const CompanyClientPage = lazy(() => import('./Pages/Client/Company'));
const DriverClient = lazy(() => import('./Pages/Client/Driver'));
const DriverDetail = lazy(() => import('./Pages/Client/Driver/DetailPage'));
const CompanyDetail = lazy(() => import('./Pages/Client/Company/CompanyDetail'));
const CompanyPayment = lazy(() => import('./Pages/Client/Company/Payment'));
const SuccessPayment = lazy(() => import('./Pages/Client/Company/Payment/success'));
const Feedback = lazy(() => import('./Pages/Client/Feedback'));
const LoginClientPage = lazy(() => import('./Pages/Account'));
const LoginDriver = lazy(() => import('./Pages/Client/Driver/Login'));
const RegisterCompany = lazy(() => import('./Pages/Client/Company/FormRegister'));
const UserCompleteProfile = lazy(() => import('./Pages/Admin/CompleteProfile'));

//? ---------------------------------------------------------------------- Private Page
// Admin Web
const Dashboard = lazy(() => import('./Pages/Admin/Dashboard/index'));
const UserManage = lazy(() => import('./Pages/Admin/UserManage/index'));
const CompanyManage = lazy(() => import('./Pages/Admin/CompanyManage/index'));
const NewCompanyManage = lazy(() => import('./Pages/Admin/NewCompanyManage'));

// Company
import AuthCompany from './Pages/AdminCompany/AuthWrapper/AuthWrapper.jsx';
const LoginCompany = lazy(() => import('./Pages/AdminCompany/Login'));
const CompanyDashboard = lazy(() => import('./Pages/AdminCompany/Dashboard'));
const StepsCompanyInfo = lazy(() => import('./Pages/AdminCompany/UpdateInfo'));
const CompanyProfile = lazy(() => import('./Pages/AdminCompany/ProfileCompany'));
const CompanyManageDriver = lazy(() => import('./Pages/AdminCompany/DriverManage'));
const CompanyServiceType = lazy(() => import('./Pages/AdminCompany/ServiceTypeManage'));
const CompanyLocation = lazy(() => import('./Pages/AdminCompany/LocationManage'));

// Driver
import AuthDriver from './Pages/Driver/AuthWrapper/AuthWrapper.jsx';
const DriverDashboard = lazy(() => import('./Pages/Driver/Dashboard'));
const AppDriver = lazy(() => import('./Pages/Driver/index'));
const AppDriverProfile = lazy(() => import('./Pages/Driver/Profile'));
const StepsDriverInfo = lazy(() => import('./Pages/Driver/CompleteProfile'));

function App() {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customModal, setCustomModal] = useState({
        el: null,
        isOpen: false,
    });
    const location = useLocation();

    useEffect(() => {
        if (isModalOpen === true) {
            document.querySelector('body').classList.add('overflow-hidden');
        } else {
            document.querySelector('body').classList.remove('overflow-hidden');
        }
    }, [isModalOpen]);

    // Get the current location and set the window to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
        setFooterHeight(0);
        setCustomModal({
            ...customModal,
            el: null,
            isOpen: false,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    return (
        <GlobalContext.Provider
            value={{
                headerHeight,
                setHeaderHeight,
                footerHeight,
                setFooterHeight,
                isModalOpen,
                setIsModalOpen,
                customModal,
                setCustomModal,
            }}
        >
            <div className="App" style={{ '--header-height': `${headerHeight}px` }}>
                {
                    <main style={{ marginTop: headerHeight, marginBottom: footerHeight }}>
                        <ScrollToTopButton />
                        <AnimatePresence mode="wait">
                            <Suspense fallback={<></>}>
                                {/* Public Route */}
                                <Routes>
                                    <Route path="/404" element={<Page404 style={{ '--base-color': '#ff7a56' }} />} />
                                    <Route
                                        path="/"
                                        element={
                                            <ClientLayout>
                                                <HomePage style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/company"
                                        element={
                                            <ClientLayout>
                                                <CompanyClientPage style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/company/register"
                                        element={
                                            <ClientLayout>
                                                <RegisterCompany style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/company/register/payment"
                                        element={
                                            <ClientLayout>
                                                <CompanyPayment style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/company/register/payment/success"
                                        element={
                                            <ClientLayout>
                                                <SuccessPayment style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/driver"
                                        element={
                                            <ClientLayout>
                                                <DriverClient style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/login/company"
                                        element={
                                            <ClientLayout>
                                                <LoginCompany style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/driver-detail"
                                        element={
                                            <ClientLayout>
                                                <DriverDetail style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/company-detail"
                                        element={
                                            <ClientLayout>
                                                <CompanyDetail style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/feedback"
                                        element={
                                            <ClientLayout>
                                                <Feedback style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/login"
                                        element={
                                            <ClientLayout>
                                                <LoginClientPage style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/user/additional-profile"
                                        element={<UserCompleteProfile style={{ '--base-color': '#ff7a56' }} />}
                                    />

                                    {/* Supper Admin */}

                                    {/* Admin company */}
                                    <Route
                                        path="/admin-company"
                                        element={
                                            <AuthCompany path="/admin-company">
                                                <CompanyDashboard />
                                            </AuthCompany>
                                        }
                                    />

                                    <Route
                                        path="/admin-company/additional-profile"
                                        element={
                                            <AuthCompany path="/admin-company/additional-profile">
                                                <StepsCompanyInfo />
                                            </AuthCompany>
                                        }
                                    />

                                    <Route
                                        path="/admin-company/profile"
                                        element={
                                            <AuthCompany path="/admin-company/profile">
                                                <CompanyProfile />
                                            </AuthCompany>
                                        }
                                    />

                                    <Route
                                        path="/admin-company/service-type"
                                        element={
                                            <AuthCompany path="/admin-company/service-type">
                                                <CompanyServiceType />
                                            </AuthCompany>
                                        }
                                    />

                                    <Route
                                        path="/admin-company/location-service"
                                        element={
                                            <AuthCompany path="/admin-company/location-service">
                                                <CompanyLocation />
                                            </AuthCompany>
                                        }
                                    />

                                    <Route
                                        path="/admin-company/driver"
                                        element={
                                            <AuthCompany path="/admin-company/driver">
                                                <CompanyManageDriver />
                                            </AuthCompany>
                                        }
                                    />

                                    {/* Admin Driver */}
                                    <Route
                                        path="/login/driver"
                                        element={
                                            <ClientLayout>
                                                <LoginDriver style={{ '--base-color': '#ff7a56' }} />
                                            </ClientLayout>
                                        }
                                    />

                                    <Route
                                        path="/app-driver/additional-profile"
                                        element={
                                            <AuthDriver path="/app-driver/additional-profile">
                                                <StepsDriverInfo />
                                            </AuthDriver>
                                        }
                                    />

                                    <Route
                                        path="/app-driver/dashboard"
                                        element={
                                            <AuthDriver path="/app-driver/dashboard">
                                                <DriverDashboard />
                                            </AuthDriver>
                                        }
                                    />

                                    <Route
                                        path="/app-driver"
                                        element={
                                            <AuthDriver path="/app-driver">
                                                <AppDriver />
                                            </AuthDriver>
                                        }
                                    />

                                    <Route
                                        path="/app-driver/profile"
                                        element={
                                            <AuthDriver path="/app-driver/profile">
                                                <AppDriverProfile />
                                            </AuthDriver>
                                        }
                                    />
                                </Routes>

                                {/* Super Admin route */}
                                <Routes>
                                    <Route path="/admin" element={<Dashboard />} />

                                    <Route path="/admin/user" element={<UserManage />} />

                                    <Route path="/admin/company" element={<CompanyManage />} />

                                    <Route path="/admin/new-company" element={<NewCompanyManage />} />
                                </Routes>
                            </Suspense>
                        </AnimatePresence>
                    </main>
                }
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
