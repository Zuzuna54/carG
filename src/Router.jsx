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
const Home = React.lazy(() => import('./components/pages/home/Homepage'));
const AboutUs = React.lazy(() => import('./components/pages/aboutUs/Aboutus'));
const ContactUs = React.lazy(() => import('./components/pages/contactUs/Contactus'));

export default function Routing() {

    return (
        <AuthProvider>
            <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                    <ScrollToTop />
                    <Routes>
                        <Route path='' element={<LogInPage />} />
                        <Route path='/401' element={<NotAuthorized />} />
                        <Route path="/dashboard" element={<ProtectedRoutes />} >
                            <Route path='' element={<Layout />} >
                                <Route path='homepage' element={<Home />} />
                                <Route path='calculator' element={<Calc />} />
                                <Route path='about-us' element={<AboutUs />} />
                                <Route path='contact-us' element={<ContactUs />} />
                            </Route>
                        </Route>
                        <Route path='*' element={<Navigate replace to='/401' />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </AuthProvider>
    );
};