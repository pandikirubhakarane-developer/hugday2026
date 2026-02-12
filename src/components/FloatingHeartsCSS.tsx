import { useMemo } from 'react';

export default function FloatingHeartsCSS() {
  const hearts = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      duration: `${Math.random() * 6 + 6}s`,
      delay: `${Math.random() * 8}s`,
      opacity: Math.random() * 0.4 + 0.1,
    })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart absolute text-primary"
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.opacity,
            '--duration': h.duration,
            '--delay': h.delay,
          } as React.CSSProperties}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
