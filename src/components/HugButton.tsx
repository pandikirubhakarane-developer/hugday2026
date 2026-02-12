import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function HeartBurst() {
  const hearts = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const distance = 120 + Math.random() * 180;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = Math.random() * 24 + 14;
    const delay = Math.random() * 0.3;
    const emoji = ['💖', '💕', '❤️', '💗', '💝', '🤗'][Math.floor(Math.random() * 6)];
    return { id: i, x, y, size, delay, emoji };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ fontSize: h.size }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: h.x,
            y: h.y,
            scale: [0, 1.3, 0.6],
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.8, delay: h.delay, ease: 'easeOut' }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

function ScreenGlow() {
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0.3, 0] }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
      style={{
        background: 'radial-gradient(circle at 50% 50%, hsl(340 80% 55% / 0.4), hsl(320 60% 45% / 0.2), transparent 70%)',
      }}
    />
  );
}

function FloatingMessages() {
  const messages = [
    { text: '💕 I love you', x: -80, y: -60, delay: 0.5 },
    { text: '🤗 Hugging you tight', x: 90, y: -40, delay: 0.8 },
    { text: '✨ You mean everything', x: -60, y: 50, delay: 1.1 },
    { text: '💖 Forever yours', x: 70, y: 70, delay: 1.4 },
  ];

  return (
    <>
      {messages.map((m, i) => (
        <motion.p
          key={i}
          className="absolute text-sm md:text-base font-body text-blush whitespace-nowrap"
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], x: m.x, y: m.y, scale: 1 }}
          transition={{ duration: 2.5, delay: m.delay, ease: 'easeOut' }}
        >
          {m.text}
        </motion.p>
      ))}
    </>
  );
}

export default function HugButton() {
  const [hugged, setHugged] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleHug = useCallback(() => {
    setHugged(true);
    setBurstKey((k) => k + 1);
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-6">
      <motion.button
        onClick={handleHug}
        className="love-gradient-bg px-8 py-4 rounded-full text-primary-foreground font-display text-xl md:text-2xl font-semibold tracking-wide shadow-lg cursor-pointer border-none relative overflow-visible"
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px hsl(340 80% 55% / 0.5)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        {hugged ? 'Hug Again 🤗' : 'Click to Receive a Hug 🤗'}
      </motion.button>

      {/* Heart burst particles */}
      <AnimatePresence mode="wait">
        <HeartBurst key={burstKey} />
      </AnimatePresence>

      {/* Screen-wide glow flash */}
      <AnimatePresence>
        {hugged && <ScreenGlow key={`glow-${burstKey}`} />}
      </AnimatePresence>

      <AnimatePresence>
        {hugged && (
          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Giant pulsing heart */}
            <motion.div
              className="text-8xl md:text-[10rem] heart-glow select-none"
              animate={{
                scale: [1, 1.25, 1, 1.18, 1],
                filter: [
                  'drop-shadow(0 0 20px hsl(340 80% 55% / 0.5))',
                  'drop-shadow(0 0 50px hsl(340 80% 55% / 0.8))',
                  'drop-shadow(0 0 20px hsl(340 80% 55% / 0.5))',
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💖
            </motion.div>

            {/* Floating love messages */}
            <FloatingMessages key={`msgs-${burstKey}`} />

            {/* Main message */}
            <motion.p
              className="text-lg md:text-2xl font-body text-foreground text-center max-w-md italic leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              "No distance can stop my hug from reaching you."
            </motion.p>

            {/* Warm sub-message */}
            <motion.p
              className="text-base md:text-lg font-display text-accent glow-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Feel my arms around you right now 💕
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
