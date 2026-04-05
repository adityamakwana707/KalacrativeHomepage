import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { useCursor } from './CursorContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const projects = [
  {
    title: 'Contemporary Dance',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1524330685423-3e1966445abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2UlMjBzcG90bGlnaHR8ZW58MXx8fHwxNzc1NDExODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    number: '01'
  },
  {
    title: 'Heritage Series',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1769802104468-4c5ddf151d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGFydHMlMjBwb3J0cmFpdCUyMEluZGlhbiUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NzU0MTE4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    number: '02'
  },
  {
    title: 'Architectural Narrative',
    category: 'Digital Content',
    image: 'https://images.unsplash.com/photo-1762279938707-c0a485965815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlJTIwY3VsdHVyYWwlMjBzcGFjZXxlbnwxfHx8fDE3NzU0MTE4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    number: '03'
  },
  {
    title: 'Immersive Concert',
    category: 'Event Production',
    image: 'https://images.unsplash.com/photo-1765344550212-a3b963d63c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwZXZlbnQlMjBwcm9kdWN0aW9uJTIwbGlnaHRpbmclMjBjb25jZXJ0fGVufDF8fHx8MTc3NTQxMTgxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    number: '04'
  },
  {
    title: 'Festival Celebration',
    category: 'Cultural Event',
    image: 'https://images.unsplash.com/photo-1761124739538-587cd3e3f72a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGZlc3RpdmFsJTIwY2VsZWJyYXRpb24lMjBldmVudHxlbnwxfHx8fDE3NzU0MTE4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    number: '05'
  }
];

export function FeaturedWork() {
  const targetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const { setCursorState, setCursorText } = useCursor();

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section 
      id="work" 
      ref={targetRef} 
      className="relative h-[400vh] bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-20 mb-12">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
            className="flex items-end justify-between"
          >
            <div>
              <p className="text-xs tracking-[0.4em] uppercase mb-6 text-[#8B0000] font-bold">
                Selected Works
              </p>
              <h2 
                className="text-[#F5F5F0]"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Stories We've <span className="italic text-[#8B0000]">Told</span>
              </h2>
            </div>
            <p className="hidden md:block text-[#F5F5F0]/50 max-w-sm text-right font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
              Explore our portfolio of culturally resonant productions and immersive experiences.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Track */}
        <motion.div 
          style={{ x }} 
          className="flex gap-12 px-6 md:px-12 lg:px-20 pb-20"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="relative w-[80vw] md:w-[45vw] lg:w-[30vw] flex-shrink-0 group"
              onMouseEnter={() => {
                setCursorState('explore');
                setCursorText('VIEW');
              }}
              onMouseLeave={() => {
                setCursorState('default');
                setCursorText('');
              }}
            >
              {/* Project Image */}
              <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-white/5">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 
                    className="text-[#F5F5F0] text-2xl md:text-3xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#F5F5F0]/50 text-sm tracking-widest uppercase">
                    {project.category}
                  </p>
                </div>
                <div className="text-[#8B0000] font-serif text-2xl italic">
                  {project.number}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}