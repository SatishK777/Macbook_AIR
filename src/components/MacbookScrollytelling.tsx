"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const TOTAL_FRAMES = 192; // 0 to 191
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const frameIndex = i.toString().padStart(3, "0");
  return `/sequence/frame_${frameIndex}_delay-0.041s.png`;
});
const WARMUP_BATCH_SIZE = 4;

export default function MacbookScrollytelling() {
  const [loaded, setLoaded] = useState(false);
  const [showHeroOverlay, setShowHeroOverlay] = useState(true);
  const isHydrated = useSyncExternalStore(
    (onStoreChange) => {
      onStoreChange();
      return () => {};
    },
    () => true,
    () => false
  );
  const [loadingProgress, setLoadingProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadingFramesRef = useRef<Set<number>>(new Set());
  const frameReadyCallbacksRef = useRef<Map<number, Set<() => void>>>(new Map());
  const loadedFramesRef = useRef(0);
  const loadedRef = useRef(false);
  const currentFrameRef = useRef(0);
  const drawFrameRef = useRef<(index: number) => void>(() => {});
  const heroPointerX = useMotionValue(0);
  const heroPointerY = useMotionValue(0);
  const heroSpringX = useSpring(heroPointerX, { stiffness: 90, damping: 28, mass: 0.4 });
  const heroSpringY = useSpring(heroPointerY, { stiffness: 90, damping: 28, mass: 0.4 });
  const heroSpotlight = useMotionTemplate`radial-gradient(620px circle at ${heroSpringX}px ${heroSpringY}px, rgba(122, 214, 255, 0.2), rgba(255, 255, 255, 0.06) 28%, transparent 66%)`;

  const loadFrame = useCallback((index: number, onReady?: () => void) => {
    if (index < 0 || index >= TOTAL_FRAMES) return;

    const cachedImage = imagesRef.current[index];
    if (cachedImage?.complete) {
      onReady?.();
      return;
    }

    if (onReady) {
      const callbacks = frameReadyCallbacksRef.current.get(index) ?? new Set<() => void>();
      callbacks.add(onReady);
      frameReadyCallbacksRef.current.set(index, callbacks);
    }

    if (loadingFramesRef.current.has(index)) return;

    loadingFramesRef.current.add(index);

    const img = new Image();
    img.decoding = "async";
    img.src = FRAME_PATHS[index];

    img.onload = () => {
      imagesRef.current[index] = img;
      loadingFramesRef.current.delete(index);
      loadedFramesRef.current += 1;
      setLoadingProgress(Math.round((loadedFramesRef.current / TOTAL_FRAMES) * 100));

      const callbacks = frameReadyCallbacksRef.current.get(index);
      callbacks?.forEach((callback) => callback());
      frameReadyCallbacksRef.current.delete(index);

      if (loadedRef.current && index === currentFrameRef.current) {
        window.requestAnimationFrame(() => drawFrameRef.current(index));
      }
    };

    img.onerror = () => {
      loadingFramesRef.current.delete(index);
      console.error(`Failed to load frame ${index}`);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const drawFrame = useCallback((index: number) => {
    if (!loaded || !canvasRef.current) return;

    const images = imagesRef.current;
    let img = images[index];

    if (!img?.complete) {
      loadFrame(index, () => drawFrameRef.current(index));
      loadFrame(index - 1);
      loadFrame(index + 1);

      for (let distance = 1; distance < TOTAL_FRAMES; distance++) {
        img = images[index - distance] ?? images[index + distance];
        if (img?.complete) break;
      }
    }

    if (!img?.complete) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = Math.round(viewportWidth * dpr);
    const targetHeight = Math.round(viewportHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);

    const imgRatio = img.width / img.height;
    const canvasRatio = viewportWidth / viewportHeight;

    let drawWidth, drawHeight;
    if (canvasRatio > imgRatio) {
      drawHeight = viewportHeight;
      drawWidth = img.width * (viewportHeight / img.height);
    } else {
      drawWidth = viewportWidth;
      drawHeight = img.height * (viewportWidth / img.width);
    }

    const x = (viewportWidth - drawWidth) / 2;
    const y = (viewportHeight - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    // Mask out the 'Veo' watermark in the bottom right corner
    const watermarkWidth = drawWidth * 0.25;
    const watermarkHeight = drawHeight * 0.15;
    const watermarkX = x + drawWidth - watermarkWidth;
    const watermarkY = y + drawHeight - watermarkHeight;

    ctx.fillStyle = "#000000";
    ctx.fillRect(watermarkX, watermarkY, watermarkWidth, watermarkHeight);
  }, [loadFrame, loaded]);

  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);

  useEffect(() => {
    drawFrameRef.current = drawFrame;
  }, [drawFrame]);

  useEffect(() => {
    let isMounted = true;
    let warmupTimer: number | undefined;

    loadFrame(0, () => {
      if (!isMounted) return;

      setLoaded(true);
      loadedRef.current = true;
      setLoadingProgress(100);
      window.requestAnimationFrame(() => drawFrame(0));

      let nextFrame = 1;
      const warmupFrames = () => {
        if (!isMounted || nextFrame >= TOTAL_FRAMES) return;

        const endFrame = Math.min(nextFrame + WARMUP_BATCH_SIZE, TOTAL_FRAMES);
        for (let index = nextFrame; index < endFrame; index++) {
          loadFrame(index);
        }
        nextFrame = endFrame;
        warmupTimer = window.setTimeout(warmupFrames, 160);
      };

      warmupTimer = window.setTimeout(warmupFrames, 250);
    });

    return () => {
      isMounted = false;
      if (warmupTimer) window.clearTimeout(warmupTimer);
    };
  }, [drawFrame, loadFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    currentFrameRef.current = Math.floor(latest);
    if (loaded) {
      drawFrame(currentFrameRef.current);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowHeroOverlay(latest < 0.22);
  });

  useEffect(() => {
    if (loaded) {
      drawFrame(0);
      const handleResize = () => {
        currentFrameRef.current = Math.floor(frameIndex.get());
        drawFrame(currentFrameRef.current);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // Premium Cinematic Animations
  // Hero (0%)
  const opHero = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.15], [0, -80]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.15], [1, 1.04]);
  const blurHero = useTransform(scrollYProgress, [0, 0.05, 0.15], ["blur(0px)", "blur(0px)", "blur(20px)"]);
  const heroReveal = useTransform(scrollYProgress, [0, 0.12], [0, -52]);
  const heroChromeY = useTransform(scrollYProgress, [0, 0.15], [0, 56]);
  const heroChromeOpacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 0.7, 0]);
  const heroScanX = useTransform(scrollYProgress, [0, 0.15], ["-18%", "118%"]);

  // Feature 1 (30%)
  const opFeat1 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const yFeat1 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [100, 0, -100]);
  const scaleFeat1 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0.95, 1, 1.05]);
  const blurFeat1 = useTransform(scrollYProgress, [0.2, 0.28, 0.32, 0.4], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // Feature 2 (60%)
  const opFeat2 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const yFeat2 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [100, 0, -100]);
  const scaleFeat2 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0.95, 1, 1.05]);
  const blurFeat2 = useTransform(scrollYProgress, [0.5, 0.58, 0.62, 0.7], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // CTA (90%)
  const opCTA = useTransform(scrollYProgress, [0.8, 0.9, 1.0], [0, 1, 1]);
  const yCTA = useTransform(scrollYProgress, [0.8, 0.9, 1.0], [100, 0, 0]);
  const scaleCTA = useTransform(scrollYProgress, [0.8, 0.9, 1.0], [0.95, 1, 1]);
  const blurCTA = useTransform(scrollYProgress, [0.8, 0.9, 1.0], ["blur(20px)", "blur(0px)", "blur(0px)"]);

  const heroMotionStyle = isHydrated
    ? { opacity: opHero, y: yHero, scale: scaleHero, filter: blurHero }
    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
  const heroChromeMotionStyle = isHydrated
    ? { y: heroChromeY, opacity: heroChromeOpacity }
    : { y: 0, opacity: 1 };
  const heroChromeOpacityStyle = isHydrated ? { opacity: heroChromeOpacity } : { opacity: 1 };
  const heroRevealStyle = isHydrated ? { y: heroReveal } : { y: 0 };
  const heroScanStyle = isHydrated ? { x: heroScanX, opacity: heroChromeOpacity } : { x: "-18%", opacity: 1 };
  const heroSpotlightStyle = isHydrated
    ? { background: heroSpotlight, opacity: opHero }
    : { background: "transparent", opacity: 1 };
  const feature1MotionStyle = isHydrated
    ? { opacity: opFeat1, y: yFeat1, scale: scaleFeat1, filter: blurFeat1 }
    : { opacity: 0, y: 100, scale: 0.95, filter: "blur(20px)" };
  const feature2MotionStyle = isHydrated
    ? { opacity: opFeat2, y: yFeat2, scale: scaleFeat2, filter: blurFeat2 }
    : { opacity: 0, y: 100, scale: 0.95, filter: "blur(20px)" };
  const ctaMotionStyle = isHydrated
    ? { opacity: opCTA, y: yCTA, scale: scaleCTA, filter: blurCTA }
    : { opacity: 0, y: 100, scale: 0.95, filter: "blur(20px)" };

  return (
    <div ref={containerRef} className="h-[400vh] bg-black relative">
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="w-16 h-16 border-t-2 border-white/80 border-solid rounded-full animate-spin mb-8"></div>
          <div className="eyebrow-premium text-white/40">
            Initializing {loadingProgress}%
          </div>
        </div>
      )}

      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        onPointerMove={(event) => {
          heroPointerX.set(event.clientX);
          heroPointerY.set(event.clientY);
        }}
      >
        <canvas ref={canvasRef} className="block" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_24%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.05)_62%,rgba(0,0,0,0.58)_100%)]" />
        <motion.div className="absolute inset-0 mix-blend-screen" style={heroSpotlightStyle} />
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/80 to-transparent"
          style={heroScanStyle}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 pointer-events-none container mx-auto px-5 sm:px-6 max-w-7xl">
          
          {/* Hero */}
          {showHeroOverlay && (
          <motion.div
            style={heroMotionStyle}
            className="absolute inset-0"
          >
            <motion.div
              className="font-display absolute bottom-[8vh] right-[-3vw] select-none text-[17vw] font-semibold leading-none tracking-normal text-white/[0.045] mix-blend-screen"
              style={heroRevealStyle}
            >
              AIR
            </motion.div>

            <motion.div
              className="eyebrow-premium absolute left-5 right-5 top-6 flex items-center justify-between border-t border-white/15 pt-4 text-white/55 sm:left-8 sm:right-8"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -16 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              style={heroChromeOpacityStyle}
            >
              <span>MacBook Air</span>
              <span className="text-cyan-100/80">M3</span>
            </motion.div>

            <div className="relative grid h-full grid-cols-12 items-center">
              <div className="col-span-12 max-w-[34rem] text-left md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -28 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                  className="eyebrow-premium mb-6 flex w-fit items-center gap-3 text-cyan-100/75"
                >
                  <span className="h-px w-10 bg-cyan-100/50" />
                  All-day power. Barely-there weight.
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -34 }}
                  animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -34 }}
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
                  className="title-premium text-premium max-w-[11ch] text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  Lightness with teeth.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -24 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
                  className="copy-premium mt-6 max-w-md text-base font-light text-neutral-300 sm:text-lg"
                >
                  A silent M3 machine wrapped in a blade-thin body, tuned for work that moves as fast as you do.
                </motion.p>

                <motion.div
                  style={heroChromeMotionStyle}
                  className="mt-9 grid max-w-md grid-cols-3 gap-3"
                >
                  {[
                    ["18hr", "battery"],
                    ["M3", "silicon"],
                    ["1.24kg", "weight"],
                  ].map(([value, label]) => (
                    <div key={value} className="border-l border-white/15 pl-3">
                      <div className="stat-premium text-xl font-medium text-white sm:text-2xl">{value}</div>
                      <div className="eyebrow-premium mt-1 text-white/40">{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-[8vh] right-5 hidden w-[min(34vw,28rem)] md:block"
              style={heroChromeOpacityStyle}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              <div className="eyebrow-premium mt-4 flex items-center justify-between text-white/45">
                <span>Silent fanless architecture</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(165,243,252,0.85)]" />
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-5 h-14 w-px overflow-hidden bg-white/15 sm:left-8"
              style={heroChromeOpacityStyle}
            >
              <motion.span
                className="absolute left-0 top-0 h-5 w-px bg-white"
                animate={{ y: [0, 56] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
          )}

          {/* Feature 1 */}
          <motion.div
            style={feature1MotionStyle}
            className="absolute inset-0 flex flex-col items-start justify-center pr-[50%] md:pr-[55%] pl-[5%]"
          >
            <div className="relative p-10 rounded-3xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
              <h2 className="title-premium text-premium relative mb-5 text-4xl md:text-6xl">
                Radically Thin.
              </h2>
              <p className="copy-premium relative text-lg text-neutral-400 md:text-2xl">
                Weighing next to nothing, the new architecture enables a fanless design that remains entirely silent.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            style={feature2MotionStyle}
            className="absolute inset-0 flex flex-col items-end justify-center pl-[50%] md:pl-[55%] pr-[5%] text-right"
          >
            <div className="relative p-10 rounded-3xl backdrop-blur-xl bg-black/30 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-50"></div>
              <h2 className="title-premium text-premium relative mb-5 text-4xl md:text-6xl">
                M3 Chip.
              </h2>
              <p className="copy-premium relative text-lg text-neutral-400 md:text-2xl">
                M3 brings serious speed and capability. The unified memory architecture delivers unparalleled performance.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            style={ctaMotionStyle}
            className="absolute inset-0 flex flex-col items-center justify-end pb-[15vh] text-center"
          >
            <div className="relative flex flex-col items-center p-12 rounded-3xl w-full max-w-4xl">
              {/* Bottom ambient glow */}
              <div className="absolute bottom-0 w-3/4 h-32 bg-white/5 blur-[80px] rounded-[100%]"></div>
              
              <h2 className="title-premium text-premium relative mb-10 text-5xl md:text-7xl">
                Power. In the air.
              </h2>
              
              <button className="group relative px-10 py-4 font-medium rounded-full pointer-events-auto overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-shadow duration-500">
                {/* Button Outer Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-400 via-white to-neutral-400 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Button Inner Dark Core */}
                <div className="absolute inset-[1px] bg-black rounded-full transition-colors duration-500 group-hover:bg-neutral-900 flex items-center justify-center"></div>
                {/* Button Content */}
                <span className="eyebrow-premium relative z-10 text-white transition-colors duration-500 group-hover:text-white">
                  Buy Now
                </span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
