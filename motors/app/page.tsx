import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NewHero } from '@/components/home/NewHero';
import { Testimonials } from '@/components/home/Testimonials';
import { FAQ } from '@/components/home/FAQ';

// Dynamic imports for heavy components to reduce initial bundle size
const FeaturedListings = dynamic(() => import('@/components/home/FeaturedListings'), {
  loading: () => <div className="h-[600px] bg-[#0f1012] animate-pulse" />
});

const CategoryGrid = dynamic(() => import('@/components/home/CategoryGrid').then(mod => mod.CategoryGrid), {
  loading: () => <div className="h-64 bg-[#0f1012] animate-pulse" />
});

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
