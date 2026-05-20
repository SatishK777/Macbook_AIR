"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const chips = [
  { label: "Neural Engine", value: "16-core", x: "left-[7%]", y: "top-[17%]" },
  { label: "Unified Memory", value: "24GB", x: "right-[8%]", y: "top-[24%]" },
  { label: "Battery", value: "18 hrs", x: "left-[10%]", y: "bottom-[18%]" },
  { label: "Design", value: "Fanless", x: "right-[12%]", y: "bottom-[16%]" },
];

export default function PerformanceReactor() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const coreScale = useTransform(scrollYProgress, [0.08, 0.45, 0.78], [0.78, 1.08, 0.9]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.42], [80, -20]);
  const titleOpacity = useTransform(scrollYProgress, [0.06, 0.18, 0.48], [0, 1, 0.22]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const scanY = useTransform(scrollYProgress, [0.1, 0.85], ["-15%", "115%"]);
  const statOpacity = useTransform(scrollYProgress, [0.24, 0.42, 0.82], [0, 1, 1]);
  const statY = useTransform(scrollYProgress, [0.22, 0.5], [70, 0]);

  return (
    <section ref={sectionRef} className="relative h-[250vh] overflow-clip bg-[#030303] text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ y: fieldY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_68%_48%,rgba(45,212,191,0.17),transparent_28%),radial-gradient(circle_at_28%_62%,rgba(244,114,182,0.12),transparent_26%),linear-gradient(180deg,#030303_0%,#0a0a0a_48%,#020202_100%)]"
        />

        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />

        <motion.div
          style={{ y: scanY }}
          className="absolute left-0 right-0 h-28 bg-gradient-to-b from-transparent via-cyan-200/10 to-transparent mix-blend-screen"
        />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-20 max-w-xl">
            <div className="eyebrow-premium mb-7 flex items-center gap-4 text-cyan-100/70">
              <span className="h-px w-12 bg-cyan-100/50" />
              Next chapter
            </div>
            <h2 className="title-premium text-premium text-5xl sm:text-6xl md:text-7xl">
              The quiet core that bends the day.
            </h2>
            <p className="copy-premium mt-7 max-w-md text-base font-light text-neutral-300 sm:text-lg">
              M3 turns the Air into a calm little reactor: fast launches, heavy creative work, and no fan noise breaking the spell.
            </p>
          </motion.div>

          <div className="relative z-10 min-h-[32rem] lg:min-h-[42rem]">
            <motion.div
              style={{ scale: coreScale, rotate: coreRotate }}
              className="absolute left-1/2 top-1/2 h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[30rem] sm:w-[30rem]"
            >
              <div className="absolute inset-8 rounded-full border border-dashed border-cyan-100/20" />
              <div className="absolute inset-20 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_30px_rgba(165,243,252,0.95)]" />
              <div className="absolute bottom-8 right-16 h-2 w-2 rounded-full bg-pink-200 shadow-[0_0_26px_rgba(251,207,232,0.9)]" />
            </motion.div>

            <motion.div
              style={{ scale: coreScale }}
              className="absolute left-1/2 top-1/2 grid h-56 w-56 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-[2rem] border border-white/15 bg-black/70 shadow-[0_0_120px_rgba(103,232,249,0.18)] backdrop-blur-xl sm:h-72 sm:w-72"
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_32%,rgba(103,232,249,0.12)_55%,transparent)]" />
              <div className="absolute inset-5 rounded-[1.45rem] border border-white/10" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-100/80 to-transparent" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <div className="relative text-center">
                <div className="stat-premium text-metal text-[5rem] font-semibold leading-none sm:text-[7rem]">M3</div>
                <div className="eyebrow-premium mt-3 text-cyan-100/60">3nm architecture</div>
              </div>
            </motion.div>

            {chips.map((chip, index) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-18%" }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute ${chip.x} ${chip.y} hidden min-w-36 border-t border-white/15 pt-4 md:block`}
              >
                <div className="stat-premium text-2xl font-medium text-white">{chip.value}</div>
                <div className="eyebrow-premium mt-1 text-white/45">{chip.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          style={{ opacity: statOpacity, y: statY }}
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/35 px-5 py-5 backdrop-blur-xl sm:px-8"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-4">
            {[
              ["60%", "faster than M1"],
              ["2x", "faster neural tasks"],
              ["0dB", "fan noise"],
              ["All day", "untethered work"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="stat-premium text-2xl font-semibold text-white md:text-3xl">{value}</div>
                <div className="mt-1 text-xs text-neutral-400">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
