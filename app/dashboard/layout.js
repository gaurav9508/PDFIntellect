"use client";
import React, { useEffect, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

export default function dashboardLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or show skeleton

  return (
    // <>
    //   <div className="w-full max-w-7xl mx-auto px-4">
    //     <div className="md:w-64 h-screen fixed" suppressHydrationWarning>
    //       <SideBar />
    //     </div>
    //     <div className="md:ml-64" suppressHydrationWarning>
    //       <Header />
    //       <div className="p-10">{children}</div>
    //     </div>
    //   </div>
    // </>

    <div className="w-full flex">
      {/* Sidebar always visible */}
      <div className="w-64 h-screen fixed z-10">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
