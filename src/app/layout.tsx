"use client"
import { Montserrat } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ReduxProvider from '@/lib/redux/provider';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const router = useRouter()

useEffect(()=>{
router.push("/signin")
},[])

  return (
    <html lang="en">
      <body className={`${montserrat.className} dark:bg-gray-900`}
        data-new-gr-c-s-check-loaded="14.1235.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
        style={{
          background:
            "radial-gradient(ellipse at bottom center, #FFF4D2 0%, #F8F8F8 60%)",
        }}>
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider> <Toaster/>{children}</SidebarProvider>
          </ThemeProvider>
         
        </ReduxProvider>
      </body>
    </html>
  );
}
