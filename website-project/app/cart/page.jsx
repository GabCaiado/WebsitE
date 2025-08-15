"use client";

import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const makePayment = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: cartItems }),
    });

    const { url, error } = await res.json();

    if (error) {
      console.error(error);
      return;
    }

    window.location.href = url;
  };

  return (
    <div className="p-6 flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-6 lg:ml-52 text-white">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx} className="my-6 w-full">
              <div className="bg-gray-600/50 p-4 rounded-md w-full max-w-5xl mx-auto">
                <div className="flex items-center justify-between gap-4">
                  <img className="w-36 rounded-md" src={item.image} alt={item.name} />
                  <div className="flex-1 px-2">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-green-400">${item.price}</p>
                  </div>
                  <p className="text-white">Quantity: {item.quantity || 1}</p>
                  <p className="text-green-400">
                    Total: ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="grid grid-flow-col justify-items-end-safe">
        <button
          className="justify-self-center py-2 px-5 hover:scale-105 transition-transform cursor-pointer focus-within:ring-2 hover:ring-2 hover:ring-white bg-lime-400 text-black rounded-md"
          onClick={makePayment}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
