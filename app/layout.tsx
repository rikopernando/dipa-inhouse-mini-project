import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { Header } from '@/components/organisms/header';
import { Footer } from '@/components/organisms/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | CineTrack',
    default: 'CineTrack: Movie & Series Explorer',
  },
  description: 'Discover popular movies and series with detailed information and ratings',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
