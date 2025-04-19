"use client"
import { SignUp, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {

    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [unauthorized, setUnauthorized] = useState(false);
  
    useEffect(() => {
      if (!isLoaded) return;
  
      const role = user?.publicMetadata?.role;
  
      if (role !== "admin") {
        setUnauthorized(true);
      }
    }, [isLoaded, user]);
  
    if (!isLoaded) return null;
  
    if (unauthorized) {
      return (
        <div className="h-screen flex items-center justify-center text-red-500 text-lg">
          Access Denied.
        </div>
      );
    }
  
    return (
        <div
            style={{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                src="/bg.png"
                alt="Background"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                }}
            />
            <div style={{ position: 'relative', zIndex: 1 }} >
            <p className='text-white p-2 m-2 text-center text-2xl'>Admin Sign Up</p>
                <SignUp />
                
            </div>
        </div>
    );
}