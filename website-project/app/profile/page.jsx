'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';

const MyProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }

    const fetchUserData = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/users/${session?.user.id}`);
          const data = await res.json();
          setUserData(data);
        } catch (err) {
          console.error('Failed to fetch user data', err);
        }
      }
    };

    fetchUserData();
  }, [session, status]);

  if (status === 'loading' || !userData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return <Profile sessionUser={userData} />;
};

export default MyProfilePage;
