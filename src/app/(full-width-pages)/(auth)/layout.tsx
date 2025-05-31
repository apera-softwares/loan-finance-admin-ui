import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-gray-50 z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
          {children}
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
         
      </ThemeProvider>
    </div>
  );
}
