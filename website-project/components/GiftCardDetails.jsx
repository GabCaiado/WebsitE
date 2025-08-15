"use client";

import Image from 'next/image';
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function GiftCardDetails({ card }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(card.price);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({ ...card, price: selectedPrice, quantity });;
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // 2s
  };

  const makePayment = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: [
        {
          name: card.name,
          price: selectedPrice,
          quantity: quantity,
        }
      ] }),
    });

    const { url, error } = await res.json();

    if (error) {
      console.error(error);
      return;
    }

    window.location.href = url;
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div className="max-w-[1200px] mx-auto mt-12 p-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={card.image}
          alt={card.name}
          width={500}
          height={400}
          className="rounded-xl object-contain"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white">{card.name}</h1>
        <p className="text-gray-600">{card.description}</p>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-xl">Select your amount:</p>
          <div className="flex gap-2">
            {[25, 50, 100, 150].map((value) => (
              <button
                key={value}
                onClick={() => setSelectedPrice(value)}
                className={`px-4 py-2 rounded text-sm ${
                selectedPrice === value
                  ? "bg-lime-500 text-white"
                  : "bg-gray-200 hover:bg-lime-400 hover:text-black"
              }`}
            >
                $ {value}
              </button>
            ))}
          </div>
        </div>

        <p className="text-2xl font-bold text-green-600 mt-4">$ {selectedPrice}</p>

        <div className="flex items-center gap-4 mt-4">
          <p className="font-medium">Amount:</p>
          <div className="flex items-center border rounded-md">
            <button
              className="px-3 py-1 text-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1 text-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={makePayment}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-lime-500 text-black px-4 py-2 rounded shadow-lg">
          Item added to cart!
        </div>
      )}
    </div>
  );
}