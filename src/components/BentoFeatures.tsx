"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const BentoCard = ({ children, className = "", delay = 0 }: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Spotlight values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    // For 3D Tilt (-0.5 to 0.5)
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);

    // For Spotlight
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl bg-neutral-900/30 backdrop-blur-md border border-white/10 overflow-hidden cursor-crosshair group ${className}`}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
        }}
      />
      {/* Content wrapper with translateZ for 3D depth */}
      <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default function BentoFeatures() {
  return (
    <section className="relative min-h-screen bg-black py-32 px-6 md:px-12 overflow-hidden z-10">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-white/5 blur-[150px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-6">
            Pro capability.<br />Everyday portability.
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto">
            Experience the unprecedented power of Apple silicon in our thinnest, lightest design ever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px]">
          {/* Card 1: M3 Performance (Span 2 cols) */}
          <BentoCard delay={0.1} className="md:col-span-2 p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h3 className="text-4xl font-medium tracking-tight text-white mb-2">M3 Chip</h3>
              <p className="text-neutral-400 font-light text-xl">
                Up to 60% faster than M1. Insanely capable.
              </p>
            </div>
            {/* Visual element: Animated Bar Chart */}
            <div className="relative h-56 w-full mt-auto rounded-2xl overflow-hidden bg-gradient-to-tr from-neutral-900 to-black border border-white/5 flex items-end justify-center p-6 shadow-inner">
              <div className="flex items-end gap-3 h-full opacity-90 w-full max-w-md justify-between">
                {[40, 70, 45, 90, 55, 100].map((h, i) => (
                  <div key={i} className="relative w-full max-w-[40px] flex justify-center h-full items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                      className="w-full rounded-t-md bg-gradient-to-t from-neutral-700 via-neutral-300 to-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Fanless (Span 1 col) */}
          <BentoCard delay={0.2} className="md:col-span-1 p-10 md:p-14 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <h3 className="text-4xl font-medium tracking-tight text-white mb-2">Silent.</h3>
              <p className="text-neutral-400 font-light text-xl">
                Fanless design means zero noise.
              </p>
            </div>
            <div className="relative mt-8 w-full flex items-center justify-center flex-1">
              {/* Abstract silent/fanless visualization */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border border-neutral-700/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.02)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full backdrop-blur-xl"></div>
                <div className="w-20 h-20 rounded-full border border-neutral-600/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                </div>
              </motion.div>
            </div>
          </BentoCard>

          {/* Card 3: Battery (Span 1 col) */}
          <BentoCard delay={0.3} className="md:col-span-1 p-10 md:p-14 flex flex-col justify-between">
            <div className="w-full">
              <h3 className="text-4xl font-medium tracking-tight text-white mb-2">Battery</h3>
              <p className="text-neutral-400 font-light text-xl">
                Up to 18 hours.
              </p>
            </div>
            <div className="relative mt-8 w-full flex justify-center flex-1 items-center">
              {/* Battery Graphic */}
              <div className="w-28 h-56 border-4 border-neutral-600 rounded-2xl relative p-1.5 flex flex-col justify-end shadow-2xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-3 bg-neutral-600 rounded-t-sm"></div>
                <motion.div
                  initial={{ height: "10%" }}
                  whileInView={{ height: "95%" }}
                  transition={{ duration: 2, delay: 0.6, ease: "circOut" }}
                  className="w-full bg-gradient-to-t from-emerald-500 to-green-300 rounded-lg shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                ></motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Display (Span 2 cols) */}
          <BentoCard delay={0.4} className="md:col-span-2 p-10 md:p-14 flex flex-col justify-between overflow-hidden">
            <div className="relative z-10 w-full max-w-sm">
              <h3 className="text-4xl font-medium tracking-tight text-white mb-2">Liquid Retina</h3>
              <p className="text-neutral-400 font-light text-xl">
                Support for 1 billion colors. Everything looks brilliant.
              </p>
            </div>
            {/* Visual: Abstract Display Colors */}
            <div className="absolute right-0 bottom-0 w-3/4 md:w-2/3 h-4/5 rounded-tl-2xl overflow-hidden shadow-2xl translate-x-4 translate-y-4 md:translate-x-10 md:translate-y-10 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 blur-2xl scale-125 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-400 opacity-90 border-t border-l border-white/20 rounded-tl-2xl"></div>
              
              {/* Inner screen details */}
              <div className="absolute top-4 left-4 right-0 bottom-0 border-t border-l border-white/10 rounded-tl-xl overflow-hidden backdrop-blur-sm">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "200%" }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                ></motion.div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
