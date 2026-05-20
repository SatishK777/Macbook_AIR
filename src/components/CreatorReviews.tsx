"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "CS Student",
    quote:
      "I can jump from lecture notes to Xcode to a 30-tab research session and the Air still feels calm. It is the laptop I actually want in my bag every day.",
    tag: "Student reviews",
    accent: "from-cyan-200 to-blue-300",
  },
  {
    name: "Maya Chen",
    role: "Product Designer",
    quote:
      "The screen, silence, and battery change the whole rhythm. I can present, polish in Figma, and review prototypes without hunting for power.",
    tag: "Designer experience",
    accent: "from-fuchsia-200 to-cyan-200",
  },
  {
    name: "Jon Bell",
    role: "Frontend Developer",
    quote:
      "It handles my dev server, editor, docs, and design tools without feeling dramatic. Fast is great, but quiet fast is addictive.",
    tag: "Developer feedback",
    accent: "from-emerald-200 to-cyan-100",
  },
  {
    name: "Nia Kapoor",
    role: "Video Creator",
    quote:
      "I edit shorts on location, review footage, write captions, and upload before leaving the shoot. The workflow feels unbelievably light.",
    tag: "Creator workflow",
    accent: "from-amber-100 to-rose-200",
  },
  {
    name: "Elena Rossi",
    role: "Architecture Student",
    quote:
      "It is thin enough for studio days and strong enough for the messy mix of references, models, PDFs, and late-night presentation fixes.",
    tag: "Studio ready",
    accent: "from-violet-200 to-cyan-200",
  },
  {
    name: "Sam Rivera",
    role: "Indie Maker",
    quote:
      "The best part is how invisible it becomes. I open it, build, test, write, ship, and never feel like the machine is asking for attention.",
    tag: "Professional flow",
    accent: "from-lime-200 to-emerald-200",
  },
];

const stats = [
  ["4.9/5", "creator sentiment"],
  ["18 hrs", "all-day work"],
  ["0dB", "silent focus"],
  ["2.7 lb", "carry anywhere"],
];

function Avatar({ name, accent, index }: { name: string; accent: string; index: number }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="relative h-11 w-11 shrink-0 rounded-full border border-white/15 bg-black p-[2px] shadow-[0_0_32px_rgba(103,232,249,0.12)]">
      <div className={`grid h-full w-full place-items-center rounded-full bg-gradient-to-br ${accent}`}>
        <span className="stat-premium text-sm font-semibold text-black/80">{initials}</span>
      </div>
      <span
        className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border border-black ${
          index % 3 === 0 ? "bg-cyan-200" : index % 3 === 1 ? "bg-fuchsia-200" : "bg-emerald-200"
        }`}
      />
    </div>
  );
}

function ReviewCard({
  review,
  index,
  compact = false,
}: {
  review: (typeof testimonials)[number];
  index: number;
  compact?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.4rem] border border-white/12 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.36)] backdrop-blur-2xl ${
        compact ? "w-[19rem]" : "w-[23rem]"
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${review.accent} opacity-70`} />
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-200/10 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />
      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={review.name} accent={review.accent} index={index} />
          <div>
            <div className="stat-premium text-sm font-semibold text-white">{review.name}</div>
            <div className="mt-1 text-xs text-white/45">{review.role}</div>
          </div>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((star) => (
            <span key={star} className="h-1.5 w-1.5 rounded-full bg-cyan-100/70 shadow-[0_0_14px_rgba(165,243,252,0.45)]" />
          ))}
        </div>
      </div>
      <p className="copy-premium relative mt-7 text-base font-light text-neutral-200">
        {review.quote}
      </p>
      <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="eyebrow-premium text-[9px] text-cyan-100/55">{review.tag}</span>
        <span className="stat-premium text-xs text-white/35">0{index + 1}</span>
      </div>
    </article>
  );
}

function ReviewMarquee({ reverse = false }: { reverse?: boolean }) {
  const items = reverse ? [...testimonials].reverse() : testimonials;

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex min-w-max gap-5 pr-5"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((review, index) => (
          <ReviewCard
            key={`${review.name}-${index}`}
            review={review}
            index={index % testimonials.length}
            compact
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function CreatorReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const titleY = useTransform(scrollYProgress, [0.04, 0.24], [70, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.04, 0.16, 0.76], [0, 1, 1]);
  const heroScale = useTransform(scrollYProgress, [0.08, 0.44, 0.86], [0.92, 1.04, 0.98]);
  const haloRotate = useTransform(scrollYProgress, [0, 1], [-10, 36]);
  const cardsY = useTransform(scrollYProgress, [0.1, 0.58], [90, 0]);
  const cardsOpacity = useTransform(scrollYProgress, [0.12, 0.26], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-28 text-white sm:py-36">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(244,114,182,0.13),transparent_27%),radial-gradient(circle_at_82%_32%,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_52%_86%,rgba(167,243,208,0.1),transparent_24%),linear-gradient(180deg,#020202_0%,#06100f_48%,#010101_100%)]"
      />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:86px_86px] [mask-image:radial-gradient(circle_at_50%_42%,black,transparent_72%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="eyebrow-premium mb-5 text-cyan-100/70">Creator Reviews</div>
          <h2 className="title-premium text-premium text-5xl sm:text-6xl md:text-7xl">
            Loved by Students, Creators & Professionals
          </h2>
          <p className="copy-premium mx-auto mt-7 max-w-2xl text-base font-light text-neutral-300 sm:text-lg">
            Real workflows, one quiet machine: study sessions, design sprints, code pushes, content shoots, and all the tiny handoffs between them.
          </p>
        </motion.div>

        <motion.div
          style={{ scale: heroScale }}
          className="relative mx-auto mt-16 min-h-[32rem] max-w-6xl sm:mt-20"
        >
          <motion.div
            style={{ rotate: haloRotate }}
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[40rem] sm:w-[40rem]"
          >
            <div className="absolute inset-10 rounded-full border border-dashed border-cyan-100/14" />
            <div className="absolute inset-24 rounded-full border border-white/[0.07]" />
            <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_28px_rgba(165,243,252,0.8)]" />
            <div className="absolute bottom-16 right-12 h-2 w-2 rounded-full bg-fuchsia-100 shadow-[0_0_26px_rgba(251,207,232,0.78)]" />
          </motion.div>

          <div className="absolute left-1/2 top-[46%] z-20 w-[min(82vw,30rem)] -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/12 bg-black/55 p-5 shadow-[0_34px_110px_rgba(0,0,0,0.72),0_0_84px_rgba(103,232,249,0.12)] backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/65 to-transparent" />
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-200/12 blur-3xl" />
              <div className="relative flex items-center justify-between gap-5">
                <div>
                  <div className="eyebrow-premium text-cyan-100/60">Verified workflows</div>
                  <div className="stat-premium mt-3 text-5xl font-semibold text-white sm:text-6xl">4.9</div>
                </div>
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 5).map((review, index) => (
                    <Avatar key={review.name} name={review.name} accent={review.accent} index={index} />
                  ))}
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(([value, label]) => (
                  <div key={label} className="border-t border-white/10 pt-4">
                    <div className="stat-premium text-xl font-semibold text-white">{value}</div>
                    <div className="mt-1 text-xs text-white/42">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div style={{ y: cardsY, opacity: cardsOpacity }} className="relative z-10 space-y-5 pt-12">
            <ReviewMarquee />
            <ReviewMarquee reverse />
          </motion.div>
        </motion.div>

        <div className="relative mt-20 grid gap-5 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-18%" }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ReviewCard review={review} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
