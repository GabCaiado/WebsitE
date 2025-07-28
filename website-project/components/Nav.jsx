'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { LiaBookmark } from "react-icons/lia";
import { SlBag } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";

const Nav = () => {
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
    setDropdownOpen(false);
  };

  useEffect(() => {
    async function fetchProviders() {
      const response = await getProviders();
      setProviders(response);
  }
  fetchProviders();
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <nav className="flex justify-between items-center w-full bg-black px-4 py-3 gap-4">
      {/* Logo */}
      <Link href="/" className="pl-4 ml-4">
        <Image
          src="/icons/Gift4You.svg"
          width={155}
          height={60}
          alt="Logo"
          className="object-contain"
        />
      </Link>

      {/* Search */}
      <div className="flex items-center bg-gray-500 rounded-md px-5 lg:ml-[720px] sm:ml-10 md:ml-10 mt-3 p-1 focus-within:ring-2 focus-within:ring-lime-400">
        <input
          className="bg-gray-500 rounded-md p-1 ml-1 text-white outline-none focus:ring-0"
          type="text"
          placeholder="Search"
        />
        <IoSearch className="text-2xl text-white ml-2" />
      </div>

      {/* Saved */}
      {session?.user && (
        <div className="sm:flex hidden gap-4 md:gap-5 items-center ml-auto mr-5 mt-6">
          <Link href="/wish-list" className="text-3xl text-white text-center flex flex-col items-center">
            <LiaBookmark />
            <p className="text-[12px] -mt-2">Saved</p>
          </Link>
        </div>
      )}

      {/* Cart */}
      <div className="flex items-center gap-6 mt-2">
        <Link href="/cart" className="text-2xl text-white text-center flex flex-col items-center mt-4">
          <SlBag />
          <p className="text-[12px]">Cart</p>
        </Link>
      </div>

      {/* Profile / Login */}
      <div className="sm:flex hidden gap-4 md:gap-5 items-center ml-6 mr-6">
        {session?.user ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="rounded-full">
              <Image
                src="/images/profile.png"
                width={48}
                height={48}
                className="rounded-full mt-3"
                alt="profile"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border shadow-lg p-5 z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-400 hover:text-amber-50">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-400 hover:text-amber-50">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="rounded-full text-white text-sm -ml-6 mt-3 px-4 py-2 border border-white hover:bg-white hover:text-black transition">
              Sign In / Log In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
