// src/components/Admin/AdminDashboardContent.jsx
import React from 'react';
// import { useProductsStore } from '../../store/useProductsStore';
import { useNavigate } from 'react-router-dom';
// import { useAdminStore } from '../../store/useAdminStore';
import {
  ArrowUpRight,
  Car,
  CarFront,
  HeartIcon,
  Loader2,
  MenuIcon,
  MessageSquareMore,
  MessageSquareText,
  Newspaper,
  StickyNote,
  UserRound,
} from 'lucide-react';
// import { useAdminAuthStore } from '../../store/useAdminAuthStore';
import { useUserAuthStore } from '../../store/useUserAuthStore';

const AdminDashboardContent = () => {
  //   console.log(ordersData)
  const { authUser } = useUserAuthStore();

  const stats = [
    {
      label: 'Cars',
      value: 10,

      path: 'orders',
      icon: CarFront,
    },
    {
      label: 'Blog Posts',
      // Use optional chaining to safely access the array and a fallback of 0
      value: 10,
      path: 'orders',
      icon: StickyNote,
    },
    {
      label: 'Users',
      value: 1011,
      path: 'newOrders',
      icon: UserRound,
    },

    { label: 'News Tellers', value: 100, path: 'orders', icon: Newspaper },
    { label: 'Staffs', value: 50, path: 'products', icon: UserRound },

    { label: 'Likes', value: 10, path: 'recipe', icon: HeartIcon },
    { label: 'Comments', value: 5, path: 'users', icon: MessageSquareMore },
    { label: 'Reviews', value: 5, path: 'users', icon: MessageSquareText },
  ];

//   const handleNavigationClick = (sectionId) => {
//     setActiveSection(sectionId);
//   };

  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/admin/cars/new');
  };

  const handleAddNewRecipe = () => {
    navigate('/admin/blogs/new');
  };

  return (
    <div className="overflow-hidden">
      <h2 className="overflow-x-hidden text-3xl font-semibold mb-6 font-[inter]">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat shadow-lg rounded-2xl p-4 h-30 bg-primary">
          <div className="stat-figure text-secondary">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp" />
              </div>
            </div>
          </div>
          <div className="stat-value text-white"></div>
          {/* <div className="stat-title">Tasks done</div> */}
          <div className="stat-desc text-white text-lg font-semibold">{authUser?.username}</div>
        </div>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="stat shadow-lg bg-base-100 rounded-2xl p-4 h-30"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent className="size-6 text-primary" />
                  <div className="stat-title">{stat.label}</div>
                </div>
                <ArrowUpRight />
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="stat-value">{stat.value}</div>
              </div>

              <div className="stat-desc">21% more than last month</div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Quick Actions
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className=" btn btn-outline btn-primary rounded-full text-lg"
            onClick={handleAddNew}
          >
            New Car
          </button>
          <button
            className="btn btn-outline btn-primary rounded-full text-lg"
            onClick={handleAddNewRecipe}
          >
            New Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
