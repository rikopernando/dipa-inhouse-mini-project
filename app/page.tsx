import { MovieList } from '@/components/organisms/movie-list';
import { HeroSection } from '@/components/molecules/hero-section';
import { PageSection } from '@/components/molecules/page-section';
import { PAGE_CONTENT } from '@/lib/constants';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <HeroSection
        title={PAGE_CONTENT.HOME.HERO.TITLE}
        description={PAGE_CONTENT.HOME.HERO.DESCRIPTION}
      />

      <PageSection title={PAGE_CONTENT.HOME.SECTIONS.TRENDING.TITLE}>
        <MovieList />
      </PageSection>
    </div>
  );
}
