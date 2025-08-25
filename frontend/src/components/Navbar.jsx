import { LogOut, MenuIcon, User2 } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/useAdminStore';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = ({ className = '' }) => {
  const { adminLogout } = useAdminStore();
  const { logout, authUser, isAdmin } = useAuthStore();

  const navigate = useNavigate();

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
              <Link>Blogs</Link>
              <Link>Contact</Link>
            </div>
          </div>

          <div className="navbar-center">
            <a
              className="text-2xl font-['Microgramma_D_Extended'] text-primary"
              href="/"
            >
              LOGO
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
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Listings</a>
            </li>
            <li>
              <a>Makes</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
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
