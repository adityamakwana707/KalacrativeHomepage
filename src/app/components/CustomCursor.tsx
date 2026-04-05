import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const { cursorState, cursorText } = useCursor();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the mouse movements
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'auto';
    };
  }, [cursorX, cursorY]);

  // Handle variants
  const variants = {
    default: {
      width: 16,
      height: 16,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(139, 0, 0, 1)", // Deep Red
      mixBlendMode: "normal" as any,
    },
    hover: {
      width: 80,
      height: 80,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference" as any,
    },
    drag: {
      width: 100,
      height: 100,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "#000",
      mixBlendMode: "normal" as any,
    },
    explore: {
      width: 120,
      height: 120,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(139, 0, 0, 0.9)",
      color: "#fff",
      mixBlendMode: "normal" as any,
    },
    video: {
      width: 0,
      height: 0,
      x: "-50%",
      y: "-50%",
      opacity: 0,
    },
    hidden: {
      opacity: 0
    }
  };

  if (cursorState === 'hidden') return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full text-[12px] font-bold tracking-widest uppercase transition-colors duration-300"
      variants={variants}
      animate={cursorState}
      initial="default"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    >
      {(cursorState === 'drag' || cursorState === 'explore') && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className={cursorState === 'drag' ? 'text-black' : 'text-white'}
        >
          {cursorText || cursorState}
        </motion.span>
      )}
    </motion.div>
  );
}
