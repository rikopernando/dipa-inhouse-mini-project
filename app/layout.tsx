import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
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
  description:
    'Discover popular movies and series with detailed information, ratings, and reviews. Search through thousands of titles and explore trending content.',
  keywords: [
    'movies',
    'series',
    'tv shows',
    'cinema',
    'entertainment',
    'movie database',
    'film ratings',
    'movie reviews',
  ],
  authors: [{ name: 'CineTrack Team' }],
  creator: 'CineTrack',
  publisher: 'CineTrack',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'CineTrack: Movie & Series Explorer',
    description:
      'Discover popular movies and series with detailed information, ratings, and reviews. Search through thousands of titles and explore trending content.',
    siteName: 'CineTrack',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CineTrack - Movie & Series Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineTrack: Movie & Series Explorer',
    description:
      'Discover popular movies and series with detailed information, ratings, and reviews.',
    images: ['/og-image.png'],
    creator: '@cinetrack',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
