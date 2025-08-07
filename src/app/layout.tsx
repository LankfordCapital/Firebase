import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import { ToastContextProvider } from '@/hooks/use-toast'; // assumed named export
import Toaster from '@/components/ui/toaster';            // ✅ default export confirmed
import { Providers } from '@/components/providers';       // assumed named export

import HeaderWrapper from '@/components/layout/header-wrapper'; // assumed default export
import Footer from '@/components/layout/footer';                // assumed default export

const fontBody = Inter({ subsets: ['latin'], variable: '--font-body' });
const fontHeadline = Space_Grotesk({ subsets: ['latin'], variable: '--font-headline' });

export const metadata: Metadata = {
  title: 'Lankford Capital – Your Partner in Financial Growth',
  description:
    'Lankford Capital offers a wide range of loan products including residential, commercial, and industrial loans.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(fontBody.variable, fontHeadline.variable, 'h-full')}>
      <body className="font-body antialiased flex flex-col h-full">
        <Providers>
          <ToastContextProvider>
            <HeaderWrapper />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ToastContextProvider>
        </Providers>
      </body>
    </html>
  );
}
