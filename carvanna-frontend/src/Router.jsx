import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoutes from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Loading from './components/shared/Loading/Loading';
import ScrollToTop from './components/shared/ScrollToTop';


const Layout = React.lazy(() => import('./components/layouts/PublicLayout'));
const LogInPage = React.lazy(() => import('./components/auth/preAuth/Login'));
const NotAuthorized = React.lazy(() => import('./components/NotAuthorized/NotAuthorized'));
const Calc = React.lazy(() => import('./components/pages/calc/Calc'));
const MyPanel = React.lazy(() => import('./components/pages/myPanel/MyPanel'));
const CompanyForm = React.lazy(() => import('./components/pages/myPanel/companyForm/CompanyForm'));
const UserForm = React.lazy(() => import('./components/pages/myPanel/userForm/userForm'));
const Home = React.lazy(() => import('./components/pages/home/Homepage'));
const AboutUs = React.lazy(() => import('./components/pages/aboutUs/Aboutus'));
const ContactUs = React.lazy(() => import('./components/pages/contactUs/Contactus'));
const Settings = React.lazy(() => import('./components/pages/settings/Settings'));

export default function Routing() {

    return (
        <AuthProvider>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <ScrollToTop />
                    <Routes>
                        <Route path='/401' element={<NotAuthorized />} />
                        <Route path="/dashboard" element={<Layout />} >
                            <Route path='my-panel' element={<ProtectedRoutes />} >
                                <Route path='' element={<MyPanel />} />
                                <Route path='create-company' element={<CompanyForm />} />
                                <Route path='create-user' element={<UserForm />} />
                            </Route>
                            <Route path='homepage' element={<Home />} />
                            <Route path='calculator' element={<Calc />} />
                            <Route path='about-us' element={<AboutUs />} />
                            <Route path='contact-us' element={<ContactUs />} />
                            <Route path='settings' element={<Settings />} />

                        </Route>
                        <Route path='/login' element={<LogInPage />} />
                        <Route path='*' element={<Navigate replace to='/dashboard' />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </AuthProvider>
    );
};