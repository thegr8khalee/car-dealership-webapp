import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Listings from './pages/Listings';
import CarDetails from './pages/CarDetails';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="z-100" />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/cars" element={<CarDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<BlogDetail />} />
        </Routes>

        <Toaster />
      </main>
      <Footer />
    </div>
  );
}

export default App;
