"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import { Toaster } from "react-hot-toast";
import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <AuthGuard>
        <div className="min-h-screen xl:flex  ">
      <div className="z-49">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin} bg-[#F5F8FA]  `}
      >


        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="relative  w-full min-h-[calc(100vh-140px)] max-w-(--breakpoint-2xl)  mx-auto px-4  lg:px-6 py-6 lg:py-8 ">
          {children}
          </div>
      </div>

    </div>
    </AuthGuard>
  );
}
