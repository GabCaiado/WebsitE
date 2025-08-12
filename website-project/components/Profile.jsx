'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from "next-auth/react";

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
  const { update } =  useSession();

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


  return (
    <section className="max-w-4xl mx-auto w-full mt-10 p-6 rounded-md shadow-md">
      <div className="flex flex-wrap items-start gap-10">
        <div className="bg-lime-500 border mt-16 mr-9 border-white p-3 rounded-md flex flex-col items-center">
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              src={formData.avatar || "/images/profile.png"}
              fill
              className="object-cover"
              alt="profile"
            />
          </div>

          <label
            htmlFor="avatar-upload"
            className="mt-4 px-3 py-1 text-sm bg-white text-black rounded cursor-pointer shadow hover:bg-gray-200"
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

          <p className="mt-2 text-2xl text-white text-center">{formData.username}</p>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-lime-400">My Profile</h1>
          <p className="mb-6 text-white">Manage your account information</p>

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

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
