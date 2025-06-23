"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faTasks,
  faPlus,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTaskDropdown = () => setShowTaskDropdown(!showTaskDropdown);

  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0  cursor-pointer flex items-center">
              <Link href="/">
              <FontAwesomeIcon icon={faTasks} className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">TaskMaster</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="../pages/Features"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Features
              </Link>
              <Link
                href="../pages/about"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center">
            {/* Task Dropdown */}
            <div className="relative ml-3">
              <button
                onClick={toggleTaskDropdown}
                className="text-white hover:bg-blue-700 p-2 rounded-full focus:outline-none"
              >
                <FontAwesomeIcon icon={faTasks} />
              </button>

              {showTaskDropdown && (
                <div className="bg-white absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faTasks} className="mr-2" />
                    Show Tasks
                  </Link>
                  <Link
                    href="../pages/add_Task"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Task
                  </Link>
                </div>
              )}
            </div>

            {/* Login/Signup - Desktop */}
            <div className="hidden md:flex md:items-center md:ml-4">
             <Link href="../pages/Login">
              <button className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium ml-1">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" />
                Login
              </button>
             </Link>
             <Link
                   href="../pages/SignUp"
             >
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium ml-2">
                <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
                Sign Up
              </button>
             </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-2">
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-blue-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-blue-700">
          <Link
            href="#"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            href="../pages/Features"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            Features
          </Link>
          <Link
            href="../pages/about"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            About
          </Link>
          <Link
            href="#"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faTasks} className="mr-2" />
            Show Tasks
          </Link>
          <Link
            href="../pages/add_Task"
            className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Task
          </Link>
          <div className="border-t border-blue-500 pt-2">
            <Link
              href="#"
              className="block pl-3 pr-4 py-2 text-base font-medium text-white hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Login
            </Link>
            <Link
              href="../pages/SignUp"
              className="bg-white text-blue-600 block pl-3 pr-4 py-2 text-base font-medium hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;