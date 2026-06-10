import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Articles } from '@/components/Articles';
import { About } from '@/components/About';
import { Donation } from '@/components/Donation';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Features />
      <Articles />
      <About />
      <Donation />
      <Footer />
    </main>
  );
}
