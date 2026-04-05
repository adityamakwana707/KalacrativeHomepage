import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCursor } from './CursorContext';

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { setCursorState } = useCursor();

  return (
    <section id="contact" className="relative py-40 md:py-48 bg-[#8B0000] overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0A] mix-blend-multiply opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#F5F5F0]/70 text-sm tracking-[0.3em] uppercase mb-8"
          >
            Let's Collaborate
          </motion.p>

          <h2 
            className="text-[#F5F5F0] mb-12"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block">Ready To</span>
            <span 
              className="block italic text-transparent" 
              style={{ WebkitTextStroke: "2px #F5F5F0" }}
            >
              Create?
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center items-center mt-16"
          >
            <motion.a
              href="mailto:hello@kalacollective.com"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 border border-[#F5F5F0] text-[#F5F5F0] tracking-widest uppercase text-sm font-bold overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#F5F5F0] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
              <span className="relative z-10 flex items-center gap-3 group-hover:text-[#8B0000] transition-colors duration-500">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}