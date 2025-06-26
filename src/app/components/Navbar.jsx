"use client";
import React, { useState, useContext, useCallback } from "react";
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
     
        router.push("../pages/Login");
      
      router.refresh();
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
              <Link href="/">
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
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl fixed w-full top-0 z-50">
      {/* Desktop Navigation */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and main nav items */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 cursor-pointer flex items-center">
              <Link href="/" onClick={closeAllDropdowns}>
                <FontAwesomeIcon
                  icon={faTasks}
                  className="h-8 w-8 text-white transform hover:rotate-12 transition-transform"
                />
                <span className="ml-3 text-2xl font-extrabold text-white">
                  TaskMaster
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex space-x-6">
              <NavLink href="/" onClick={closeAllDropdowns}>
                Home
              </NavLink>
              <NavLink href="/pages/Features" onClick={closeAllDropdowns}>
                Features
              </NavLink>
              <NavLink href="/pages/about" onClick={closeAllDropdowns}>
                About
              </NavLink>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <TaskDropdown 
                show={showTaskDropdown}
                onToggle={() => setShowTaskDropdown(!showTaskDropdown)}
                onClose={closeAllDropdowns}
              />
            )}

            <div className="flex items-center">
              {isAuthenticated ? (
                <UserDropdown
                  user={user}
                  show={showUserDropdown}
                  onToggle={() => setShowUserDropdown(!showUserDropdown)}
                  onLogout={handleLogout}
                />
              ) : (
                <AuthButtons onClose={closeAllDropdowns} />
              )}
            </div>

            <MobileMenuButton 
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
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
      />
    </nav>
  );
};

// Extracted components for better readability and maintainability
const NavLink = ({ href, onClick, children }) => (
  <Link
    href={href}
    className="text-white hover:text-blue-200 px-3 py-2 text-lg font-semibold transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

const TaskDropdown = ({ show, onToggle, onClose }) => (
  <div className="relative hidden lg:block">
    <button
      onClick={onToggle}
      className="flex items-center text-white hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      <FontAwesomeIcon icon={faTasks} className="mr-2" />
      Tasks
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`ml-2 text-xs transition-transform ${show ? 'transform rotate-180' : ''}`}
      />
    </button>

    {show && (
      <div className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100">
        <Link
          href="/pages/showtask"
          className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTasks} className="mr-3 text-blue-600" />
          <span className="font-medium">Show Tasks</span>
        </Link>
        <Link
          href="/pages/add_Task"
          className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-3 text-blue-600" />
          <span className="font-medium">Add Task</span>
        </Link>
      </div>
    )}
  </div>
);

const UserDropdown = ({ user, show, onToggle, onLogout }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-all"
    >
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
        {user?.name?.charAt(0).toUpperCase() || 'U'}
      </div>
      <span className="font-medium text-white">
        {user?.name || 'User'}
      </span>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`text-xs transition-transform ${show ? 'transform rotate-180' : ''}`}
      />
    </button>

    {show && (
      <div className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100">
        <div className="px-4 py-3 border-b border-blue-100">
          <p className="text-sm text-blue-500">Signed in as</p>
          <p className="text-blue-800 font-semibold truncate">
            {user?.name || 'User'}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-red-50 transition-colors"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-red-500" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    )}
  </div>
);

const AuthButtons = ({ onClose }) => (
  <div className="flex space-x-3">
    <Link href="/pages/Login">
      <button
        className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
        Login
      </button>
    </Link>
    <Link href="/pages/SignUp">
      <button
        className="bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        Sign Up
      </button>
    </Link>
  </div>
);

const MobileMenuButton = ({ isOpen, onClick }) => (
  <div className="lg:hidden flex items-center ml-2">
    <button
      onClick={onClick}
      className="text-white hover:bg-blue-500 p-2 rounded-full focus:outline-none transition-colors"
    >
      <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
    </button>
  </div>
);

const MobileMenu = ({ isOpen, isAuthenticated, user, onClose, onLogout }) => (
  <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-gradient-to-b from-blue-600 to-blue-700`}>
    <div className="pt-2 pb-4 space-y-1">
      <NavLink href="/" onClick={onClose}>
        Home
      </NavLink>
      <NavLink href="/pages/Features" onClick={onClose}>
        Features
      </NavLink>
      <NavLink href="/pages/about" onClick={onClose}>
        About
      </NavLink>

      {isAuthenticated && (
        <>
          <div className="border-t border-blue-500 mx-5"></div>
          <Link
            href="/pages/showtask"
            className="flex items-center px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTasks} className="mr-3" />
            Show Tasks
          </Link>
          <Link
            href="/pages/add_Task"
            className="flex items-center px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-3" />
            Add Task
          </Link>
        </>
      )}

      <div className="border-t border-blue-500 mx-5"></div>
      {isAuthenticated ? (
        <>
          <div className="px-5 py-3 flex items-center">
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
            className="flex items-center w-full px-5 py-3 text-lg font-medium text-white hover:bg-red-500/20 transition-colors"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            Logout
          </button>
        </>
      ) : (
        <div className="px-5 space-y-3">
          <Link
            href="/pages/Login"
            className="block w-full text-center bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </Link>
          <Link
            href="/pages/SignUp"
            className="block w-full text-center bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
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

export default Navbar;