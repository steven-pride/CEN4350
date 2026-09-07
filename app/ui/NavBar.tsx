"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'My Collection',
    href: '/games'
  },
  { 
    name: 'About', 
    href: '/about'
  },
  {
    name: 'Profile',
    href: '/profile'
  }
];

// Top navigation bar component
export default function Navbar() {
  // State for opening/closing the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    // Dark navbar with shadow
    <nav className="bg-ludavault-blue text-white">
      {/* Max width container with horizontal centering */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Home Link */}
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            LudaVault
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center">
            <>
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    'hover:text-gray-300 mx-3 h-auto',
                    { 'border-b-2 border-ludavault-gold font-semibold': pathname === link.href }
                  )}
                >
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            })}
            </>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 rounded focus:outline-none"
              aria-label="Toggle menu"
            >
              {/* Hamburger or X icon based on state */}
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'block w-fit hover:text-gray-300 py-1 text-base',
                  { 'border-b-2 border-ludavault-gold font-semibold': pathname === link.href }
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
