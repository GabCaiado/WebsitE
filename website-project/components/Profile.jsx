'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Profile = ({ sessionUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    lastname: '',
    phone: '',
    avatar: '',
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [view, setView] = useState("data");
  const [payments, setPayments] = useState([]);
  const { update } = useSession();

  useEffect(() => {
    if (sessionUser) {
      setFormData({
        username: sessionUser.username || '',
        email: sessionUser.email || '',
        name: sessionUser.name || '',
        lastname: sessionUser.lastname || '',
        phone: sessionUser.phone || '',
        avatar: sessionUser.avatar || '',
      });
    }
  }, [sessionUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const userId = sessionUser._id || sessionUser.id;
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Your data has been saved!');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error saving data.');
    }
    setSaving(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append('file', file);

    try {
      // Upload to Cloudinary
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataFile,
      });

      if (!res.ok) throw new Error("Cloudinary upload failed");

      const data = await res.json();

      // Update local state
      const updatedForm = {
        ...formData,
        avatar: data.url,
      };
      setFormData(updatedForm);

      // Save to database
      const userId = sessionUser._id || sessionUser.id;
      const patchRes = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: data.url }),
      });

      if (!patchRes.ok) throw new Error("Failed to update DB");

      await update({ avatar: data.url });

      setMessage("Avatar updated successfully!");
    } catch (error) {
      console.log('Failed to upload avatar', error);
      setMessage("Error updating avatar");
    }
  };

  const showPurchases = async () => {
    try {
      const userId = sessionUser._id || sessionUser.id;
      const res = await fetch(`/api/users/${userId}/payments`);
      const data = await res.json();

      setPayments(data.purchases || []);
      setView("purchases");
    } catch (err) {
      console.error(err);
    }
  };

  const showData = () => {
    setView("data");
  };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <section className="max-w-4xl mx-auto w-full mt-1 p-6 rounded-md shadow-md">
      <div className="flex items-center gap-6 mb-6 border border-gray-400 p-4 rounded-2xl">
        <div className="relative w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-white">
          <Image
            src={formData.avatar || "/images/profile.png"}
            fill
            className="object-cover"
            alt="profile"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-lime-400">{formData.name} {formData.lastname}</p>
          <p className="text-white">{formData.email}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 ml-80">
        <button
          onClick={showData}
          className={`px-3 py-1 rounded ${view === "data" ? "bg-lime-400 text-black" : "text-lime-400 hover:underline"}`}
        >
          Data
        </button>
        <button
          onClick={showPurchases}
          className={`px-3 py-1 rounded ${view === "purchases" ? "bg-lime-400 text-black" : "text-lime-400 hover:underline"}`}
        >
          Recent Purchases
        </button>
      </div>

      {/* Data */}
      {view === "data" && (
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-10 items-start w-full">
            <div className="flex flex-col items-center">
              <div className="p-4 border border-lime-400 rounded-xl flex flex-col items-center">
                <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={formData.avatar || "/images/profile.png"}
                    fill
                    className="object-cover"
                    alt="profile"
                  />
                </div>

                <label
                  htmlFor="avatar-upload"
                  className="mt-4 px-3 py-1 text-sm bg-black text-white border border-white rounded-full cursor-pointer shadow hover:bg-lime-400 hover:text-black hover:border-lime-200"
                >
                  Change Avatar
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />

                <p className="mt-2 text-xl text-lime-400 text-center">{formData.username}</p>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="mt-4 w-36 bg-red-500 text-white py-2 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            <div className="flex-1 border border-gray-400 p-5 pb-8 rounded-2xl">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full border rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-400">First Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-400">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="mt-1 block w-full border rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>

              {message && (
                <p className="text-center text-sm mt-2 text-green-600">{message}</p>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="mt-4 w-40 bg-lime-500 text-white py-2 rounded hover:bg-lime-600"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchases */}
      {view === "purchases" && (
        <div>
          <h2 className="text-xl font-bold text-lime-400 mb-4">Recent Purchases</h2>
          {payments.length === 0 ? (
            <p className="text-gray-300">No purchases found.</p>
          ) : (
            <div className="border border-gray-500 rounded-2xl p-6">
              <ul className="space-y-4">
                {payments.map((p) => (
                  <li
                    key={p.stripePaymentId}
                    className="p-3 bg-gray-600/20 rounded-lg border border-white flex items-center gap-5"
                  >
                    <img
                      src={
                        p.products?.[0]?.image?.startsWith('http')
                          ? p.products?.[0]?.image
                          : `${baseUrl}${p.products?.[0]?.image?.startsWith('/') ? '' : '/'}${p.products?.[0]?.image || '/images/default-product.png'}`
                      }
                      alt={p.products?.[0]?.name || "No product"}
                      width={50}
                      height={50}
                      className="rounded w-24"
                    />
                    <div className="grid grid-cols-3 items-center w-full gap-4">
                      <p className="text-white font-medium">
                        {p.products?.length > 0
                          ? p.products.map(prod => `${prod.name} x${prod.quantity}`).join(", ")
                          : "Unknown Product"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        💳 {p.amount / 100} {p.currency?.toUpperCase()}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {p.status}
                      </p>
                    </div>


                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Profile;
