import { giftCards } from '@/data/GiftCards';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default async function BuyPage({ params }) {
    const { id } = await params;
    const res = await fetch(`http://localhost:3000/api/${id}/buy`, { cache: 'no-store' });
    console.log(res)
  if (!res.ok) {
    return (
      <div className="text-white text-center mt-10">
        <h1>Gift card not found.</h1>
        <Link href="/" className="text-lime-400 underline mt-4 block">Back to home</Link>
      </div>
    );
  }

  const card = await res.json();

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
        <Image
          src={card.image}
          width={600}
          height={300}
          alt={card.name}
          className="rounded-lg w-full object-cover mb-4"
        />
        <p className="text-gray-300 mb-2">Category: {card.category}</p>
        <p className="text-lime-400 text-2xl font-bold mb-6">${card.price}</p>

        <button className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};
