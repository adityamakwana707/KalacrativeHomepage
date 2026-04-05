import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useRef } from 'react';
import { useCursor } from './CursorContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Media() {
  const containerRef = useRef(null);
  const { setCursorState, setCursorText } = useCursor();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      className="relative h-[80vh] md:h-screen w-full overflow-hidden cursor-none"
      ref={containerRef}
      onMouseEnter={() => {
        setCursorState('explore');
        setCursorText('PLAY');
      }}
      onMouseLeave={() => {
        setCursorState('default');
        setCursorText('');
      }}
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739296385104-f9e3087897f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBwb3J0cmFpdCUyMHN0b3J5dGVsbGluZyUyMGRyYW1hdGljfGVufDF8fHx8MTc3NTQxMTgxNHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cinematic Storytelling"
          className="w-full h-full object-cover filter brightness-75"
        />
      </motion.div>
      
      {/* Centered Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 
          className="text-[#F5F5F0] text-center mix-blend-overlay"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="italic block mb-4">Watch</span>
          The Reel
        </h2>
      </div>
    </section>
  );
}