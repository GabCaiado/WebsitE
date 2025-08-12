"use client";

import {useCart} from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, removeFromCart } = useCart();

    return (
        <div className="p-6 flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6 lg:ml-52 text-white">Your Cart</h1>
            {cartItems === 0 ? (
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
                                Total: ${(item.price * item.quantity).toFixed(2)}
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
        </div>
    );
}