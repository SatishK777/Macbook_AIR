const models = [
  {
    name: "MacBook Air 13",
    chip: "M5",
    price: "$1,099",
    monthly: "$92/mo",
    detail: "The everyday sweet spot for study, writing, design, and fast creative work.",
    badge: "Most portable",
    specs: ["13.6-inch Liquid Retina", "512GB starting storage", "Wi-Fi 7 and Bluetooth 6", "Up to 18 hours battery"],
    accent: "from-cyan-200 to-blue-300",
    featured: false,
  },
  {
    name: "MacBook Air 15",
    chip: "M5",
    price: "$1,299",
    monthly: "$108/mo",
    detail: "More room for timelines, canvases, code, and side-by-side workflows.",
    badge: "Best balance",
    specs: ["15.3-inch Liquid Retina", "512GB starting storage", "Six-speaker sound system", "More room to multitask"],
    accent: "from-fuchsia-200 to-cyan-200",
    featured: true,
  },
  {
    name: "MacBook Air Pro Setup",
    chip: "M5",
    price: "$1,499",
    monthly: "$125/mo",
    detail: "Configured for heavier creative projects, multitasking, and long-term headroom.",
    badge: "Creator ready",
    specs: ["More unified memory", "1TB SSD storage", "Dual display support", "Fast charging ready"],
    accent: "from-emerald-200 to-cyan-100",
    featured: false,
  },
];

const storageOptions = ["512GB", "1TB", "2TB", "4TB"];
const finishes = ["Sky Blue", "Midnight", "Starlight", "Silver"];

function PricingCard({ model }: { model: (typeof models)[number] }) {
  return (
    <article
      className={`group relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.6rem] border p-5 transition duration-500 hover:-translate-y-2 ${
        model.featured
          ? "border-cyan-100/35 bg-white/[0.075] shadow-[0_34px_120px_rgba(103,232,249,0.18)]"
          : "border-white/12 bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.38)]"
      } backdrop-blur-2xl`}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${model.accent}`} />
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-200/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="eyebrow-premium text-cyan-100/60">{model.badge}</div>
          <h3 className="font-display mt-4 text-3xl font-semibold leading-tight text-white">{model.name}</h3>
        </div>
        <div className={`rounded-full border border-white/10 bg-gradient-to-r ${model.accent} px-3 py-1.5`}>
          <span className="stat-premium text-xs font-semibold text-black/80">{model.chip}</span>
        </div>
      </div>

      <p className="copy-premium relative mt-5 text-sm font-light text-neutral-300">{model.detail}</p>

      <div className="relative mt-8 border-y border-white/10 py-6">
        <div className="stat-premium text-5xl font-semibold text-white">{model.price}</div>
        <div className="mt-2 text-sm text-cyan-100/60">or from {model.monthly} with monthly financing</div>
      </div>

      <ul className="relative mt-7 space-y-4">
        {model.specs.map((spec) => (
          <li key={spec} className="flex items-center gap-3 text-sm text-neutral-300">
            <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${model.accent} shadow-[0_0_18px_rgba(165,243,252,0.5)]`} />
            {spec}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <a
          href="#"
          className={`group/button flex h-12 items-center justify-center rounded-full bg-gradient-to-r ${model.accent} px-5 text-sm font-semibold text-black shadow-[0_16px_42px_rgba(103,232,249,0.18)] transition duration-300 hover:scale-[1.02]`}
        >
          Buy {model.name}
          <span className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

export default function PricingCTA() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-28 text-white sm:px-8 sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(34,211,238,0.15),transparent_27%),radial-gradient(circle_at_78%_18%,rgba(244,114,182,0.12),transparent_24%),radial-gradient(circle_at_50%_86%,rgba(167,243,208,0.1),transparent_26%),linear-gradient(180deg,#010101_0%,#06100f_42%,#000_100%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:86px_86px] [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_74%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="eyebrow-premium mb-5 text-cyan-100/70">Choose your Air</div>
          <h2 className="title-premium text-premium text-5xl sm:text-6xl md:text-7xl">
            Find Your Perfect MacBook Air
          </h2>
          <p className="copy-premium mx-auto mt-7 max-w-2xl text-base font-light text-neutral-300 sm:text-lg">
            Pick the screen size, storage, and monthly plan that fits your work. Thin, silent, powerful, and ready to become the machine you reach for first.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <div className="eyebrow-premium mb-4 text-white/45">Storage options</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {storageOptions.map((option, index) => (
                <div
                  key={option}
                  className={`rounded-full border px-4 py-3 text-center stat-premium text-sm ${
                    index === 1
                      ? "border-cyan-100/45 bg-cyan-100/12 text-cyan-50"
                      : "border-white/10 bg-black/20 text-white/55"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden h-px w-20 bg-gradient-to-r from-transparent via-cyan-100/40 to-transparent lg:block" />

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
            <div className="eyebrow-premium mb-4 text-white/45">Finishes</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {finishes.map((finish, index) => (
                <div key={finish} className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3">
                  <span
                    className={`h-4 w-4 rounded-full border border-white/20 ${
                      index === 0
                        ? "bg-[#b7d7e8]"
                        : index === 1
                          ? "bg-[#1f2937]"
                          : index === 2
                            ? "bg-[#f4ead7]"
                            : "bg-[#dfe3e7]"
                    }`}
                  />
                  <span className="stat-premium text-sm text-white/60">{finish}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {models.map((model) => (
            <PricingCard key={model.name} model={model} />
          ))}
        </div>

        <div className="sticky bottom-5 z-30 mx-auto mt-12 max-w-4xl">
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/12 bg-black/55 p-2 shadow-[0_22px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:rounded-full">
            <div className="px-5 py-2">
              <div className="stat-premium text-sm font-semibold text-white">MacBook Air with M5 starts at $1,099</div>
              <div className="mt-1 text-xs text-white/45">Education pricing starts at $999. Monthly financing may be available.</div>
            </div>
            <a
              href="#"
              className="flex h-12 shrink-0 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition duration-300 hover:scale-[1.03] hover:bg-cyan-100"
            >
              Buy MacBook Air
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
