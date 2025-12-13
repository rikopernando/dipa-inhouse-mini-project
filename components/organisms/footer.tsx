import Link from 'next/link';
import { Typography } from '@/components/atoms/typography';
import { Github, Heart } from 'lucide-react';

/**
 * Footer component with app information
 * Displays credits, links, and additional information
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <Typography variant="h6" className="mb-3">
              CineTrack
            </Typography>
            <Typography variant="muted" className="text-sm">
              Discover popular movies and series with detailed information powered by TMDB API.
            </Typography>
          </div>

          {/* Quick Links */}
          <div>
            <Typography variant="h6" className="mb-3">
              Quick Links
            </Typography>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                Popular Movies
              </Link>
            </nav>
          </div>

          {/* Credits */}
          <div>
            <Typography variant="h6" className="mb-3">
              Credits
            </Typography>
            <Typography variant="muted" className="mb-2 text-sm">
              Data provided by{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary font-medium transition-colors"
              >
                TMDB
              </a>
            </Typography>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-6">
          <Typography variant="muted" className="flex items-center justify-center gap-1 text-sm">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using Next.js &
            TypeScript © {currentYear}
          </Typography>
        </div>
      </div>
    </footer>
  );
}
