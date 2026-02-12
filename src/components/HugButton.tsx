import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HugButton() {
  const [hugged, setHugged] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        onClick={() => setHugged(true)}
        className="love-gradient-bg px-8 py-4 rounded-full text-primary-foreground font-display text-xl md:text-2xl font-semibold tracking-wide shadow-lg cursor-pointer border-none"
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px hsl(340 80% 55% / 0.5)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        Click to Receive a Hug 🤗
      </motion.button>

      <AnimatePresence>
        {hugged && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="text-7xl md:text-9xl heart-glow"
              animate={{
                scale: [1, 1.2, 1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💖
            </motion.div>
            <motion.p
              className="text-lg md:text-2xl font-body text-foreground text-center max-w-md italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              "No distance can stop my hug from reaching you."
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
