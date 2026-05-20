"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const storyBeats = [
  {
    kicker: "Liquid Retina",
    title: "A billion colors, held in a sheet of glass.",
    body: "Gradients stay smooth, skin tones keep their warmth, and every frame lands with the kind of polish that makes the Air feel larger than it is.",
    stat: "500 nits",
  },
  {
    kicker: "P3 Wide Color",
    title: "Color that keeps the atmosphere intact.",
    body: "From misty highlights to saturated UI, the display preserves subtle shifts without flattening the mood of the image.",
    stat: "P3",
  },
  {
    kicker: "True Tone",
    title: "The white point moves with the room.",
    body: "The screen adapts to surrounding light so long reading sessions, edits, and late-night work feel less harsh on your eyes.",
    stat: "adaptive",
  },
  {
    kicker: "Camera",
    title: "A camera that cleans up the room.",
    body: "The 1080p FaceTime HD camera works with image processing to keep detail crisp and faces natural, even when the light is less than cinematic.",
    stat: "1080p",
  },
  {
    kicker: "Video Calls",
    title: "Every meeting gets a little more composed.",
    body: "Image processing, display clarity, and microphone pickup work together so you feel present without building a studio around your desk.",
    stat: "clearer",
  },
  {
    kicker: "Media Engine",
    title: "Playback stays fluid while everything else keeps moving.",
    body: "Scrub through video, keep references open, and move between creative apps without the whole experience feeling heavy.",
    stat: "smooth",
  },
  {
    kicker: "Contrast",
    title: "Dark scenes keep their shape.",
    body: "Deeper blacks and clean highlights make films, product renders, and interface details feel precise instead of washed out.",
    stat: "crisp",
  },
  {
    kicker: "Spatial Audio",
    title: "Sound that refuses to stay inside the chassis.",
    body: "Spatial Audio pushes films, edits, and playlists into a wider field, with separation that feels almost impossible from something this thin.",
    stat: "4-speaker",
  },
  {
    kicker: "Dolby Atmos",
    title: "A tiny machine with a bigger room inside it.",
    body: "Supported movies and music gain height and position, so sound feels placed around the display instead of trapped behind it.",
    stat: "Atmos",
  },
  {
    kicker: "Three-mic Array",
    title: "Your voice arrives with focus.",
    body: "Beamforming mics pull speech forward and soften the room around it, so meetings and recordings feel more intentional.",
    stat: "clear voice",
  },
  {
    kicker: "Studio Feel",
    title: "Less setup. More signal.",
    body: "The camera, microphones, and speakers are tuned as a system, turning quick calls and rough captures into something more polished.",
    stat: "ready",
  },
  {
    kicker: "Everyday Cinema",
    title: "Open it anywhere and the scene still lands.",
    body: "On a couch, a train, a desk, or a cafe table, the Air turns a small footprint into a personal theater for work and escape.",
    stat: "portable",
  },
];

const colorNodes = [
  "bg-cyan-200 shadow-[0_0_36px_rgba(103,232,249,0.75)]",
  "bg-fuchsia-200 shadow-[0_0_36px_rgba(244,114,182,0.7)]",
  "bg-amber-100 shadow-[0_0_36px_rgba(254,243,199,0.65)]",
  "bg-emerald-200 shadow-[0_0_36px_rgba(167,243,208,0.65)]",
];

const youtubeSrc =
  "https://www.youtube.com/embed/sAWF5u3T3G8?autoplay=1&mute=1&loop=1&playlist=sAWF5u3T3G8&start=300&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&playsinline=1";

function VideoSurface() {
  return (
    <>
      <iframe
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2"
        src={youtubeSrc}
        title="MacBook display showcase video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.02),rgba(255,255,255,0.24),rgba(0,0,0,0.02))] mix-blend-screen"
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(255,255,255,0.25),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.1),rgba(0,0,0,0.16))]" />
    </>
  );
}

function OpenMacBook() {
  return (
    <div className="relative mx-auto w-full max-w-[52rem]">
      <div className="absolute -inset-x-10 top-[42%] h-52 rounded-full bg-cyan-200/10 blur-[86px]" />
      <div className="absolute -inset-x-8 top-[49%] h-40 rounded-full bg-blue-500/10 blur-[92px]" />

      <div className="relative mx-auto aspect-[1.72] w-[82%] rounded-t-[1.2rem] rounded-b-[0.72rem] bg-gradient-to-b from-[#2d3339] via-[#080b0f] to-[#020304] p-[0.48rem] shadow-[0_30px_100px_rgba(0,0,0,0.86),0_0_78px_rgba(103,232,249,0.1)] ring-1 ring-white/18">
        <div className="absolute inset-[1px] rounded-t-[1.14rem] rounded-b-[0.66rem] border border-white/[0.08]" />
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        <div className="absolute left-1/2 top-[0.38rem] z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/25" />
        <div className="absolute inset-x-[2.9%] bottom-[3.3%] top-[5.2%] overflow-hidden rounded-[0.62rem] bg-black">
          <VideoSurface />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-t-[1.2rem] rounded-b-[0.72rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.16),transparent_22%,transparent_74%,rgba(255,255,255,0.06))]" />
      </div>

      <div className="relative mx-auto -mt-[0.05rem] h-4 w-[94%] overflow-hidden rounded-b-[1.35rem] bg-gradient-to-b from-[#d7d9dc] via-[#7a7f87] to-[#15171b] shadow-[0_18px_40px_rgba(0,0,0,0.68)]">
        <div className="absolute inset-x-5 top-0 h-px bg-white/80" />
        <div className="absolute left-1/2 top-0 h-2.5 w-28 -translate-x-1/2 rounded-b-2xl bg-black/22 shadow-[inset_0_1px_2px_rgba(255,255,255,0.22)]" />
        <div className="absolute bottom-0 left-1/2 h-px w-[90%] -translate-x-1/2 bg-white/12" />
      </div>

      <div className="relative mx-auto h-2.5 w-[78%] rounded-b-full bg-gradient-to-b from-[#676b72] to-[#101115] shadow-[0_14px_30px_rgba(0,0,0,0.54)]" />
      <div className="mx-auto h-10 w-[82%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_64%)] blur-2xl" />
    </div>
  );
}

export default function DisplayAudioExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.86], [0.2, 0.95, 0.42]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-18, 28]);
  const haloScale = useTransform(scrollYProgress, [0.12, 0.5, 0.9], [0.92, 1.08, 0.98]);
  const laptopLeft = useTransform(scrollYProgress, [0.46, 0.66], ["50%", "29%"]);
  const laptopTop = useTransform(scrollYProgress, [0.46, 0.66], ["51%", "52%"]);
  const laptopScale = useTransform(scrollYProgress, [0.24, 0.42, 0.66], [1.06, 1, 0.88]);
  const laptopOpacity = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);
  const fullscreenVideoOpacity = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1, 0]);
  const fullscreenVideoScale = useTransform(scrollYProgress, [0, 0.22, 0.32], [1, 1.06, 0.92]);
  const fullscreenVideoRadius = useTransform(scrollYProgress, [0, 0.22, 0.32], ["0rem", "0.45rem", "1rem"]);
  const introOpacity = useTransform(scrollYProgress, [0.04, 0.14, 0.24], [0, 1, 0]);
  const splitChromeOpacity = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);
  const storyOpacity = useTransform(scrollYProgress, [0.66, 0.76], [0, 1]);
  const storyX = useTransform(scrollYProgress, [0.66, 0.78], [80, 0]);
  const storyY = useTransform(scrollYProgress, [0.72, 1], ["10vh", "-276vh"]);
  const featureRailOpacity = useTransform(scrollYProgress, [0.62, 0.74], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[660vh] overflow-clip bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.16),transparent_27%),radial-gradient(circle_at_82%_40%,rgba(244,114,182,0.1),transparent_25%),linear-gradient(180deg,#020202_0%,#06100f_42%,#010101_100%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:84px_84px] [mask-image:radial-gradient(circle_at_42%_45%,black,transparent_72%)]" />
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-100/30 to-transparent" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: fullscreenVideoOpacity, scale: fullscreenVideoScale, borderRadius: fullscreenVideoRadius }}
          className="absolute inset-0 z-10 overflow-hidden bg-black"
        >
          <VideoSurface />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_34%,rgba(0,0,0,0.32))]" />
        </motion.div>

        <motion.div style={{ opacity: glowOpacity }} className="absolute inset-x-0 top-1/2 h-[32rem] -translate-y-1/2 rounded-full bg-cyan-300/14 blur-[120px]" />
        <motion.div
          style={{ rotate: ringRotate, scale: haloScale, opacity: glowOpacity }}
          className="absolute left-1/2 top-1/2 hidden h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:block"
        >
          <div className="absolute inset-12 rounded-full border border-dashed border-cyan-100/15" />
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_28px_rgba(165,243,252,0.8)]" />
          <div className="absolute bottom-12 right-20 h-1.5 w-1.5 rounded-full bg-fuchsia-100 shadow-[0_0_24px_rgba(251,207,232,0.75)]" />
        </motion.div>

        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute left-1/2 top-[11vh] z-40 w-[min(88vw,42rem)] -translate-x-1/2 text-center"
        >
          <div className="eyebrow-premium mb-4 text-cyan-100/70">Display & Audio</div>
          <h2 className="title-premium text-premium text-4xl sm:text-5xl md:text-6xl">
            Just the screen. Then the story opens.
          </h2>
        </motion.div>

        <motion.div
          style={{ left: laptopLeft, top: laptopTop, scale: laptopScale, x: "-50%", y: "-50%", opacity: laptopOpacity }}
          className="absolute z-30 w-[min(88vw,58rem)]"
        >
          <motion.div
            style={{ opacity: splitChromeOpacity }}
            className="eyebrow-premium mb-8 flex items-center justify-between border-t border-white/15 pt-4 text-white/50"
          >
            <span>Display & Audio</span>
            <span className="text-cyan-100/75">Live on screen</span>
          </motion.div>

          <OpenMacBook />

          <motion.div
            style={{ opacity: featureRailOpacity }}
            className="pointer-events-none absolute -bottom-12 left-1/2 hidden w-[82%] -translate-x-1/2 md:block"
          >
            <div className="absolute left-[10%] right-[10%] top-[0.3rem] h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="grid grid-cols-4 gap-6">
              {[
                ["Liquid Retina", "1B colors"],
                ["Spatial Audio", "wide field"],
                ["Camera", "1080p"],
                ["Mics", "beamforming"],
              ].map(([label, value], index) => (
                <div key={label} className="relative flex flex-col items-center text-center">
                  <span className={`relative z-10 h-2.5 w-2.5 rounded-full ${colorNodes[index]}`} />
                  <span className="eyebrow-premium mt-5 text-white/45">{label}</span>
                  <span className="stat-premium mt-1 text-xs text-cyan-100/65">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: storyOpacity, x: storyX }}
          className="absolute bottom-0 right-0 top-0 z-20 hidden w-[48%] overflow-hidden px-8 lg:block"
        >
          <motion.div style={{ y: storyY }} className="mx-auto max-w-xl pt-[22vh]">
            <div className="mb-24 max-w-xl">
            <div className="eyebrow-premium mb-6 flex items-center gap-4 text-[10px] font-medium uppercase text-cyan-100/70">
              <span className="h-px w-12 bg-cyan-100/50" />
              Immersive by default
            </div>
            <h2 className="text-premium text-5xl font-semibold leading-[0.94] tracking-normal sm:text-6xl md:text-7xl">
              The screen pulls you in. The sound wraps around.
            </h2>
            <div className="eyebrow-premium mt-8 flex w-fit items-center gap-3 border-y border-white/10 py-3 text-[10px] font-medium uppercase text-white/45">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(165,243,252,0.75)]" />
              Scroll the story
            </div>
          </div>

            <div className="space-y-[28vh] pb-[60vh]">
            {storyBeats.map((beat) => (
              <motion.article
                key={beat.title}
                className="group relative max-w-xl border-t border-white/15 pt-8"
              >
                <div className="absolute -left-5 top-8 h-2 w-2 rounded-full bg-cyan-100 opacity-0 shadow-[0_0_22px_rgba(165,243,252,0.9)] transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-5 flex items-center justify-between gap-6">
                  <span className="eyebrow-premium text-[10px] font-medium uppercase text-cyan-100/65">{beat.kicker}</span>
              <span className="stat-premium bg-gradient-to-b from-white to-white/45 bg-clip-text text-2xl font-semibold text-transparent">{beat.stat}</span>
                </div>
                <h3 className="font-display text-3xl font-medium leading-tight tracking-normal text-white sm:text-4xl">
                  {beat.title}
                </h3>
                <p className="copy-premium mt-5 text-base font-light text-neutral-300 sm:text-lg">
                  {beat.body}
                </p>
              </motion.article>
            ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: storyOpacity }}
          className="absolute bottom-10 left-5 right-5 z-20 lg:hidden"
        >
          <div className="border-t border-white/15 pt-6">
            <div className="eyebrow-premium mb-3 text-cyan-100/70">Immersive by default</div>
            <h2 className="title-premium text-premium text-4xl">The screen pulls you in.</h2>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
