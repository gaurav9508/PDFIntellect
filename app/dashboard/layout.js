"use client"
import React, { useEffect, useState } from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

export default function dashboardLayout({children}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // or show skeleton

    return (
        <>
            <div className='md:w-64 h-screen fixed' suppressHydrationWarning>
                <SideBar />
            </div>
            <div className='md:ml-64' suppressHydrationWarning>
                <Header />
                <div className='p-10'>
                    {children}
                </div>
            </div>
        </>
    );
}