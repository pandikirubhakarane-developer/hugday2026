import { Suspense } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import FloatingHeartsCSS from '@/components/FloatingHeartsCSS';
import HugButton from '@/components/HugButton';
import romanticBg from '@/assets/romantic-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: 'easeOut' },
  }),
};

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${romanticBg})` }}
      >
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* 3D Hearts */}
      <Suspense fallback={null}>
        <FloatingHearts />
      </Suspense>

      {/* CSS Floating Hearts */}
      <FloatingHeartsCSS />

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          {/* Headline */}
          <motion.h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold glow-text text-primary"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Happy Hug Day ❤️
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="w-24 h-[2px] mx-auto gold-gradient-bg rounded-full"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          />

          {/* Love letter */}
          <motion.div
            className="romantic-glass rounded-2xl p-8 md:p-10 space-y-6"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-body">
              Dear Love, even though we are miles apart, our hearts are always close…
            </p>
            <p className="text-xl md:text-2xl font-display font-semibold text-accent italic glow-text">
              "Wherever I am, our love will never end."
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 font-body">
              We may be in a long-distance relationship, but every mile between us is a testament
              to the strength of our love. Distance doesn't weaken us — it makes our bond
              unbreakable, our hearts inseparable, and every moment together more precious.
            </p>
          </motion.div>

          {/* Hug Button */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <HugButton />
          </motion.div>

          {/* Closing */}
          <motion.p
            className="text-xl md:text-2xl font-display italic text-blush"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Sending you the warmest hug across the miles 🤗
          </motion.p>

          {/* Sparkle decorators */}
          <motion.div
            className="flex justify-center gap-3 text-2xl"
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="sparkle" style={{ '--delay': '0s', '--duration': '2s' } as React.CSSProperties}>✨</span>
            <span className="sparkle" style={{ '--delay': '0.5s', '--duration': '2.5s' } as React.CSSProperties}>💕</span>
            <span className="sparkle" style={{ '--delay': '1s', '--duration': '2s' } as React.CSSProperties}>✨</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
