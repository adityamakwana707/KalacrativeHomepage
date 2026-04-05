import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCursor } from './CursorContext';

export function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  const { setCursorState } = useCursor();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen py-32 md:py-40 bg-[#F5F5F0] overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative">
        
        {/* Large Background Statement */}
        <motion.div 
          style={{ y: textY }}
          className="absolute top-20 left-0 w-full pointer-events-none opacity-[0.03] text-center"
        >
          <h2 className="font-serif text-[15vw] leading-none whitespace-nowrap">
            ROOTED IN HERITAGE
          </h2>
        </motion.div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between mt-32">
          
          {/* Visuals - Layered Composition */}
          <div 
            className="w-full lg:w-1/2 relative h-[70vh] mb-20 lg:mb-0"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            <motion.div 
              style={{ y: imageY }}
              className="absolute top-0 left-0 w-[80%] h-[80%] z-10 overflow-hidden"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1769802104468-4c5ddf151d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGFydHMlMjBwb3J0cmFpdCUyMEluZGlhbiUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NzU0MTE4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Cultural performer"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute bottom-0 right-0 w-[50%] h-[60%] z-20 overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1524330685423-3e1966445abe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBkYW5jZSUyMHBlcmZvcm1hbmNlJTIwc3RhZ2UlMjBzcG90bGlnaHR8ZW58MXx8fHwxNzc1NDExODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Contemporary Performance"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Text Content - Large Statements */}
          <div className="w-full lg:w-[45%] lg:pl-16 relative z-30" ref={textRef}>
            <div className="overflow-hidden mb-8">
              <motion.p
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="text-xs tracking-[0.4em] uppercase text-[#8B0000] font-bold"
              >
                Our Manifesto
              </motion.p>
            </div>
            
            <h3 
              className="text-[#0A0A0A] mb-12"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              <div className="overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  We are not just
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  className="block text-[#8B0000] italic"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  storytellers.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  className="block mt-4"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                >
                  We craft moments
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span 
                  className="block"
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : { y: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                >
                  that disrupt silence.
                </motion.span>
              </div>
            </h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p 
                className="text-[#0A0A0A]/60 text-lg md:text-xl max-w-md font-light leading-relaxed mb-16" 
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Fusing ancestral heritage with contemporary precision. We create global experiences that live at the intersection of art, culture, and innovation.
              </p>

              {/* Stats - Redefined */}
              <div className="flex gap-16 border-t border-[#0A0A0A]/10 pt-8">
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2 text-[#8B0000]">500+</p>
                  <p className="text-xs tracking-widest uppercase text-[#0A0A0A]/40">Productions</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2 text-[#8B0000]">50K</p>
                  <p className="text-xs tracking-widest uppercase text-[#0A0A0A]/40">Audience</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
