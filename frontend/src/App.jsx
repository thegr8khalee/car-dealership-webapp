import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Listings from './pages/Listings';
import CarDetails from './pages/CarDetails';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import AdminLoginProtectedRoute from './components/AdminProtectedRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-100" />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={'/'} />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <LoginPage />}
          />
          <Route path="/listings" element={<Listings />} />
          <Route path="/cars" element={<CarDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<BlogDetail />} />



          {/** admin routes */}
          <Route element={<AdminLoginProtectedRoute />}>
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
      <Footer />
    </div>
  );
}

export default App;
