"use client";

import Link from '@node_modules/next/link'
import React, { useState } from 'react';
import Image from 'next/image'
import Slideshow from './Slideshow'
import { Exo } from 'next/font/google';
import { giftCards } from '@/data/GiftCards';

const exo = Exo({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const Feed = () => {
  const [filter, setFilter] = useState('All');

  const filteredCards = filter === 'All'
    ? giftCards
    : giftCards.filter(card => card.category === filter);

  const cards = [
            { id: "minecraft", href: "/buy/minecraft", src: "/images/minecraft.webp", alt: "minecraft" },
            { id: "valorant", href: "/buy/valorant", src: "/images/valorant.webp", alt: "valorant" },
            { id: "genshin", href: "/buy/genshin", src: "/images/genshin.jpg", alt: "genshin" },
            { id: "roblox", href: "/buy/roblox", src: "/images/roblox.webp", alt: "roblox" },
            { id: "leagueoflegends", href: "/buy/leagueoflegends", src: "/images/league.webp", alt: "leagueoflegends" },
            { id: "freefire", href: "/buy/freefire", src: "/images/freefire.webp", alt: "freefire" },
          ];

  return (
    <>
      {/* Mobile */}
      <section className="block sm:hidden py-6 px-4 rounded-2xl max-w-full">
        <div className="max-w-full">
          <Slideshow />
        </div>
      </section>

      {/* Desktop */}
      <section className="bg-gray-800/40 hidden outline outline-2 sm:flex gap-4 md:gap-5 ml-auto z-10 py-10 px-6 rounded-2xl lg:max-w-[1300px] mx-auto max-h-[500px] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2 pb-2 -mt-8">
          <div className="col-span-1 bg-gray-600/50 p-4 rounded-md w-full max-h-[460px] lg:max-w-[1000px] lg:ml-16">
            <Slideshow />
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-3 gap-x-48 gap-y-2 w-full py-8 pl-36">
            {cards.map((item) => (
              <div key={item.id} className="relative w-[180px] h-[200px] overflow-hidden rounded-lg">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  priority
                />
                <Link
                  href={`/buy/${item.id}`}
                  className="absolute inset-0 z-10"
                >
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex relative min-h-[470px] items-center mt-8">
            <div className="relative flex justify-center items-center h-[250px]">
              {/* Line above */}
              <div className="absolute top-[-120px] left-[310px] -translate-x-1/2 w-[1px] h-[130px] bg-lime-500" />

              <div className={`${exo.className} absolute top-[67px] left-[310px] -translate-x-1/2 rotate-90 text-[16px] tracking-widest font-normal`}>
                <div className="whitespace-nowrap">
                  <span className="text-gray-300">BEST </span>
                  <span className="text-lime-400">SELLERS</span>
                </div>
              </div>

              {/* Line below */}
              <div className="absolute top-[150px] left-[310px] -translate-x-1/2 w-[1px] h-[130px] bg-lime-500" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-20">
        {/* Filter buttons */}
        <div className="mb-4 ml-10 space-x-2">
          {['All', 'Gaming', 'Services', 'Console/Platform', 'Shopping'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1 rounded-full border ${filter === category ? 'bg-lime-400 text-black' : 'bg-gray-800 text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gift-Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ms-10 me-10">
          {filteredCards.map(card => (
            <Link key={card.id} href={`/buy/${card.id}`}>
              <div className="bg-gray-700 rounded-lg overflow-hidden text-white flex flex-col hover:scale-105 transition-transform cursor-pointer">
                <div className="w-full h-40">
                  <Image
                    src={card.image}
                    alt={card.name}
                    width={600}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{card.name}</h3>
                  <p className="text-sm text-gray-300">{card.category}</p>
                  <p className="text-lime-400 font-bold">${card.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}

export default Feed;
