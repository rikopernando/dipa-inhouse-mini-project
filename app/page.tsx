import { Film } from 'lucide-react';

import { MovieList } from '@/components/organisms/movie-list';
import { Typography } from '@/components/atoms/typography';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Film className="h-8 w-8 md:h-10 md:w-10" />
            <Typography variant="h1">CineTrack</Typography>
          </div>
          <Typography variant="lead" className="max-w-2xl">
            Discover popular movies and series with detailed information and ratings
          </Typography>
        </div>

        {/* Popular Movies Section */}
        <section>
          <Typography variant="h2" className="mb-6">
            Popular Movies
          </Typography>
          <MovieList />
        </section>
      </main>
    </div>
  );
}
