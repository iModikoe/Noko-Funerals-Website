import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Button, Container, SectionHeading, Rule } from "@/components/ui";
import { ContactActions } from "@/components/ContactActions";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import HeroVideo from "@/components/HeroVideo";
import ServicesIndex from "@/components/ServicesIndex";
import SplitText from "@/components/motion/SplitText";
import Parallax from "@/components/motion/Parallax";
import CountUp from "@/components/motion/CountUp";
import Marquee from "@/components/motion/Marquee";

import { ArrowIcon, CheckIcon, DoveMark } from "@/components/icons";
import {
  about,
  business,
  membershipHighlights,
  packages,
  packagesSmallPrint,
  regions,
  services,
} from "@/content/site";

export const metadata: Metadata = {
  title: `${business.name} — ${business.tagline}`,
  description:
    "Thoughtful funeral arrangements and compassionate guidance when you need it most. Noko Funerals supports families across North West, Limpopo and Gauteng.",
};

export default function HomePage() {
  const overviewServices = services.slice(0, 5);
  const branchNames = regions.flatMap((r) => r.branches);
  const branchCount = branchNames.length;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="on-ink grain relative isolate overflow-hidden bg-ink-950 text-ivory-100">
        {/* ── The photograph fills the whole section ──────────────────────
            Full bleed, edge to edge, with the words laid over it. The
            gradients below are what make that readable: a heavy wash from the
            left where the type sits, easing off to the right so the fleet
            stays visible. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src="/photos/hero-fleet.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_34%]"
          />

          {/* Vertical wash — carries the header and the section below */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/40 to-ink-950/90" />

          {/* Horizontal wash — only does real work once the layout splits */}
          <div className="absolute inset-0 bg-ink-950/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/60 lg:to-transparent" />
        </div>

        {/* Warm bloom, breathing very slowly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-20 h-[40rem] w-[40rem] rounded-full bg-gold-500/[0.07] blur-[110px]"
          style={{ animation: "noko-breathe 14s ease-in-out infinite" }}
        />

        <Container wide className="relative">
          <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 lg:py-16 xl:py-20">
            {/* ── Words ─────────────────────────────────────────────────── */}
            <div className="lg:col-span-6 lg:row-start-1 lg:self-end">
              <div
                className="flex items-center gap-3"
                style={{ animation: "noko-fade 1s ease 200ms both" }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-8 origin-left bg-gold-400/70"
                  style={{ animation: "noko-draw 1.1s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
                />
                <p className="eyebrow">{business.tagline}</p>
              </div>

              <h1 className="mt-6 text-[2.5rem] leading-[1.08] sm:text-[3.25rem] lg:text-[3.6rem] xl:text-[4rem]">
                <SplitText text="Honouring every life." immediate delay={250} />{" "}
                <SplitText
                  text="Supporting every family."
                  as="span"
                  className="mt-1 block text-gold-300"
                  immediate
                  delay={600}
                />
              </h1>

              <p
                className="mt-7 max-w-lg text-lg leading-relaxed text-ivory-200/85"
                style={{ animation: "noko-rise 1s cubic-bezier(0.16,1,0.3,1) 1100ms both" }}
              >
                Thoughtful funeral arrangements and compassionate guidance when
                you need it most.
              </p>

              <div
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                style={{ animation: "noko-rise 1s cubic-bezier(0.16,1,0.3,1) 1300ms both" }}
              >
                <Button href="/contact" variant="gold" withArrow>
                  Request Assistance
                </Button>
                <Button href="/services" variant="onInk">
                  Explore Our Services
                </Button>
              </div>

            </div>

            {/* ── Phone and WhatsApp ─────────────────────────────────────────
                Sits under the words on a wide screen. On a phone it drops
                below the clip, so the headline, the two actions and something
                moving all land inside the first screenful. */}
            <div
              className="order-3 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start"
              style={{ animation: "noko-rise 1s cubic-bezier(0.16,1,0.3,1) 1500ms both" }}
            >
              <p className="eyebrow mb-4">Speak to someone now</p>
              <ContactActions tone="dark" />
            </div>

            {/* ── The procession, moving ────────────────────────────────── */}
            <div
              className="order-2 lg:order-none lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
              style={{ animation: "noko-fade 1.4s ease 500ms both" }}
            >
              {/* The clip sits straight on the photograph, no panel around it. */}
              <div className="relative mx-auto flex w-full max-w-[23rem] flex-col items-center sm:max-w-[26rem] lg:mr-0 lg:max-w-none lg:items-end">
                <Parallax
                  strength={-20}
                  /* The clip is 436px wide natively, so it is capped at 25rem
                     (400px) — past that it would be upscaled and go soft. */
                  className="w-[88%] max-w-[20rem] drop-shadow-2xl sm:w-[74%] sm:max-w-[22rem] lg:w-full lg:max-w-[25rem]"
                >
                  <HeroVideo />
                </Parallax>

                {/* The caption sits directly on the photograph, so it carries
                    its own backing — the sunlit parts of the image are far too
                    bright for plain text to stay legible. */}
                <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-ink-950/75 px-3.5 py-1.5 text-[0.8125rem] text-ivory-200 backdrop-blur-sm">
                  <span
                    aria-hidden="true"
                    className="inline-block h-px w-5 shrink-0 bg-gold-400"
                  />
                  A Noko Funerals send-off.
                </p>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            aria-hidden="true"
            data-no-print
            className="pointer-events-none hidden justify-center pb-10 lg:flex"
            style={{ animation: "noko-fade 1.2s ease 2s both" }}
          >
            <span className="relative block h-12 w-px overflow-hidden bg-ivory-100/12">
              <span
                className="absolute inset-x-0 top-0 block h-5 bg-gradient-to-b from-transparent via-gold-400 to-transparent"
                style={{ animation: "noko-cue 2.6s ease-in-out infinite" }}
              />
            </span>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHERE WE WORK — real figures only, counted up on scroll
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="on-ink grain relative overflow-hidden border-t border-ink-700/60 bg-ink-900 py-14 text-ivory-100">
        <Container wide className="relative">
          <dl className="grid gap-y-10 sm:grid-cols-3 sm:gap-x-10">
            {[
              { n: branchCount, label: "branches in the communities we serve" },
              { n: regions.length, label: "provinces with a number that reaches us" },
              { n: packages.length, label: "monthly packages to choose between" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 110}>
                <div className="flex items-baseline gap-4 sm:block">
                  <dt className="font-display text-4xl text-gold-300 sm:text-5xl">
                    <CountUp to={stat.n} />
                  </dt>
                  <dd className="max-w-[16rem] text-[0.9375rem] leading-snug text-ivory-200/70 sm:mt-3">
                    {stat.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={260}>
            <div className="mt-12 border-t border-ink-700/70 pt-8">
              <Marquee items={branchNames} className="text-[0.9375rem]" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTRODUCTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-100 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Who we are"
                title={
                  <>
                    A steady hand in the
                    <em className="not-italic text-gold-600"> hardest week</em> a
                    family will have.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-relaxed text-ink-700">
                {about.intro}
              </p>

              <Rule className="my-8" />

              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {about.values.slice(0, 4).map((value) => (
                  <div key={value.title}>
                    <dt className="font-display text-xl text-ink-900">
                      {value.title}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">
                      {value.body}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-2.5 text-[0.9375rem] font-medium text-ink-900 underline decoration-gold-500 decoration-1 underline-offset-[6px] transition-all hover:decoration-2"
              >
                More about Noko Funerals
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES OVERVIEW — editorial list, not a card grid
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-ink-900/10 bg-ivory-200/50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Everything a funeral asks of a family, carried by us."
              lead="From the first phone call to the last car leaving the graveside. Each of these is explained in full on our services page."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14">
              <ServicesIndex services={overviewServices} />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10">
              <Button href="/services" variant="secondary" withArrow>
                See all services
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW WE CAN HELP
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="on-ink relative overflow-hidden bg-ink-900 py-20 text-ivory-100 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/3 h-[30rem] w-[30rem] rounded-full bg-gold-500/[0.06] blur-[110px]"
        />

        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="How we can help"
              title={
                <span className="text-ivory-100">
                  Three steps, and we take it from there.
                </span>
              }
              lead={
                <span className="text-ivory-200/75">
                  You do not need to know what to ask for. Phone us and we will
                  explain what happens next.
                </span>
              }
            />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "Contact the team",
                body: "Phone or send a WhatsApp, at whatever hour you find yourself needing to. Tell us where your loved one is and we will take it from there.",
              },
              {
                n: "02",
                title: "Discuss the arrangements",
                body: "We sit down with you — in person or over the phone — and go through the service, the transport, the day itself and what it will cost.",
              },
              {
                n: "03",
                title: "Receive guidance throughout",
                body: "We handle the arrangements and keep you updated, so your family can be together instead of managing details.",
              },
            ].map((step, i) => (
              <Reveal
                key={step.n}
                as="li"
                delay={i * 110}
                className="lift border border-transparent bg-ink-900 p-7 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-3xl text-gold-400/70"
                >
                  {step.n}
                </span>
                <h3 className="mt-4 text-2xl text-ivory-100">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory-200/70">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                variant="gold"
                withArrow
              >
                Request Assistance
              </Button>
              <Button href="/contact#enquiry" variant="onInk">
                Send an enquiry
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PACKAGE PREVIEW
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-ivory-100 py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Plans & packages"
                title="Put something in place before it is needed."
                lead="A monthly package means a family is not raising money in the week they are grieving. Compare what each one covers."
              />
              <div className="shrink-0">
                <Button href="/plans" variant="secondary" withArrow>
                  Compare all packages
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 90}>
                <article
                  className={`lift flex h-full flex-col rounded-2xl border p-7 ${
                    pkg.featured
                      ? "border-gold-500/50 bg-white/80 shadow-md shadow-gold-500/5"
                      : "border-ink-900/12 bg-white/50"
                  }`}
                >
                  {/* The badge row is always present so the three cards stay
                      aligned; it is simply hidden where it does not apply. */}
                  <span
                    aria-hidden={pkg.featured ? undefined : true}
                    className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gold-700 ${
                      pkg.featured
                        ? ""
                        : "hidden md:inline-flex md:invisible"
                    }`}
                  >
                    Most cover per rand
                  </span>

                  <h3 className="font-display text-2xl text-ink-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-ink-500">
                    {pkg.covers}
                  </p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    {pkg.price ? (
                      <>
                        <span className="font-display text-4xl text-ink-900">
                          {pkg.price.amount}
                        </span>
                        <span className="text-[0.9375rem] text-ink-500">
                          {pkg.price.period}
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-2xl text-ink-900">
                        Request pricing
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5 text-[0.9375rem] text-ink-600">
                    {pkg.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <CheckIcon className="mt-1.5 shrink-0 text-[0.8rem] text-gold-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {pkg.includes.length > 4 ? (
                      <li className="pl-[1.55rem] text-ink-500">
                        and {pkg.includes.length - 4} more
                      </li>
                    ) : null}
                  </ul>

                  <div className="mt-7 pt-1">
                    <Button
                      href={`/contact?package=${pkg.slug}`}
                      variant={pkg.featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Request details
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {membershipHighlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-600"
                >
                  <CheckIcon className="text-[0.85rem] text-gold-600" />
                  {h.label}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-[0.875rem] leading-relaxed text-ink-500">
              {packagesSmallPrint}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-ink-900/10 bg-ivory-200/50 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Questions"
                title="Answers to what families ask us most."
                lead="If your question is not here, phone us and ask. We would rather explain something twice than have you guess."
              />
              <div className="mt-8">
                <Button href="/contact#enquiry" variant="secondary" withArrow>
                  Ask us something else
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-8">
              <FaqList topic="general" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CLOSING CONTACT
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="on-ink bg-ink-900 py-20 text-ivory-100 sm:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <DoveMark className="mx-auto h-6 w-16 text-gold-400" />
              <h2 className="mt-7 text-3xl sm:text-[2.75rem]">
                We are here when you are ready.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ivory-200/80">
                Whether you need help today or you are planning ahead, one phone
                call is enough to start.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mx-auto mt-10 max-w-2xl">
              <ContactActions tone="dark" />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex justify-center">
              <Button
                href="/contact"
                variant="gold"
                withArrow
              >
                Request Assistance
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
