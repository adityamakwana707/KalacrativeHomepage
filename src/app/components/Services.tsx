import { motion, useInView, useSpring, useMotionValue } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { useCursor } from './CursorContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const services = [
  {
    title: 'Performances',
    description: 'Contemporary & Classical Showcases',
    image: 'https://images.unsplash.com/photo-1765891551971-1d12acfb0539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2UlMjBhdWRpZW5jZSUyMHN0YWdlfGVufDF8fHx8MTc3NTQxMTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Events & Production',
    description: 'Immersive Experience Design',
    image: 'https://images.unsplash.com/photo-1765344550212-a3b963d63c32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwZXZlbnQlMjBwcm9kdWN0aW9uJTIwbGlnaHRpbmclMjBjb25jZXJ0fGVufDF8fHx8MTc3NTQxMTgxMnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Cultural Workshops',
    description: 'Transformative Learning',
    image: 'https://images.unsplash.com/photo-1763793426538-db411c27894d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzaG9wJTIwYXJ0aXN0aWMlMjBzcGFjZXxlbnwxfHx8fDE3NzU0MTE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    title: 'Digital Narratives',
    description: 'Cinematic Storytelling',
    image: 'https://images.unsplash.com/photo-1674124504779-62197c204390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBmaWxtbWFrZXIlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MXx8fHwxNzc1NDExODEzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { setCursorState } = useCursor();
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mouse position for the floating image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative py-32 md:py-40 bg-[#F5F5F0] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-[#0A0A0A]/10 pb-12"
        >
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-6 text-[#8B0000] font-bold">
              Expertise
            </p>
            <h2 
              className="text-[#0A0A0A]"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              What We <span className="italic text-[#8B0000]">Do</span>
            </h2>
          </div>
        </motion.div>

        {/* Services List */}
        <div className="flex flex-col w-full relative">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                setCursorState('hover');
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setCursorState('default');
              }}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-16 border-b border-[#0A0A0A]/10 cursor-none"
            >
              <h3 
                className="text-[10vw] md:text-[6vw] font-serif leading-none tracking-tighter text-[#0A0A0A] transition-all duration-500 group-hover:text-[#8B0000] group-hover:italic group-hover:translate-x-8"
              >
                {service.title}
              </h3>
              <p className="mt-4 md:mt-0 text-sm md:text-base tracking-widest uppercase text-[#0A0A0A]/40 group-hover:text-[#0A0A0A] transition-colors duration-500">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Image Reveal */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[500px] pointer-events-none z-0 overflow-hidden hidden md:block"
        style={{
          x: imageX,
          y: imageY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {services.map((service, index) => (
          <ImageWithFallback
            key={index}
            src={service.image}
            alt={service.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </motion.div>
    </section>
  );
}