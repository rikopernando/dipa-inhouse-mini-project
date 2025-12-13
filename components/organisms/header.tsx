import Link from 'next/link';
import { Film } from 'lucide-react';
import { Typography } from '@/components/atoms/typography';

/**
 * Header component with consistent navigation
 * Displays app branding and navigation links
 */
export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4 lg:px-6">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Film className="h-6 w-6" />
          <Typography variant="large" as="span">
            CineTrack
          </Typography>
        </Link>

        {/* Navigation */}
        <nav className="ml-auto flex items-center gap-6">
          <Link href="/" className="hover:text-primary text-sm font-medium transition-colors">
            Home
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            Popular
          </Link>
        </nav>
      </div>
    </header>
  );
}
