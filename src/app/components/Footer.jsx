"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white border-t border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faTasks} className="h-6 w-6 text-white mr-2" />
              <span className="text-white">TaskMaster</span>
            </h3>
            <p className="text-sm text-blue-100">
              Your ultimate task management solution for productivity and organization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-blue-100 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-blue-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-blue-100 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-blue-100 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-blue-100 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <Link 
                href="https://github.com/yourusername" 
                target="_blank"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </Link>
              <Link 
                href="https://twitter.com/yourusername" 
                target="_blank"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </Link>
              <Link 
                href="https://linkedin.com/in/yourusername" 
                target="_blank"
                className="text-blue-100 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </Link>
              <Link 
                href="mailto:contact@taskmaster.com" 
                className="text-blue-100 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </Link>
            </div>
            <p className="text-sm text-blue-100">
              Subscribe to our newsletter for updates and tips.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 border border-blue-400 bg-blue-500 text-white placeholder-blue-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-white text-sm w-full"
              />
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-500 text-center text-sm text-blue-100">
          <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;