import { Film } from 'lucide-react';

import { MovieList } from '@/components/organisms/movie-list';

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-3">
            <Film className="h-8 w-8 md:h-10 md:w-10" />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">CineTrack</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Discover popular movies and series with detailed information and ratings
          </p>
        </div>

        {/* Popular Movies Section */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Popular Movies</h2>
          <MovieList />
        </section>
      </main>
    </div>
  );
}
