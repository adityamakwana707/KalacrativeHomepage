export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F5F5F0]/60 py-12 px-6 md:px-12 text-sm uppercase tracking-widest font-mono">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p>© 2026 KALA COLLECTIVE</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#F5F5F0] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#F5F5F0] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#F5F5F0] transition-colors">Vimeo</a>
        </div>
        <p>Awwwards Demo</p>
      </div>
    </footer>
  );
}