"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SessionProvider, useSession, signOut } from 'next-auth/react';

import { LiaBookmark } from "react-icons/lia";
import { SlBag } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { Exo } from 'next/font/google';

const exo = Exo({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700'],
});

const Nav = () => {
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <nav className="flex justify-between items-center w-full bg-black px-4 py-3">
            {/* Logo */}
            <Link href="/" className="pl-4 ml-4">
                <Image
                    src="/icons/Gift4You.svg"
                    width={180}
                    height={60}
                    alt="Logo"
                    className="object-contain"
                />
            </Link>

            {/* Saved */}
            <div className="sm:flex hidden gap-4 md:gap-5 items-center ml-auto mr-4">
                {session?.user && (
                    <div className="flex gap-6 items-center">
                        {/* Saved */}
                        <Link href="/wish-list" className='text-3xl text-white text-center'>
                            <LiaBookmark />
                            <p className='text-[12px] -mt-2'>Saved</p>
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-6 mt-2">
                {/* Search */}
                <div className="flex items-center bg-gray-500 rounded-md px-5 p-1 focus-within:ring-2 focus-within:ring-lime-400">
                    <input
                    className="bg-gray-500 rounded-md p-1 ml-1 text-white outline-none focus:ring-0"
                    type="text"
                    placeholder="Search"
                    />
                    <IoSearch className="text-2xl text-white ml-2" />
                </div>

                {/* Cart */}
                <Link href="/cart" className="text-2xl text-white text-center flex flex-col items-center mt-4">
                    <SlBag />
                    <p className="text-[12px]">Cart</p>
                </Link>
            </div>

            {/* Profile Dropdown || Sign In Button */}
            <div className="sm:flex hidden gap-4 md:gap-5 items-center ml-6 mr-6">
                {session?.user ? (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="rounded-full">
                            <Image
                                src="/images/profile.png"
                                width={42}
                                height={42}
                                className="rounded-full"
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
                ) : (
                    <Link href="/register">
                        <button className="rounded-full text-white px-4 py-2 border border-white hover:bg-white hover:text-black transition">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Nav;
