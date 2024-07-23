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

// Public Route
const HomePage = lazy(() => import('./Pages/Home'));
const CompanyClientPage = lazy(() => import('./Pages/Company/Client'));
const DriverClient = lazy(() => import('./Pages/Driver/Client'));
const DriverDetail = lazy(() => import('./Pages/Driver/DetailPage'));
const CompanyDetail = lazy(() => import('./Pages/Company/CompanyDetail'));
const Feedback = lazy(() => import('./Pages/Client/Feedback'));
const LoginClientPage = lazy(() => import('./Pages/Account'));

// Private Page
const Dashboard = lazy(() => import('./Pages/Admin/Dashboard/index'));
const UserManage = lazy(() => import('./Pages/Admin/UserManage/index'));
const CompanyManage = lazy(() => import('./Pages/Admin/CompanyManage/index'));
const CompanyDashboard = lazy(() => import('./Pages/Company/Dashboard/index'));
const CompanyProfile = lazy(() => import('./Pages/Company/Dashboard/Profile/index'));
const CompanyManageDriver = lazy(() => import('./Pages/Company/Dashboard/DriverManage/index'));

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
                                <Routes>
                                    {/* Public Route */}
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
                                        path="/driver"
                                        element={
                                            <ClientLayout>
                                                <DriverClient style={{ '--base-color': '#ff7a56' }} />
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

                                    {/* Private Route */}
                                    <Route path="/admin" element={<Dashboard />} />

                                    <Route path="/admin/user" element={<UserManage />} />

                                    <Route path="/admin/company" element={<CompanyManage />} />

                                    <Route path="/company/dashboard" element={<CompanyDashboard />} />

                                    <Route path="/company/profile" element={<CompanyProfile />} />

                                    <Route path="/company/list-driver" element={<CompanyManageDriver />} />
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
