"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function QuantumDive() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale from 1x to 25x. (Scaling beyond 25x on huge text crashes browser GPU textures causing a black screen).
  const rawScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 25]);
  const m3Scale = useSpring(rawScale, { stiffness: 150, damping: 30 });
  
  const m3Opacity = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  const m3Display = useTransform(scrollYProgress, (p) => (p > 0.5 ? "none" : "flex"));
  
  const innerOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const innerY = useTransform(scrollYProgress, [0.4, 1], [100, -50]);
  
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.8]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });
  
  const [isHoveringCore, setIsHoveringCore] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-black text-white cursor-none overflow-hidden"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[100] flex items-center justify-center backdrop-blur-sm"
        style={{ 
          x: springX, 
          y: springY, 
          scale: isHoveringCore ? 3 : 1,
          backgroundColor: isHoveringCore ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.0)",
          willChange: "transform"
        }}
      >
        <div className={`w-1 h-1 bg-white rounded-full transition-opacity ${isHoveringCore ? 'opacity-0' : 'opacity-100'}`}></div>
      </motion.div>

      {/* Sticky Scroll Container */}
      <motion.div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Dynamic Core Background Glow */}
        <motion.div 
          style={{ opacity: bgOpacity, willChange: "opacity" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black pointer-events-none"
        ></motion.div>

        {/* Phase 1: Kinetic M3 Typographic Zoom */}
        <motion.div
          style={{ scale: m3Scale, opacity: m3Opacity, display: m3Display, transformOrigin: "70% 50%" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 
            className="text-[15vw] md:text-[20vw] font-black tracking-tighter leading-none text-neutral-200 select-none"
          >
            M3
          </h1>
        </motion.div>

        {/* Phase 2: The Core Inside */}
        <motion.div 
          style={{ opacity: innerOpacity, y: innerY, willChange: "transform, opacity" }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto px-6"
        >
          <div 
            className="max-w-5xl w-full"
            onMouseEnter={() => setIsHoveringCore(true)}
            onMouseLeave={() => setIsHoveringCore(false)}
          >
            <div className="flex flex-col items-center text-center space-y-16">
              
              <div className="group relative">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 transition-all duration-700">
                  Quantum Speed.
                </h2>
                <p className="text-xl md:text-3xl text-neutral-400 font-light max-w-2xl mx-auto group-hover:text-white transition-colors duration-500">
                  Billions of operations per second. Rendered in absolute silence.
                </p>
              </div>

              {/* Lightweight Core Visualization */}
              <div className="relative flex justify-center items-center py-20 w-full pointer-events-none">
                 {/* Outer Rings */}
                 <motion.div 
                   animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] border-[1px] border-dashed border-white/20 rounded-full"
                 ></motion.div>
                 
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] border-t-2 border-b-2 border-blue-500/50 rounded-full"
                 ></motion.div>

                 {/* Inner Energy Source */}
                 <div className="w-32 h-32 bg-blue-600/40 blur-[50px] rounded-full absolute mix-blend-screen"></div>
                 <div className="w-16 h-16 bg-white blur-[20px] rounded-full absolute mix-blend-screen"></div>
                 
                 <span className="relative z-10 font-mono text-xs tracking-[0.5em] text-white uppercase opacity-70">
                   3nm Architecture
                 </span>
              </div>

              <div className="group relative">
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 transition-all duration-700">
                  Infinite Limits.
                </h2>
                <p className="text-xl md:text-3xl text-neutral-400 font-light max-w-2xl mx-auto group-hover:text-white transition-colors duration-500">
                  18 hours of endurance. Power that defies convention.
                </p>
              </div>

            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
