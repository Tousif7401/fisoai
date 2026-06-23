import { Hero } from '@/components/Hero';
import { SymbolFold } from '@/components/SymbolFold';
import { Features } from '@/components/Features';
import { Articles } from '@/components/Articles';
import { About } from '@/components/About';
import { Donation } from '@/components/Donation';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <Features />
      <Articles />
      <Donation />
      <SymbolFold />
      <Footer />
    </main>
  );
}
