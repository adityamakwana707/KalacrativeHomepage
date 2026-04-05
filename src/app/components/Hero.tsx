import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform } from 'motion/react';
import { useCursor } from './CursorContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursorState, setCursorText } = useCursor();
  
  // Mouse position from 0 to 1
  const mouseX = useMotionValue(0.5);
  // Smooth the mouse value for the split line
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothXTransform = useTransform(smoothX, [0, 1], [0, 100]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    mouseX.set(x);
  };

  const handleMouseEnter = () => {
    setCursorState('drag');
    setCursorText('DRAG');
  };

  const handleMouseLeave = () => {
    setCursorState('default');
    setCursorText('');
    mouseX.set(0.5); // Reset to middle
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0A0A0A] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background World: Modern Minimalism (Right Side) */}
      <div className="absolute inset-0 flex items-center justify-end px-[5%] md:px-[10%]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1667061069080-d1e4ce6ec189?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXNtJTIwYXJjaGl0ZWN0dXJlJTIwcmVkfGVufDF8fHx8MTc3NTQxMjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#8B0000]/20" />
        
        <div className="relative z-10 w-full max-w-[50vw] text-right pointer-events-none">
          <motion.h1 
            className="text-[#F5F5F0]"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 15rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              fontWeight: 900,
              textTransform: 'uppercase'
            }}
          >
            Modern
            <br />
            <span 
              className="text-transparent opacity-40"
              style={{ WebkitTextStroke: "2px #F5F5F0" }}
            >
              Design
            </span>
          </motion.h1>
          <p className="mt-8 text-[#F5F5F0]/80 font-mono text-sm tracking-widest uppercase max-w-sm ml-auto">
            Embracing the future through minimalist expression and structured chaos.
          </p>
        </div>
      </div>

      {/* Foreground World: Cultural Heritage (Left Side, Masked) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-start px-[5%] md:px-[10%] bg-[#0A0A0A] overflow-hidden"
        style={{ 
          clipPath: useMotionTemplate`polygon(0 0, ${smoothXTransform}% 0, ${smoothXTransform}% 100%, 0 100%)`,
        }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1756382616831-998e8baf9675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjdWx0dXJlJTIwY2xhc3NpY2FsJTIwZGFuY2V8ZW58MXx8fHwxNzc1NDEyNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Classical Indian Dance"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-transparent opacity-80" />
        
        <div className="relative z-10 w-full max-w-[50vw] pointer-events-none">
          <h1 
            className="text-[#F5F5F0]"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 12vw, 15rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              fontStyle: 'italic'
            }}
          >
            Timeless
            <br />
            <span className="text-[#D4AF37]">Culture</span>
          </h1>
          <p className="mt-8 text-[#F5F5F0]/90 text-lg md:text-xl font-light max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Preserving ancestral stories and the emotional depth of our heritage.
          </p>
        </div>
      </motion.div>

      {/* Split Line Indicator */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-white/30 pointer-events-none z-20 flex items-center justify-center mix-blend-difference"
        style={{ left: useMotionTemplate`${smoothXTransform}%`, x: "-50%" }}
      >
      </motion.div>
    </section>
  );
}
