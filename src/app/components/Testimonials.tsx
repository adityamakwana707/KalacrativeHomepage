import { motion } from 'motion/react';

const clients = [
  'UNESCO', 'Ministry of Culture', 'National Theatre', 'Google Arts', 
  'Amazon Studios', 'The British Council', 'Tata Group', 'Reliance Foundation'
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-[#F5F5F0] overflow-hidden border-y border-[#0A0A0A]/10">
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
            <div key={i} className="flex items-center px-12">
              <span 
                className="text-4xl md:text-6xl text-[#0A0A0A]/30 font-serif italic hover:text-[#8B0000] transition-colors duration-300"
              >
                {client}
              </span>
              <div className="w-3 h-3 rounded-full bg-[#8B0000]/30 ml-12" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}