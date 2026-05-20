"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const integrations = [
  {
    kicker: "iPhone Mirroring",
    title: "Your iPhone, right on your Mac.",
    body: "Open apps, check messages, and move through your phone without breaking flow. It feels less like switching devices and more like one surface expanding.",
    stat: "mirror",
    accent: "from-cyan-200 to-blue-300",
  },
  {
    kicker: "AirDrop",
    title: "Files cross the room before the thought cools.",
    body: "Photos, video clips, decks, and sketches move between devices with the kind of immediacy that makes cables feel ancient.",
    stat: "nearby",
    accent: "from-fuchsia-200 to-cyan-200",
  },
  {
    kicker: "Universal Clipboard",
    title: "Copy here. Paste there. No ceremony.",
    body: "A line of text, a link, or an image can start on iPhone and land on Mac like both screens share the same invisible desk.",
    stat: "instant",
    accent: "from-amber-100 to-rose-200",
  },
  {
    kicker: "iCloud Sync",
    title: "Everything keeps up in the background.",
    body: "Notes, files, photos, tabs, passwords, and messages stay quietly current, so the device in your hand is always the right one.",
    stat: "always on",
    accent: "from-emerald-200 to-cyan-100",
  },
];

const deviceDots = [
  { label: "iPad", x: "left-[13%]", y: "top-[20%]", color: "bg-cyan-200" },
  { label: "Watch", x: "right-[15%]", y: "top-[24%]", color: "bg-fuchsia-200" },
  { label: "AirPods", x: "left-[18%]", y: "bottom-[18%]", color: "bg-amber-100" },
  { label: "iCloud", x: "right-[17%]", y: "bottom-[18%]", color: "bg-emerald-200" },
];

function MacMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[42rem]">
      <div className="absolute -inset-x-12 top-16 h-64 rounded-full bg-cyan-200/10 blur-[90px]" />
      <div className="relative mx-auto aspect-[1.72] w-[86%] rounded-t-[1.05rem] rounded-b-[0.72rem] bg-gradient-to-b from-[#2f363d] via-[#090d11] to-[#020304] p-[0.44rem] shadow-[0_26px_90px_rgba(0,0,0,0.82),0_0_72px_rgba(125,249,255,0.11)] ring-1 ring-white/18">
        <div className="absolute left-1/2 top-[0.34rem] z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/25" />
        <div className="absolute inset-x-[3%] bottom-[4%] top-[5.5%] overflow-hidden rounded-[0.58rem] bg-[#03070a]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(103,232,249,0.45),transparent_24%),radial-gradient(circle_at_78%_35%,rgba(244,114,182,0.22),transparent_25%),linear-gradient(135deg,#061015,#050507_56%,#101514)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="absolute left-8 top-7 h-2 w-28 rounded-full bg-white/20" />
          <div className="absolute left-8 top-14 h-2 w-44 rounded-full bg-cyan-100/18" />
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-4 gap-3">
            {integrations.map((item) => (
              <div key={item.kicker} className="h-16 rounded-xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-md">
                <div className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${item.accent}`} />
                <div className="mt-3 h-1.5 rounded-full bg-white/18" />
                <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <motion.div
            className="absolute left-[18%] top-[36%] h-24 w-24 rounded-full border border-cyan-100/25"
            animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[16%] top-[30%] h-20 w-20 rounded-full border border-fuchsia-100/20"
            animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0.55, 0.18] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-t-[1.05rem] rounded-b-[0.72rem] bg-[linear-gradient(124deg,rgba(255,255,255,0.16),transparent_23%,transparent_74%,rgba(255,255,255,0.08))]" />
      </div>
      <div className="relative mx-auto h-3.5 w-[96%] overflow-hidden rounded-b-[1.2rem] bg-gradient-to-b from-[#eff3f6] via-[#838a92] to-[#181a1f] shadow-[0_18px_46px_rgba(0,0,0,0.64)]">
        <div className="absolute inset-x-6 top-0 h-px bg-white/80" />
        <div className="absolute left-1/2 top-0 h-2.5 w-24 -translate-x-1/2 rounded-b-2xl bg-black/20" />
      </div>
      <div className="mx-auto h-8 w-[72%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_65%)] blur-2xl" />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative aspect-[9/19] w-28 rounded-[1.8rem] border border-white/18 bg-gradient-to-b from-[#343a41] via-[#080a0d] to-black p-1.5 shadow-[0_24px_70px_rgba(0,0,0,0.7),0_0_48px_rgba(103,232,249,0.16)] sm:w-36">
      <div className="absolute left-1/2 top-2 z-20 h-4 w-14 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full overflow-hidden rounded-[1.36rem] bg-[#020406]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_18%,rgba(103,232,249,0.52),transparent_25%),radial-gradient(circle_at_72%_50%,rgba(244,114,182,0.28),transparent_28%),linear-gradient(180deg,#0a1b1f,#050508_64%,#101614)]" />
        <div className="absolute left-4 right-4 top-9 h-12 rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-xl" />
        <div className="absolute left-4 right-4 top-24 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="aspect-square rounded-2xl border border-white/10 bg-white/[0.075]" />
          ))}
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 h-11 w-11 -translate-x-1/2 rounded-2xl bg-cyan-100/90 shadow-[0_0_38px_rgba(165,243,252,0.74)]"
          animate={{ y: [0, -6, 0], opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

export default function EcosystemIntegration() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const fieldY = useTransform(scrollYProgress, [0, 1], [90, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0.07, 0.18, 0.4], [0, 1, 0.28]);
  const titleY = useTransform(scrollYProgress, [0.06, 0.26], [70, -10]);
  const macScale = useTransform(scrollYProgress, [0.1, 0.42, 0.82], [0.82, 1.02, 0.9]);
  const phoneX = useTransform(scrollYProgress, [0.1, 0.42, 0.78], [130, -24, 40]);
  const phoneY = useTransform(scrollYProgress, [0.1, 0.42, 0.78], [-10, -60, -120]);
  const phoneRotate = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [10, -7, 4]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-24, 44]);
  const connectionOpacity = useTransform(scrollYProgress, [0.18, 0.34, 0.84], [0, 1, 0.85]);
  const visualX = useTransform(scrollYProgress, [0.3, 0.54], ["0%", "-13%"]);
  const cardY = useTransform(scrollYProgress, [0.34, 1], ["24vh", "-120vh"]);
  const cardsOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[420vh] overflow-clip bg-black text-white">
      <motion.div
        style={{ y: fieldY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_24%_26%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_82%_34%,rgba(244,114,182,0.12),transparent_25%),radial-gradient(circle_at_58%_78%,rgba(167,243,208,0.1),transparent_25%),linear-gradient(180deg,#010101_0%,#04100f_48%,#020203_100%)]"
      />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:78px_78px] [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_73%)]" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute left-1/2 top-[8vh] z-30 w-[min(92vw,58rem)] -translate-x-1/2 text-center"
        >
          <div className="eyebrow-premium mb-5 text-cyan-100/70">Apple Ecosystem</div>
          <h2 className="title-premium text-premium text-5xl sm:text-6xl md:text-7xl">
            Works Like Magic With Apple Devices
          </h2>
          <p className="copy-premium mx-auto mt-6 max-w-2xl text-base font-light text-neutral-300 sm:text-lg">
            MacBook Air becomes the center of a private constellation: phone, files, clipboard, and cloud moving around your work without friction.
          </p>
        </motion.div>

        <motion.div style={{ x: visualX }} className="absolute inset-0 z-10 flex items-center justify-center px-5">
          <div className="relative h-[38rem] w-full max-w-6xl">
            <motion.div
              style={{ rotate: orbitRotate, opacity: connectionOpacity }}
              className="absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[42rem] sm:w-[42rem]"
            >
              <div className="absolute inset-12 rounded-full border border-dashed border-cyan-100/14" />
              <div className="absolute inset-24 rounded-full border border-white/[0.07]" />
            </motion.div>

            <motion.svg
              style={{ opacity: connectionOpacity }}
              className="absolute left-1/2 top-1/2 h-[28rem] w-[46rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              viewBox="0 0 760 460"
              fill="none"
            >
              <motion.path
                d="M190 246 C285 150 470 142 586 220"
                stroke="url(#ecosystemLine)"
                strokeWidth="1.2"
                strokeDasharray="8 12"
                animate={{ strokeDashoffset: [0, -80] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M222 306 C318 390 480 366 558 284"
                stroke="url(#ecosystemLineSoft)"
                strokeWidth="1"
                strokeDasharray="4 14"
                animate={{ strokeDashoffset: [0, -72] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="ecosystemLine" x1="170" y1="170" x2="610" y2="240">
                  <stop stopColor="#A5F3FC" stopOpacity="0" />
                  <stop offset="0.52" stopColor="#A5F3FC" stopOpacity="0.82" />
                  <stop offset="1" stopColor="#FBCFE8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="ecosystemLineSoft" x1="220" y1="330" x2="570" y2="280">
                  <stop stopColor="#FDE68A" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#D9F99D" stopOpacity="0.54" />
                  <stop offset="1" stopColor="#A5F3FC" stopOpacity="0" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.div
              style={{ scale: macScale }}
              className="absolute left-1/2 top-[54%] w-[min(88vw,48rem)] -translate-x-1/2 -translate-y-1/2"
            >
              <MacMockup />
            </motion.div>

            <motion.div
              style={{ x: phoneX, y: phoneY, rotate: phoneRotate }}
              className="absolute left-[62%] top-[42%] z-30"
            >
              <PhoneMockup />
            </motion.div>

            {deviceDots.map((dot, index) => (
              <motion.div
                key={dot.label}
                style={{ opacity: connectionOpacity }}
                className={`absolute ${dot.x} ${dot.y} hidden md:block`}
                initial={false}
              >
                <motion.div
                  className={`h-3 w-3 rounded-full ${dot.color} shadow-[0_0_28px_rgba(165,243,252,0.55)]`}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.65, 1, 0.65] }}
                  transition={{ duration: 2.6 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="eyebrow-premium mt-4 text-white/40">{dot.label}</div>
              </motion.div>
            ))}

            <motion.div
              style={{ opacity: connectionOpacity }}
              className="absolute left-[18%] top-[47%] hidden rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-xl md:block"
            >
              <span className="eyebrow-premium text-cyan-100/70">copied on iPhone</span>
            </motion.div>
            <motion.div
              style={{ opacity: connectionOpacity }}
              className="absolute right-[20%] top-[61%] hidden rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-xl md:block"
            >
              <span className="eyebrow-premium text-emerald-100/70">pasted on Mac</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: cardsOpacity }}
          className="absolute bottom-0 right-0 top-0 z-40 hidden w-[39%] overflow-hidden border-l border-white/10 bg-black/[0.18] px-7 backdrop-blur-[2px] lg:block"
        >
          <motion.div style={{ y: cardY }} className="space-y-[18vh] pb-[55vh] pt-[36vh]">
            {integrations.map((item, index) => (
              <article key={item.kicker} className="relative border-t border-white/15 pt-7">
                <div className={`mb-6 h-1 w-20 rounded-full bg-gradient-to-r ${item.accent}`} />
                <div className="mb-5 flex items-center justify-between gap-5">
                  <span className="eyebrow-premium text-cyan-100/65">{item.kicker}</span>
                  <span className="stat-premium text-2xl font-semibold text-white/75">{item.stat}</span>
                </div>
                <h3 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
                  {item.title}
                </h3>
                <p className="copy-premium mt-5 max-w-md text-base font-light text-neutral-300">
                  {item.body}
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/75" />
                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  <span className="stat-premium text-xs text-white/35">0{index + 1}</span>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-5 right-5 z-40 lg:hidden">
          <div className="border-t border-white/15 bg-black/10 pt-5 backdrop-blur-sm">
            <div className="eyebrow-premium mb-3 text-cyan-100/70">Apple Ecosystem</div>
            <h2 className="title-premium text-premium text-4xl">Works Like Magic With Apple Devices</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {integrations.map((item) => (
                <div key={item.kicker} className="border-t border-white/12 pt-3">
                  <div className={`mb-3 h-1 w-10 rounded-full bg-gradient-to-r ${item.accent}`} />
                  <div className="stat-premium text-sm text-white">{item.kicker}</div>
                  <div className="mt-1 text-xs text-white/45">{item.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
