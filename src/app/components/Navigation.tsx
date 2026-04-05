import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useCursor } from './CursorContext';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setCursorState } = useCursor();

  const navItems = ['About', 'Work', 'Services', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-8 mix-blend-difference"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center text-[#F5F5F0]"
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            <span className="font-serif text-2xl md:text-3xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="italic font-bold">Kala</span>
              <span className="opacity-80">Collective</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex items-center gap-12"
          >
            {navItems.map((item, index) => (
              <li key={item}>
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="text-xs tracking-widest uppercase font-mono text-[#F5F5F0]/70 hover:text-[#F5F5F0] transition-colors duration-300"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F0]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: '100vh' }}
          exit={{ opacity: 0, height: 0 }}
          className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center -z-10"
        >
          <ul className="space-y-8 text-center">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-4xl tracking-wide uppercase font-serif text-[#F5F5F0] hover:italic transition-all duration-300 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}