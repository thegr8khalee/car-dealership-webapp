import { LogOut, MenuIcon, User2 } from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAdminStore } from '../store/useAdminStore';
// import { useAuthStore } from '../store/useAuthStore';
import { useUserAuthStore } from '../store/useUserAuthStore';
import { useAdminAuthStore } from '../store/useAdminAuthStore';

const Navbar = ({ className = '' }) => {
  const { adminLogout } = useAdminAuthStore();
  const { logout, authUser, isAdmin } = useUserAuthStore();

  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current path

  const closeDrawer = () => {
    const drawerToggle = document.getElementById('my-drawer');
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  };

  const handleAdminLogOut = () => {
    adminLogout();
    closeDrawer();
  };

  const handleLogOut = () => {
    logout();
    closeDrawer();
  };

  const handleSignIn = () => {
    navigate('/profile');
    closeDrawer();
  };

  const handleProfile = () => {
    navigate('/profile');
    closeDrawer();
  };

  // helper function to apply bold if active
  const getButtonClass = (path) =>
    `font-normal btn bg-transparent border-0 shadow-0 hover:bg-transparent hover:shadow-none text-start justify-start ${
      location.pathname === path ? 'font-bold text-primary' : ''
    }`;

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div
          className={`fixed navbar backdrop-blur-lg bg-secondary/30 items-center w-full top-0 z-50 ${className}`}
        >
          <div className="navbar-start">
            <label
              htmlFor="my-drawer"
              className="md:hidden btn btn-ghost btn-circle text-white"
            >
              <MenuIcon />
            </label>
            <div className="pl-4 space-x-4 hidden md:flex font-[poppins] text-sm text-white">
              <Link to={'/'}>Home</Link>
              <Link to={'/listings'}>Listing</Link>
              <Link>Makes</Link>
              <Link to={'/blogs'}>Blogs</Link>
              {isAdmin ? <Link to={'/admin/dashboard'}>Dashboard</Link> : null}
            </div>
          </div>

          <div className="navbar-center">
            <a
              className="text-2xl font-['Microgramma_D_Extended'] text-primary"
              href="/"
            >
              SARKIN<span className="text-white"> MOTA</span>
            </a>
          </div>

          <div className="navbar-end">
            {!authUser ? (
              <button
                className="btn btn-primary rounded-full text-xs font-normal"
                onClick={() => handleSignIn()}
              >
                <User2 className="size-5" /> Sign In
              </button>
            ) : (
              <button
                className="btn btn-primary rounded-full text-xs font-normal"
                onClick={() => handleProfile()}
              >
                <User2 className="size-5" />
                Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="drawer-side z-999">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content flex justify-between">
          <ul>
            <li className="p-2">
              <button
                className={getButtonClass('/')}
                onClick={() => {
                  navigate('/');
                  closeDrawer();
                }}
              >
                Home
              </button>
            </li>
            <li className="p-2">
              <button
                className={getButtonClass('/listings')}
                onClick={() => {
                  navigate('/listings');
                  closeDrawer();
                }}
              >
                Listings
              </button>
            </li>
            <li className="p-2">
              <button
                onClick={() => {
                  navigate('/makes');
                  closeDrawer();
                }}
                className={getButtonClass('/makes')}
              >
                Makes
              </button>
            </li>
            <li className="p-2">
              <button
                onClick={() => {
                  navigate('/blogs');
                  closeDrawer();
                }}
                className={getButtonClass('/blogs')}
              >
                Blogs
              </button>
            </li>
            {isAdmin ? (
              <li className="p-2">
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    closeDrawer();
                  }}
                  className={getButtonClass('/admin/dashboard')}
                >
                  Dashboard
                </button>
              </li>
            ) : null}
          </ul>
          <div>
            <div className="divider"></div>
            {!authUser ? (
              <button
                className="btn btn-primary w-full rounded-full text-xs font-normal"
                onClick={() => handleSignIn()}
              >
                <User2 className="size-5" /> Sign In
              </button>
            ) : (
              <button
                className="btn btn-primary rounded-full text-xs font-normal w-full"
                onClick={() => handleProfile()}
              >
                <User2 className="size-5" />
                Profile
              </button>
            )}

            {authUser && isAdmin && (
              <button
                className="btn btn-primary rounded-full text-xs font-normal w-full mt-4"
                onClick={() => {
                  handleAdminLogOut();
                }}
              >
                <User2 className="size-5" />
                Logout Admin
              </button>
            )}

            {authUser && !isAdmin && (
              <button
                className="btn btn-primary rounded-full text-xs font-normal w-full mt-4"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Logout
                <LogOut className="size-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
