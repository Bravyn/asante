'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Accessibility: Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto">
        <ul className="flex gap-6 items-center relative">
          <li>
            <Link 
              href="/" 
              className="hover:underline transition duration-200 hover:text-blue-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/login" 
              className="hover:underline transition duration-200 hover:text-blue-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link 
              href="/dashboard" 
              className="hover:underline transition duration-200 hover:text-blue-200"
            >
              Dashboard
            </Link>
          </li>

          {/* Dropdown for Courses */}
          <li
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className="hover:underline focus:outline-none transition duration-200 hover:text-blue-200 flex items-center gap-1"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Courses <span className="text-xs">▾</span>
            </button>

            {isDropdownOpen && (
              <div 
                className="absolute top-full left-0 bg-blue-800 text-sm rounded shadow-lg p-2 z-10 min-w-[180px] border border-blue-700"
                role="menu"
              >
                <Link 
                  href="/courses" 
                  className="block px-3 py-2 hover:bg-blue-700 rounded transition duration-200"
                  role="menuitem"
                >
                  All Courses
                </Link>
                <Link 
                  href="/enrolled" 
                  className="block px-3 py-2 hover:bg-blue-700 rounded transition duration-200"
                  role="menuitem"
                >
                  Enrolled
                </Link>
                <Link 
                  href="/completed" 
                  className="block px-3 py-2 hover:bg-blue-700 rounded transition duration-200"
                  role="menuitem"
                >
                  Completed
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link 
              href="/profile" 
              className="hover:underline transition duration-200 hover:text-blue-200"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}