"use client";

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile'

const ProfilePage  = () => {
    const { data: session, status  } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
        if (session?.user?.email){
            const fetchUserData = async () => {
                try {
                    const res = await fetch(`/api/users/${session.user.email}`);
                    const result = await res.json();
                    setUserData(result.data);
                } catch (err) {
                    console.log('Failed to fetch profile data', err);
                }
            };
            fetchUserData();
        }
    }, [session, status, router]);

  return (
    <Profile
        name="My"
        data={[userData]}
    />
  )
}

export default ProfilePage
