import Image from "next/image";

import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProperties />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  );
}
