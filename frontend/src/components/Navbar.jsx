import { MenuIcon, User2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ className = '' }) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div
          className={`fixed navbar backdrop-blur-lg bg-secondary/30 items-center w-full top-0 z-50 ${className}`}
        >
          <div className="navbar-start">
            <label htmlFor="my-drawer" className="md:hidden btn btn-ghost btn-circle text-white">
              <MenuIcon />
            </label>
            <div className='pl-4 space-x-4 hidden md:flex font-[poppins] text-sm text-white'>
              <Link to={'/'}>
                Home
              </Link>
              <Link to={'/listings'}>
               Listing
              </Link>
              <Link >
                Makes
              </Link>
              <Link >
                Blogs
              </Link>
              <Link >
                Contact
              </Link>
            </div>
          </div>

          <div className="navbar-center">
            <a className="text-2xl font-['Microgramma_D_Extended'] text-primary" href='/'>
              LOGO
            </a>
          </div>

          <div className="navbar-end">
            <button className="btn btn-primary rounded-full text-xs font-normal">
              <User2 className="size-5" /> Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="drawer-side z-999">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <li>
            <a>Homepage</a>
          </li>
          <li>
            <a>Portfolio</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
