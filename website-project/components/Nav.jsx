"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import { signIn, signOut, useSession,
getProviders } from 'next-auth/react';

import { LiaBookmark } from "react-icons/lia";
import { SlBag } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";


const Nav = () => {
    const isUserLoggedIn = true;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <nav className="flex justify-between items-center w-full mb-8 bg-sky-200/20 px-4 p-4">
        <Link href="/" className="pl-4 text-lime-400 font-bold text-2xl">
            WebsiteE
        </Link>

        <div className="sm:flex hidden gap-4 md:gap-5 ml-auto items-center">
            {isUserLoggedIn ? (
                <div className="flex gap-4 md:gap-5 items-center">
                    <div className="flex items-center bg-gray-500 rounded-md p-1 focus-within:ring-2 focus-within:ring-lime-400">
                        <input
                            className="bg-gray-500 rounded-md p-1 ml-1 text-white outline-none focus:ring-0"
                            type="text"
                            placeholder="Search"
                        />
                        <IoSearch className="text-2xl text-white ml-2" />
                    </div>

                    <Link href="/wish-list" className='text-3xl'>
                        <LiaBookmark />
                    </Link>

                    <Link href="/wish-list" className='text-2xl'>
                        <SlBag />
                    </Link>

                    <div className="relative">
                        <button 
                            onClick={toggleDropdown}
                            className="rounded-full"
                        >
                            <Image
                                src="/assets/images/avatar-default.svg"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border shadow-lg p-7">
                                <ul>
                                    <li className="px-4 py-2 hover:bg-gray-400 hover:text-amber-50">
                                        <Link href="/profile">Profile</Link>
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-400 hover:text-amber-50">
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                signOut();
                                                setDropdownOpen(false);
                                            }} 
                                            className="w-full text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                        </div>
                        )}
                    </div>
                </div>
        ) : (
            <>
            </>
        )}
        </div>
    </nav>
  )
}

export default Nav
