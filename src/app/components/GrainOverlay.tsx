export function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.035] mix-blend-difference"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1763652387471-47b88f353b18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRleHR1cmUlMjBncmFpbiUyMG5vaXNlfGVufDF8fHx8MTc3NTQxMjU5M3ww&ixlib=rb-4.1.0&q=80&w=1080")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px'
      }}
    />
  );
}