"use client";
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
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
            <div style={{ position: 'relative', zIndex: 1 }}>
                <SignIn />
            </div>
        </div>
    );
}