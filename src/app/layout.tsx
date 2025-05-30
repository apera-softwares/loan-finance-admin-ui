import { Montserrat } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ReduxProvider from '@/lib/redux/provider';
import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title:
    "Honeybee Harry's",
  description: "Admin Dashboard",
  icons: {
    icon: "/favicon.ico",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${montserrat.className} dark:bg-gray-900`}
        data-new-gr-c-s-check-loaded="14.1235.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
        >
        <ReduxProvider>
          <ThemeProvider>
            <SidebarProvider>
               <div className="z-99999">
                <Toaster/>
                </div>
                 <div className="w-full">
                    {children}
                 </div>
              </SidebarProvider>
          </ThemeProvider>

        </ReduxProvider>
      </body>
    </html>
  );
}
