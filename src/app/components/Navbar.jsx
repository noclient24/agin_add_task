"use client";
import React, { useState, useContext, useCallback, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faTasks,
  faPlus,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faChevronDown,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserContext } from "@/app/context/usecontext";
import { logout } from "@/app/services/Add_user";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, setuser, loading } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setIsOpen(false);
    setShowTaskDropdown(false);
    setShowUserDropdown(false);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setuser(null);
      toast.success("Logged out successfully");
      router.push("/pages/Login");
      closeAllDropdowns();
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  // Loading state - show simplified navbar
  if (loading) {
    return (
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl fixed w-full top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 cursor-pointer flex items-center">
              <Link href="/" className="flex items-center">
                <FontAwesomeIcon icon={faTasks} className="h-8 w-8 text-white" />
                <span className="ml-3 text-2xl font-extrabold text-white">
                  TaskMaster
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="h-5 w-5 animate-spin" 
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const isAuthenticated = user && !user.message;

  return (
    <nav 
      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl fixed w-full top-0 z-50"
      ref={navRef}
    >
      {/* Desktop Navigation */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and main nav items */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 cursor-pointer flex items-center">
              <Link href="/" onClick={closeAllDropdowns} className="flex items-center">
                <FontAwesomeIcon
                  icon={faTasks}
                  className="h-8 w-8 text-white transform hover:rotate-12 transition-transform duration-200"
                />
                <span className="ml-3 text-2xl font-extrabold text-white">
                  TaskMaster
                </span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-6">
              <NavLink href="/" onClick={closeAllDropdowns} active={pathname === "/"}>
                Home
              </NavLink>
              <NavLink 
                href="/pages/Features" 
                onClick={closeAllDropdowns}
                active={pathname === "/pages/Features"}
              >
                Features
              </NavLink>
              <NavLink 
                href="/pages/about" 
                onClick={closeAllDropdowns}
                active={pathname === "/pages/about"}
              >
                About
              </NavLink>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="hidden md:block">
                <TaskDropdown 
                  show={showTaskDropdown}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setShowTaskDropdown(!showTaskDropdown);
                    setShowUserDropdown(false);
                  }}
                  onClose={closeAllDropdowns}
                />
              </div>
            )}

            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <UserDropdown
                  user={user}
                  show={showUserDropdown}
                  onToggle={(e) => {
                    e.stopPropagation();
                    setShowUserDropdown(!showUserDropdown);
                    setShowTaskDropdown(false);
                  }}
                  onLogout={handleLogout}
                />
              ) : (
                <AuthButtons onClose={closeAllDropdowns} />
              )}
            </div>

            <MobileMenuButton 
              isOpen={isOpen}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
                setShowTaskDropdown(false);
                setShowUserDropdown(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu 
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        onClose={closeAllDropdowns}
        onLogout={handleLogout}
        pathname={pathname}
      />
    </nav>
  );
};

// NavLink component with active state
const NavLink = ({ href, onClick, children, active }) => (
  <Link
    href={href}
    className={`px-3 py-2 text-lg font-semibold transition-colors ${active ? 'text-white border-b-2 border-white' : 'text-blue-100 hover:text-white'}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// TaskDropdown component
const TaskDropdown = ({ show, onToggle, onClose }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center text-white hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
      aria-expanded={show}
      aria-haspopup="true"
    >
      <FontAwesomeIcon icon={faTasks} className="mr-2" />
      Tasks
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`ml-2 text-xs transition-transform duration-200 ${show ? 'transform rotate-180' : ''}`}
      />
    </button>

    {show && (
      <div 
        className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100 animate-fadeIn"
        role="menu"
      >
        <Link
          href="/pages/showtask"
          className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors duration-200"
          onClick={onClose}
          role="menuitem"
        >
          <FontAwesomeIcon icon={faTasks} className="mr-3 text-blue-600" />
          <span className="font-medium">Show Tasks</span>
        </Link>
        <Link
          href="/pages/add_Task"
          className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors duration-200"
          onClick={onClose}
          role="menuitem"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-3 text-blue-600" />
          <span className="font-medium">Add Task</span>
        </Link>
      </div>
    )}
  </div>
);

// UserDropdown component
const UserDropdown = ({ user, show, onToggle, onLogout }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-all duration-200"
      aria-expanded={show}
      aria-haspopup="true"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </div>
      <span className="font-medium text-white">
        {user?.name || 'User'}
      </span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`text-xs transition-transform duration-200 ${show ? 'transform rotate-180' : ''}`}
      />
    </button>

    {show && (
      <div 
        className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100 animate-fadeIn"
        role="menu"
      >
        <div className="px-4 py-3 border-b border-blue-100">
          <p className="text-sm text-blue-500">Signed in as</p>
          <p className="text-blue-800 font-semibold truncate">
            {user?.email || user?.name || 'User'}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-red-50 transition-colors duration-200"
          role="menuitem"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    )}
  </div>
);

// AuthButtons component
const AuthButtons = ({ onClose }) => (
  <div className="flex space-x-3">
    <Link href="/pages/Login">
      <button
        className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-200"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Login
      </button>
    </Link>
    <Link href="/pages/SignUp">
      <button
        className="bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-200"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        Sign Up
      </button>
    </Link>
  </div>
);

// MobileMenuButton component
const MobileMenuButton = ({ isOpen, onClick }) => (
  <div className="md:hidden flex items-center ml-2">
    <button
      onClick={onClick}
      className="text-white hover:bg-blue-500 p-2 rounded-full focus:outline-none transition-colors duration-200"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <FontAwesomeIcon 
        icon={isOpen ? faTimes : faBars} 
        className="h-6 w-6" 
      />
    </button>
  </div>
);

// MobileMenu component
const MobileMenu = ({ isOpen, isAuthenticated, user, onClose, onLogout, pathname }) => (
  <div 
    className={`${isOpen ? "max-h-screen py-2" : "max-h-0 py-0"} md:hidden bg-gradient-to-b from-blue-600 to-blue-700 overflow-hidden transition-all duration-300 ease-in-out`}
  >
    <div className="px-4 space-y-2">
      <MobileNavLink href="/" onClick={onClose} active={pathname === "/"}>
        Home
      </MobileNavLink>
      <MobileNavLink 
        href="/pages/Features" 
        onClick={onClose}
        active={pathname === "/pages/Features"}
      >
        Features
      </MobileNavLink>
      <MobileNavLink 
        href="/pages/about" 
        onClick={onClose}
        active={pathname === "/pages/about"}
      >
        About
      </MobileNavLink>

      {isAuthenticated && (
        <>
          <div className="border-t border-blue-500 mx-4 my-2"></div>
          <MobileNavLink
            href="/pages/showtask"
            onClick={onClose}
            active={pathname === "/pages/showtask"}
            icon={faTasks}
          >
            Show Tasks
          </MobileNavLink>
          <MobileNavLink
            href="/pages/add_Task"
            onClick={onClose}
            active={pathname === "/pages/add_Task"}
            icon={faPlus}
          >
            Add Task
          </MobileNavLink>
        </>
      )}

      <div className="border-t border-blue-500 mx-4 my-2"></div>
      {isAuthenticated ? (
        <>
          <div className="px-4 py-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold mr-3">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm text-blue-200">Signed in as</p>
              <p className="font-medium text-white">{user?.name || 'User'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-lg font-medium text-white hover:bg-red-500/20 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            Logout
          </button>
        </>
      ) : (
        <div className="px-4 space-y-3">
          <Link
            href="/pages/Login"
            className="block w-full text-center bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </Link>
          <Link
            href="/pages/SignUp"
            className="block w-full text-center bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
);

// MobileNavLink component
const MobileNavLink = ({ href, onClick, children, active, icon }) => (
  <Link
    href={href}
    className={`flex items-center px-4 py-3 text-lg font-medium transition-colors duration-200 rounded-lg ${active ? 'bg-blue-500 text-white' : 'text-blue-100 hover:bg-blue-500/30 hover:text-white'}`}
    onClick={onClick}
  >
    {icon && <FontAwesomeIcon icon={icon} className="mr-3" />}
    {children}
  </Link>
);

export default Navbar;