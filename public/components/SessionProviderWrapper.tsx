'use client';

// Hum yahan asli SessionProvider ko next-auth/react se import kar rahe hain
import { SessionProvider } from 'next-auth/react';
import React from 'react';

// Yeh wrapper component aapke saare children (aapka pura app) ko wrap karega.
export default function SessionProviderWrapper({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}