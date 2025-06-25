"use client";
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faTasks,
  faPlus,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { UserContext } from "@/app/context/usecontext";
import { logout } from "@/app/services/Add_user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, setuser } = useContext(UserContext);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTaskDropdown = () => setShowTaskDropdown(!showTaskDropdown);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const handleLogout = async () => {
    try {
      await logout();
      setuser(null);
      toast.success("Logged out successfully");
      router.push("/pages/Login");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  const closeAllDropdowns = () => {
    setIsOpen(false);
    setShowTaskDropdown(false);
    setShowUserDropdown(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl fixed w-full top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and main nav items */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6">
              <Link
                href="/"
                className="text-white hover:text-blue-200 px-3 py-2 text-lg font-semibold transition-colors"
                onClick={closeAllDropdowns}
              >
                Home
              </Link>
              <Link
                href="/pages/Features"
                className="text-white hover:text-blue-200 px-3 py-2 text-lg font-semibold transition-colors"
                onClick={closeAllDropdowns}
              >
                Features
              </Link>
              <Link
                href="/pages/about"
                className="text-white hover:text-blue-200 px-3 py-2 text-lg font-semibold transition-colors"
                onClick={closeAllDropdowns}
              >
                About
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Task Dropdown - Only show if logged in */}
            {user && (
              <div className="relative hidden lg:block">
                <button
                  onClick={toggleTaskDropdown}
                  className="flex items-center text-white hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <FontAwesomeIcon icon={faTasks} className="mr-2" />
                  Tasks
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-2 text-xs transition-transform ${showTaskDropdown ? 'transform rotate-180' : ''}`}
                  />
                </button>

                {showTaskDropdown && (
                  <div className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100">
                    <Link
                      href="/pages/showtask"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <FontAwesomeIcon icon={faTasks} className="mr-3 text-blue-600" />
                      <span className="font-medium">Show Tasks</span>
                    </Link>
                    <Link
                      href="/pages/add_Task"
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-3 text-blue-600" />
                      <span className="font-medium">Add Task</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* User Profile */}
            <div className="flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
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
                      className={`text-xs transition-transform ${showUserDropdown ? 'transform rotate-180' : ''}`}
                    />
                  </button>

                  {showUserDropdown && (
                    <div className="bg-white absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-2 z-50 border border-blue-100">
                      <div className="px-4 py-3 border-b border-blue-100">
                        <p className="text-sm text-blue-500">Signed in as</p>
                        <p className="text-blue-800 font-semibold truncate">
                          {user?.name || 'User'}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-red-50 transition-colors"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-red-500" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link href="/pages/Login">
                    <button
                      className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all"
                      onClick={closeAllDropdowns}
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                      Login
                    </button>
                  </Link>
                  <Link href="/pages/SignUp">
                    <button
                      className="bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-2 rounded-full font-semibold shadow-md transition-all"
                      onClick={closeAllDropdowns}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center ml-2">
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-blue-500 p-2 rounded-full focus:outline-none transition-colors"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-gradient-to-b from-blue-600 to-blue-700`}>
        <div className="pt-2 pb-4 space-y-1">
          <Link
            href="/"
            className="block px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={closeAllDropdowns}
          >
            Home
          </Link>
          <Link
            href="/pages/Features"
            className="block px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={closeAllDropdowns}
          >
            Features
          </Link>
          <Link
            href="/pages/about"
            className="block px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={closeAllDropdowns}
          >
            About
          </Link>

          {user && (
            <>
              <div className="border-t border-blue-500 mx-5"></div>
              <Link
                href="/pages/showtask"
                className="flex items-center px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
                onClick={closeAllDropdowns}
              >
                <FontAwesomeIcon icon={faTasks} className="mr-3" />
                Show Tasks
              </Link>
              <Link
                href="/pages/add_Task"
                className="flex items-center px-5 py-3 text-lg font-medium text-white hover:bg-blue-500 transition-colors"
                onClick={closeAllDropdowns}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                Add Task
              </Link>
            </>
          )}

          <div className="border-t border-blue-500 mx-5"></div>
          {user ? (
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
                onClick={handleLogout}
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
                onClick={closeAllDropdowns}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </Link>
              <Link
                href="/pages/SignUp"
                className="block w-full text-center bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
                onClick={closeAllDropdowns}
              >
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;