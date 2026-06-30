import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

import AboutMe from './components/AboutMe';
import Works from './components/Works';
import TechStacks from './components/TechStacks';
import Contact from './components/Contact';
import WorkLists from './components/WorkLists';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWorkListOpen, setIsWorkListOpen] = useState(false);
  const [theme, setTheme] = useState(0); // 0: Dark, 1: Light, 2: Midnight
  const themes = ["dark", "light", "midnight", "br-green", "burgundy"];

  // Handle Theme Change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themes[theme]);
  }, [theme]);

  // Lock scroll when WorkList is open
  useEffect(() => {
    if (isWorkListOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isWorkListOpen]);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a spring physics smoother to the scroll progress to fix "jaggy" scrolling
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Name position container moves from center to left side
  const nameLeft = useTransform(scrollYProgress, [0.05, 0.2], ["50%", "25%"]);
  // Name moves slightly higher when transitioning to the stacked/crammed state
  const nameY = useTransform(scrollYProgress, [0.05, 0.2], ["-50%", "-120%"]);

  // Section 1: About Me (Fades in from right, then fades out "backwards" using scale)
  const aboutX = useTransform(scrollYProgress, [0.05, 0.20], ["50vw", "0vw"]);
  const aboutOp = useTransform(scrollYProgress, [0.05, 0.20, 0.28, 0.34], [0, 1, 1, 0]);
  const aboutScale = useTransform(scrollYProgress, [0.28, 0.34], [1, 0.8]);

  // Section 2: Works
  const worksX = useTransform(scrollYProgress, [0.34, 0.46], ["50vw", "0vw"]);
  const worksOp = useTransform(scrollYProgress, [0.34, 0.46, 0.56, 0.62], [0, 1, 1, 0]);
  const worksScale = useTransform(scrollYProgress, [0.56, 0.62], [1, 0.8]);

  // Section 3: Tech Stacks
  const techX = useTransform(scrollYProgress, [0.62, 0.74], ["50vw", "0vw"]);
  const techOp = useTransform(scrollYProgress, [0.62, 0.74, 0.84, 0.90], [0, 1, 1, 0]);
  const techScale = useTransform(scrollYProgress, [0.84, 0.90], [1, 0.8]);

  // Section 4: Contact (Last section, stays at the end)
  const contactX = useTransform(scrollYProgress, [0.90, 1.0], ["50vw", "0vw"]);
  const contactOp = useTransform(scrollYProgress, [0.90, 1.0], [0, 1]);

  return (
    <>
      <main ref={containerRef} className="h-[500vh]" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex">

        {/* === LEFT SIDE (ANIMATED NAME) === */}
        <motion.div
          className="absolute top-1/2 z-50 pointer-events-none"
          style={{
            left: nameLeft,
            x: "-50%",
            y: nameY
          }}
        >
          {/* Ghost text to perfectly center the container for "Arian Allorde" */}
          <h1 className="text-9xl md:text-8xl font-light tracking-tight text-transparent select-none opacity-0 whitespace-nowrap">
            <span className="font-medium">ARIAN ALLORDE</span>
          </h1>

          {/* First Name */}
          <motion.h1
            className="absolute top-0 left-0 text-5xl md:text-8xl font-light tracking-tight leading-none whitespace-nowrap transition-colors duration-500"
            style={{ color: 'var(--text-color)' }}
          >
            <span className="font-medium">ARIAN</span>
          </motion.h1>

          {/* Last Name (Starts at 46% left which is perfectly next to "Arian ", moves to 0% left) */}
          <motion.h1
            className="absolute text-5xl md:text-8xl font-light tracking-tight leading-none whitespace-nowrap transition-colors duration-500"
            style={{
              top: useTransform(scrollYProgress, [0.05, 0.2], ["0%", "100%"]),
              left: useTransform(scrollYProgress, [0.05, 0.2], ["46%", "0%"]),
              color: 'var(--text-color)'
            }}
          >
            <span className="font-medium">ALLORDE</span>
          </motion.h1>

          {/* Title (Starts centered across full width, moves to left aligned under Allorde) */}
          <motion.div
            className="absolute whitespace-nowrap"
            style={{
              top: useTransform(scrollYProgress, [0.05, 0.2], ["100%", "200%"]),
              left: useTransform(scrollYProgress, [0.05, 0.2], ["50%", "0%"]),
              x: useTransform(scrollYProgress, [0.05, 0.2], ["-50%", "0%"]),
              marginTop: useTransform(scrollYProgress, [0.05, 0.2], ["16px", "32px"])
            }}
          >
            <p className="text-xl md:text-2xl font-medium" style={{ color: 'var(--text-secondary)' }}>
              SOFTWARE DEVELOPER
            </p>
          </motion.div>
        </motion.div>

        {/* === RIGHT SIDE (DYNAMIC CONTENT) === */}
        <div className="absolute top-0 right-0 h-screen w-full md:w-1/2 overflow-hidden pointer-events-auto">
          <motion.div className="absolute inset-0 origin-center" style={{ x: aboutX, opacity: aboutOp, scale: aboutScale, display: useTransform(aboutOp, o => o > 0.1 ? "block" : "none") }}>
            <AboutMe />
          </motion.div>

          <motion.div className="absolute inset-0 origin-center" style={{ x: worksX, opacity: worksOp, scale: worksScale, display: useTransform(worksOp, o => o > 0.1 ? "block" : "none") }}>
            <Works onOpen={() => setIsWorkListOpen(true)} />
          </motion.div>

          <motion.div className="absolute inset-0 origin-center" style={{ x: techX, opacity: techOp, scale: techScale, display: useTransform(techOp, o => o > 0.1 ? "block" : "none") }}>
            <TechStacks />
          </motion.div>

          <motion.div className="absolute inset-0 origin-center" style={{ x: contactX, opacity: contactOp, display: useTransform(contactOp, o => o > 0.1 ? "block" : "none") }}>
            <Contact />
          </motion.div>
        </div>
        </div>
      </main>

      {/* Floating Theme Switcher Button */}
      <motion.button
        onClick={() => setTheme((prev) => (prev + 1) % themes.length)}
        className="theme-switcher fixed bottom-8 left-8 w-12 h-12 flex items-center justify-center rounded-full border border-custom z-[200] pointer-events-auto backdrop-blur-sm"
        style={{ 
          borderColor: 'var(--border-color)',
          color: 'var(--text-color)',
          backgroundColor: 'rgba(255,255,255,0.05)'
        }}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        title={`Current Theme: ${themes[theme]}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{
          filter: "drop-shadow(0 0 8px var(--theme-icon-glow))"
        }}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M22 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </motion.button>

      {/* Subtle Scroll Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 h-0.5 z-[200] origin-left transition-colors duration-500"
        style={{ 
          scaleX: scrollYProgress,
          backgroundColor: 'var(--text-color)',
          width: '100%'
        }}
      />

      <AnimatePresence>
        {isWorkListOpen && (
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: "0vw" }}
            exit={{ x: "100vw" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] w-full h-full overflow-y-auto flex flex-col transition-colors duration-500"
            style={{ backgroundColor: 'var(--bg-color)' }}
          >
            <WorkLists onClose={() => setIsWorkListOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
