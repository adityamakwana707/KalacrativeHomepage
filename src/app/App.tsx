import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { FeaturedWork } from './components/FeaturedWork';
import { Media } from './components/Media';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { CursorProvider } from './components/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { GrainOverlay } from './components/GrainOverlay';

export default function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <GrainOverlay />
      <div className="min-h-screen bg-[#F5F5F0] overflow-x-hidden selection:bg-[#8B0000] selection:text-white">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <FeaturedWork />
        <Media />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </CursorProvider>
  );
}
