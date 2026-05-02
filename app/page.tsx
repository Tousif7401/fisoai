"use client";

import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

const heroBenefits = [
  "AI-Driven Insights",
  "Future-Proof Design",
  "Fluid & Scalable",
];

const trustLogos = [
  { name: "Monolith™", style: "text-[rgba(24,30,37,.22)]" },
  { name: "terra-tory™", style: "font-medium" },
  { name: "FRANCO®", style: "font-black" },
  { name: "Superior\nSpace®", style: "font-serif leading-[0.86]" },
  { name: "● Strobe™", style: "font-bold" },
  { name: "✧ Sophia", style: "font-serif font-medium" },
];

const authorBenefits = [
  "Easy Customization",
  "Responsive Ready",
  "Future-Proof Design",
];

const features = [
  {
    title: "Strategy That Learns",
    description:
      "Turn scattered customer signals into focused growth decisions with AI-assisted discovery, planning, and prioritization.",
  },
  {
    title: "Automation Without Friction",
    description:
      "Streamline routine handoffs, follow-ups, and internal workflows so teams can spend more time on the work that moves revenue.",
  },
  {
    title: "Design Systems With Momentum",
    description:
      "Launch polished digital touchpoints with reusable patterns, crisp content, and interfaces that stay coherent as you scale.",
  },
  {
    title: "Built To Iterate",
    description:
      "Ship small improvements fast, measure what matters, and keep the experience aligned with changing user behavior.",
  },
];

const valueCards = [
  "Rapid AI readiness audits",
  "Brand-aligned product experiences",
  "Conversion-focused landing systems",
  "Clean analytics and reporting loops",
];

const stories = [
  {
    quote:
      "Fiso AI helped us move from scattered ideas to a launch-ready system in weeks, not months.",
    name: "Anika Rao",
    role: "Founder, Northstar Labs",
  },
  {
    quote:
      "The experience feels sharp, strategic, and surprisingly easy for our team to keep improving.",
    name: "Mateo Silva",
    role: "Growth Lead, Orbit Studio",
  },
  {
    quote:
      "We finally have an AI workflow that supports the brand instead of making everything feel generic.",
    name: "Leah Morgan",
    role: "COO, Terra & Co.",
  },
];

const plans = [
  {
    name: "Launch",
    price: "$2.5k",
    description: "For teams that need a premium AI-ready landing system.",
    items: ["Hero and core page build", "Copy refinement", "Responsive QA"],
  },
  {
    name: "Scale",
    price: "$6k",
    description: "For brands ready to connect content, automation, and analytics.",
    items: ["Full conversion site", "Workflow mapping", "Measurement setup"],
  },
  {
    name: "Partner",
    price: "Custom",
    description: "For ongoing product, growth, and AI implementation support.",
    items: ["Monthly roadmap", "AI operations", "Experiment cadence"],
  },
];

const faqs = [
  {
    question: "Can Fiso AI adapt this site to my brand?",
    answer:
      "Yes. The structure is built to keep the premium visual language while changing the messaging, colors, CTAs, and proof points around your market.",
  },
  {
    question: "Do I need an existing AI strategy?",
    answer:
      "No. Fiso AI can start with a readiness audit, identify useful workflows, and turn the strongest opportunities into practical launch steps.",
  },
  {
    question: "Will the page be responsive?",
    answer:
      "Yes. The layout is planned for mobile, tablet, desktop, and wide desktop with stable video framing, readable text, and compact navigation.",
  },
  {
    question: "Can the site connect to automations later?",
    answer:
      "Yes. This version keeps the route static and clean, but the sections and CTAs are ready to connect to forms, CRM workflows, and analytics.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 8h9M8.5 3.5 13 8l-4.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m12 2 2.1 6.1L20 10l-5.9 1.9L12 18l-2.1-6.1L4 10l5.9-1.9L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MetricIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 16.5 10 11l3.5 3.5L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5 5v14h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M5 8h14M5 16h14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex rounded-full border px-4 py-2 text-xs font-bold uppercase ${
        light
          ? "border-white/20 text-white"
          : "border-[rgba(24,30,37,.16)] text-[var(--dark)]"
      }`}
    >
      {children}
    </p>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="flex h-9 items-center justify-center bg-[var(--lime)] px-4 text-center text-[13px] font-extrabold uppercase text-[var(--dark)]">
        Start growing with Fiso AI today!
        <a className="ml-3 underline underline-offset-4" href="#contact">
          Get started
        </a>
      </div>

      <nav className="mx-auto mt-4 flex h-20 w-[calc(100%-32px)] max-w-[1820px] items-center rounded-[8px] bg-white/16 px-5 text-white backdrop-blur-xl md:w-[calc(100%-80px)] md:px-8">
        <div className="flex w-full items-center justify-between gap-5">
          <a className="text-[28px] font-extrabold leading-none" href="#top">
            Fiso AI
          </a>

          <div className="hidden items-center gap-8 text-xl font-extrabold lg:flex">
            <a className="inline-flex items-center gap-1" href="#about">
              Menu
              <span aria-hidden="true">v</span>
            </a>
            {navItems.map((item) => (
              <a className="transition hover:text-[var(--lime)]" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <a
            className="hidden h-[52px] items-center gap-2 rounded-full bg-[var(--lime)] px-6 text-xl font-extrabold text-[var(--dark)] transition hover:bg-white md:inline-flex"
            href="#contact"
          >
            Get Started
          </a>

          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="grid h-11 w-11 place-items-center rounded-[8px] bg-white/16 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <MenuIcon open={open} />
          </button>
        </div>

        {open ? (
          <div className="mt-4 overflow-hidden rounded-[8px] bg-white text-[var(--dark)] shadow-2xl lg:hidden">
            <div className="grid gap-3 bg-[#efeee6] p-4 sm:grid-cols-[1fr_120px]">
              <p className="text-lg font-semibold">AI systems for sharper brands</p>
              <a className="font-bold underline underline-offset-4" href="#contact">
                Get Started
              </a>
            </div>
            <div className="divide-y divide-[rgba(24,30,37,.08)]">
              {navItems.map((item) => (
                <a
                  className="flex items-center justify-between px-5 py-4 font-semibold"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-[var(--hero-blue)] p-0 text-white"
      id="top"
    >
      <video
        aria-hidden="true"
        autoPlay
        className="hero-video absolute inset-0 h-full w-full"
        loop
        muted
        playsInline
        preload="auto"
        src="/video/xwyNvkWHh63ubQ8audTdLJ0lprE.mp4"
      />
      <div className="absolute inset-0 bg-[rgba(18,26,41,.38)]" />

      <Header />

      <div className="absolute inset-0 z-10 flex w-full flex-col justify-between px-5 pb-8 pt-[160px] md:px-10 md:pb-10 min-[1200px]:pt-[176px]">
        <div className="max-w-[636px]">
          <SectionLabel light>AI Growth Studio</SectionLabel>
          <h1 className="mt-6 max-w-[680px] text-[40px] font-medium leading-[.98] md:text-[52px] min-[1200px]:mt-8 min-[1200px]:text-[78px] xl:text-[84px]">
            Your ally in efficient
            <span className="block text-white/64">& intelligent growth.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-lg font-semibold leading-[1.45] text-white min-[1200px]:mt-7 min-[1200px]:text-[20px]">
            Discover a sharper standard for AI strategy, automation, and design
            where intelligence and creativity move your brand forward.
          </p>
          <div className="mt-7 flex flex-col gap-4 text-xl font-extrabold min-[1200px]:mt-8 sm:flex-row sm:items-center">
            <a
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--lime)] px-6 text-[var(--dark)] transition hover:bg-white"
              href="#contact"
            >
              Get Started
              <ArrowIcon />
            </a>
            <a
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-2 text-[var(--lime)] transition hover:text-white"
              href="#about"
            >
              Explore benefits
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px] lg:items-end">
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-xl font-extrabold text-white/80">
            {heroBenefits.map((benefit, index) => (
              <div className="inline-flex items-center gap-3" key={benefit}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/24 text-[var(--lime)]">
                  {index === 0 ? <MetricIcon /> : <SparkIcon />}
                </span>
                {benefit}
              </div>
            ))}
          </div>

          <aside className="hidden rounded-[8px] bg-white/18 p-6 text-white backdrop-blur-lg lg:block">
            <div className="mb-7 flex gap-2 text-[var(--lime)]" aria-label="Five star review">
              {Array.from({ length: 5 }).map((_, index) => (
                <SparkIcon key={index} />
              ))}
            </div>
            <p className="text-xl font-extrabold leading-snug">
              With Fiso AI, we finally turned AI into a practical growth engine.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--lime)] font-black text-[var(--dark)]">
                AR
              </div>
              <div>
                <p className="font-bold">Aarav Raman</p>
                <p className="text-sm font-semibold text-white/64">Founder at Signal Forge</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[rgba(24,30,37,.16)] bg-[#f8f7f5] px-5 py-8 text-[var(--dark)] md:px-10">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-8 md:flex-row md:items-center">
        <div className="border-l border-[rgba(24,30,37,.16)] pl-6 md:w-[260px]">
          <p className="text-[22px] font-medium leading-[1.35]">
            Trusted by 150+
            <span className="block">top brands worldwide.</span>
          </p>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-14 gap-y-6 overflow-hidden text-[30px] leading-none">
          {trustLogos.map((logo) => (
            <p className={`whitespace-pre-line ${logo.style}`} key={logo.name}>
              {logo.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="bg-[#f8f7f5] px-5 py-28 text-[var(--dark)] md:px-10 md:py-40" id="about">
      <div className="mx-auto flex max-w-[848px] flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-8">
          <SectionLabel>From the author</SectionLabel>
          <h2 className="text-[44px] font-medium leading-[1] md:text-[56px] xl:text-[64px]">
            Everything here is a launchpad for your brand - from intelligent
            workflows to bold digital experiences. Shape it, scale it, make it
            your own.
          </h2>
        </div>
        <div className="grid w-full max-w-[560px] gap-8 sm:grid-cols-3">
          {authorBenefits.map((benefit, index) => (
            <div className="flex flex-col items-center gap-5" key={benefit}>
              <span className="text-[rgba(24,30,37,.32)]">
                {index === 1 ? <MetricIcon /> : <SparkIcon />}
              </span>
              <p className="text-lg font-medium leading-tight">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBento() {
  return (
    <section className="bg-white px-5 py-24 text-[var(--dark)] md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Features</SectionLabel>
            <h2 className="mt-6 max-w-[780px] text-5xl font-bold leading-[1.02] md:text-7xl">
              Make your brand impossible to ignore.
            </h2>
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--dark)] px-6 py-4 text-lg font-bold text-white transition hover:bg-[var(--lime)] hover:text-[var(--dark)]"
            href="#pricing"
          >
            View plans
            <ArrowIcon />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              className={`min-h-[320px] rounded-[8px] p-7 ${
                index === 0
                  ? "bg-[var(--dark)] text-white md:col-span-2"
                  : "bg-[#eef1f5] text-[var(--dark)]"
              }`}
              key={feature.title}
            >
              <div
                className={`mb-16 grid h-12 w-12 place-items-center rounded-full ${
                  index === 0 ? "bg-[var(--lime)] text-[var(--dark)]" : "bg-white"
                }`}
              >
                {index % 2 === 0 ? <MetricIcon /> : <SparkIcon />}
              </div>
              <h3 className="text-3xl font-bold leading-tight">{feature.title}</h3>
              <p
                className={`mt-4 text-lg font-semibold leading-[1.5] ${
                  index === 0 ? "text-white/64" : "text-[rgba(24,30,37,.64)]"
                }`}
              >
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureSection() {
  return (
    <section className="bg-[var(--dark)] px-5 py-24 text-white md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <SectionLabel light>Designed for the future</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
            Build AI momentum without losing your brand edge.
          </h2>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-[1.5] text-white/64">
            Level up your presence with a system that keeps the message clear,
            the experience polished, and the operational layer ready for
            automation.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {valueCards.map((card, index) => (
            <div
              className="rounded-[8px] border border-white/10 bg-white/10 p-6 backdrop-blur"
              key={card}
            >
              <p className="mb-12 text-sm font-black text-[var(--lime)]">
                0{index + 1}
              </p>
              <p className="text-2xl font-bold leading-tight">{card}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#eef1f5] px-5 py-24 text-[var(--dark)] md:px-10" id="stories">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Stories</SectionLabel>
            <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] md:text-7xl">
              Why founders trust Fiso AI.
            </h2>
          </div>
          <p className="max-w-md text-xl font-semibold leading-[1.45] text-[rgba(24,30,37,.64)]">
            Real-world systems for teams that need clarity, speed, and a brand
            experience that feels ahead of the curve.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <article className="rounded-[8px] bg-white p-7" key={story.name}>
              <div className="mb-12 flex gap-2 text-[var(--lime)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SparkIcon key={index} />
                ))}
              </div>
              <p className="text-2xl font-bold leading-snug">{story.quote}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--dark)] text-sm font-black text-white">
                  {story.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold">{story.name}</p>
                  <p className="text-sm font-semibold text-[rgba(24,30,37,.56)]">
                    {story.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="bg-white px-5 py-24 text-[var(--dark)] md:px-10" id="pricing">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] md:text-7xl">
            Start lean, then scale the system.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              className={`rounded-[8px] p-7 ${
                index === 1
                  ? "bg-[var(--dark)] text-white"
                  : "border border-[rgba(24,30,37,.1)] bg-[#f4f5f1]"
              }`}
              key={plan.name}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-bold">{plan.name}</h3>
                  <p
                    className={`mt-3 font-semibold leading-[1.45] ${
                      index === 1 ? "text-white/64" : "text-[rgba(24,30,37,.64)]"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
                <p className="text-2xl font-black text-[var(--lime)]">{plan.price}</p>
              </div>
              <ul className="mt-12 space-y-4 font-bold">
                {plan.items.map((item) => (
                  <li className="flex items-center gap-3" key={item}>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--lime)] text-[var(--dark)]">
                      <SparkIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-lg font-bold transition ${
                  index === 1
                    ? "bg-[var(--lime)] text-[var(--dark)] hover:bg-white"
                    : "bg-[var(--dark)] text-white hover:bg-[var(--lime)] hover:text-[var(--dark)]"
                }`}
                href="#contact"
              >
                Choose {plan.name}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#eff0e8] px-5 py-24 text-[var(--dark)] md:px-10" id="faq">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-6 text-5xl font-bold leading-[1.02] md:text-7xl">
            Common questions
          </h2>
        </div>
        <div className="divide-y divide-[rgba(24,30,37,.12)] rounded-[8px] bg-white">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-6 py-6 text-left text-xl font-bold"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  type="button"
                >
                  {faq.question}
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eef1f5] transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <p className="px-6 pb-6 text-lg font-semibold leading-[1.5] text-[rgba(24,30,37,.64)]">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--dark)] px-5 py-16 text-white md:px-10" id="contact">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-white/16 pb-12 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="text-4xl font-bold">Fiso AI</p>
            <h2 className="mt-8 max-w-3xl text-5xl font-bold leading-[1.02] md:text-7xl">
              Ready to build a smarter brand system?
            </h2>
          </div>
          <form className="rounded-[8px] bg-white/10 p-5 backdrop-blur">
            <label className="text-sm font-bold uppercase" htmlFor="email">
              Work email
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                className="min-h-14 flex-1 rounded-full border border-white/16 bg-white px-5 font-semibold text-[var(--dark)] outline-none"
                id="email"
                placeholder="you@company.com"
                type="email"
              />
              <button
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[var(--lime)] px-6 font-bold text-[var(--dark)] transition hover:bg-white"
                type="button"
              >
                Contact Us
                <ArrowIcon />
              </button>
            </div>
            <p className="mt-4 text-sm font-semibold text-white/64">
              This demo form is ready to connect to your preferred workflow.
            </p>
          </form>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-wrap gap-5 text-lg font-semibold text-white/64">
            {navItems.map((item) => (
              <a className="hover:text-[var(--lime)]" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <p className="text-sm font-semibold text-white/64">
            (c) Fiso AI 2026, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <TrustStrip />
      <IntroSection />
      <FeatureBento />
      <FutureSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
