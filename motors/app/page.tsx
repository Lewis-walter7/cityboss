import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NewHero } from '@/components/home/NewHero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedListings } from '@/components/home/FeaturedListings';
import { Testimonials } from '@/components/home/Testimonials';

import { FAQ } from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <NewHero />
        <FeaturedListings />
        <CategoryGrid />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
