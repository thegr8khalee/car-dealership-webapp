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
import AdminLoginProtectedRoute from './components/AdminLoginProtectedRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
// import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import { useUserAuthStore } from './store/useUserAuthStore';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AddCarPage from './pages/AddCarPage';
import UpdateCarPage from './pages/UpdateCarPage';
import AddBlogPage from './pages/AddBlogPage';
import UpdateBlogPage from './pages/UpdateBlogPage';

function App() {
  const { checkAuth, authUser } = useUserAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('Authenticated User:', authUser);

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
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />



          {/** admin routes */}
          <Route element={<AdminLoginProtectedRoute />}>
            <Route path="/admin/login" element={<AdminLoginPage />} />
          </Route>

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path='/admin/cars/new' element={<AddCarPage />} />
            <Route path='/admin/cars/update/:id' element={<UpdateCarPage />} />
            <Route path='/admin/blogs/new' element={<AddBlogPage />} />
            <Route path='/admin/blogs/update/:id' element={<UpdateBlogPage />} />
          </Route>
        </Routes>

        <Toaster />
      </main>
      <Footer />
    </div>
  );
}

export default App;
