import type { Metadata } from "next";

import { Button, Container, SectionHeading, Unconfirmed } from "@/components/ui";
import { ContactActions } from "@/components/ContactActions";
import Reveal from "@/components/Reveal";
import FaqList from "@/components/FaqList";
import SplitText from "@/components/motion/SplitText";
import { AlertIcon, CheckIcon, DoveMark } from "@/components/icons";
import {
  extraServices,
  membershipHighlights,
  packages,
  packagesSmallPrint,
  waitingPeriods,
} from "@/content/site";

export const metadata: Metadata = {
  title: "Plans & Packages",
  description:
    "Compare the Noko Funerals monthly packages — what each one covers, who it suits and what is included. Enquire about a package and we will talk it through with you.",
};

/** Every distinct benefit across all packages, for the comparison table. */
const allBenefits = Array.from(
  new Set(packages.flatMap((p) => p.includes)),
);

export default function PlansPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-16 text-ivory-100 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.07] blur-[110px]"
          style={{ animation: "noko-breathe 16s ease-in-out infinite" }}
        />
        <Container>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-8 bg-current opacity-60"
              />
              Plans &amp; packages
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.1] sm:text-[3.25rem]">
              <SplitText text="Arrange it now, so nobody has to arrange it later." immediate delay={180} />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-200/80">
              A monthly package means the cost of a funeral is settled long
              before it is needed. Compare what each one covers, then speak to
              us about which fits your family.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Package cards ────────────────────────────────────────────────── */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 90}>
                <article
                  id={pkg.slug}
                  className={`lift flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${
                    pkg.featured
                      ? "border-gold-500/55 bg-white/85 shadow-lg shadow-gold-500/8"
                      : "border-ink-900/12 bg-white/50"
                  }`}
                >
                  <span
                    aria-hidden={pkg.featured ? undefined : true}
                    className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-gold-700 ${
                      pkg.featured
                        ? ""
                        : "hidden lg:inline-flex lg:invisible"
                    }`}
                  >
                    Most cover per rand
                  </span>

                  <h2 className="font-display text-[1.75rem] text-ink-900">
                    {pkg.name}
                  </h2>
                  <p className="mt-1 text-[0.9375rem] text-ink-500">
                    {pkg.covers}
                  </p>
                  <p className="mt-2 text-[0.9375rem] italic text-ink-600">
                    {pkg.suitedTo}
                  </p>

                  <div className="mt-6 border-y border-ink-900/10 py-5">
                    {pkg.price ? (
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-[2.75rem] leading-none text-ink-900">
                          {pkg.price.amount}
                        </span>
                        <span className="text-[0.9375rem] text-ink-500">
                          {pkg.price.period}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-display text-2xl text-ink-900">
                          Request pricing
                        </span>
                        <Unconfirmed
                          label="Package details to be confirmed"
                          className="mt-2"
                        />
                      </div>
                    )}
                  </div>

                  {/* Included */}
                  <h3 className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                    Included services
                  </h3>
                  <ul className="mt-3.5 flex-1 space-y-2.5 text-[0.9375rem] text-ink-700">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <CheckIcon className="mt-1.5 shrink-0 text-[0.8rem] text-gold-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.note ? (
                    <p className="mt-6 rounded-lg bg-ivory-200/70 p-3.5 text-[0.8125rem] leading-relaxed text-ink-600">
                      {pkg.note}
                    </p>
                  ) : null}

                  <div className="mt-6">
                    <Button
                      href={`/contact?package=${pkg.slug}#enquiry`}
                      variant={pkg.featured ? "primary" : "secondary"}
                      className="w-full"
                    >
                      Enquire About This Package
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Membership highlights */}
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
              {membershipHighlights.map((h) => (
                <span
                  key={h.label}
                  className="inline-flex items-center gap-2 text-[0.9375rem] text-ink-700"
                >
                  <CheckIcon className="text-[0.85rem] text-gold-600" />
                  {h.label}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Comparison table (desktop) ───────────────────────────────────── */}
      <section className="border-y border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Side by side"
              title="What each package covers."
            />
          </Reveal>

          <Reveal delay={120}>
            {/* Desktop: a real comparison table */}
            <div className="mt-12 hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Comparison of the Noko Funerals packages, showing which
                  services each one includes.
                </caption>
                <thead>
                  <tr className="border-b border-ink-900/20">
                    <th
                      scope="col"
                      className="py-4 pr-6 align-bottom text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-500"
                    >
                      Included services
                    </th>
                    {packages.map((pkg) => (
                      <th
                        key={pkg.slug}
                        scope="col"
                        className="px-5 py-4 align-bottom"
                      >
                        <span className="block font-display text-xl font-medium text-ink-900">
                          {pkg.name}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] font-normal text-ink-500">
                          {pkg.covers}
                        </span>
                        <span className="mt-2 block font-display text-2xl text-gold-700">
                          {pkg.price
                            ? `${pkg.price.amount} ${pkg.price.period}`
                            : "Request pricing"}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allBenefits.map((benefit, i) => (
                    <tr
                      key={benefit}
                      className={`border-b border-ink-900/10 ${
                        i % 2 === 1 ? "bg-ivory-100/50" : ""
                      }`}
                    >
                      <th
                        scope="row"
                        className="py-3.5 pr-6 text-[0.9375rem] font-normal text-ink-700"
                      >
                        {benefit}
                      </th>
                      {packages.map((pkg) => {
                        const has = pkg.includes.includes(benefit);
                        return (
                          <td key={pkg.slug} className="px-5 py-3.5">
                            {has ? (
                              <>
                                <CheckIcon
                                  className="text-[1rem] text-gold-600"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">
                                  Included in {pkg.name}
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  aria-hidden="true"
                                  className="inline-block h-px w-3.5 bg-ink-400"
                                />
                                <span className="sr-only">
                                  Not included in {pkg.name}
                                </span>
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-6 pr-6" />
                    {packages.map((pkg) => (
                      <td key={pkg.slug} className="px-5 py-6 align-top">
                        <Button
                          href={`/contact?package=${pkg.slug}#enquiry`}
                          variant={pkg.featured ? "primary" : "secondary"}
                          className="w-full text-[0.875rem]"
                        >
                          Enquire
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Mobile: the same information, stacked and readable */}
            <div className="mt-10 space-y-8 md:hidden">
              {packages.map((pkg) => (
                <div
                  key={pkg.slug}
                  className="rounded-2xl border border-ink-900/12 bg-white/60 p-6"
                >
                  <h3 className="font-display text-xl text-ink-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-0.5 text-[0.875rem] text-ink-500">
                    {pkg.covers} ·{" "}
                    {pkg.price
                      ? `${pkg.price.amount} ${pkg.price.period}`
                      : "Request pricing"}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {allBenefits.map((benefit) => {
                      const has = pkg.includes.includes(benefit);
                      return (
                        <li
                          key={benefit}
                          className={`flex gap-2.5 text-[0.9375rem] ${
                            has ? "text-ink-700" : "text-ink-400 line-through"
                          }`}
                        >
                          {has ? (
                            <CheckIcon className="mt-1.5 shrink-0 text-[0.8rem] text-gold-600" />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-px w-3 shrink-0 bg-ink-400"
                            />
                          )}
                          <span>
                            {benefit}
                            <span className="sr-only">
                              {has ? " — included" : " — not included"}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    href={`/contact?package=${pkg.slug}#enquiry`}
                    variant={pkg.featured ? "primary" : "secondary"}
                    className="mt-5 w-full"
                  >
                    Enquire About This Package
                  </Button>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Optional extras + waiting periods ────────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Optional extras */}
            <Reveal className="lg:col-span-6">
              <SectionHeading
                eyebrow="Optional extras"
                title="Added to any package, quoted separately."
                lead="These are not part of a monthly package. Tell us what you would like and we will price it for you."
              />
              <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                {extraServices.map((extra) => (
                  <li
                    key={extra.label}
                    className="flex items-center gap-3 border-b border-ink-900/10 py-3 text-[0.9375rem] text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-gold-500"
                    />
                    {extra.label}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Waiting periods */}
            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-2xl border border-ink-900/12 bg-white/60 p-7">
                <h2 className="flex items-center gap-2.5 font-display text-2xl text-ink-900">
                  <AlertIcon className="text-[1.25rem] text-gold-600" />
                  Waiting periods
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                  Please read these before you sign up. If anything is unclear,
                  phone us and ask — we would rather explain it twice.
                </p>
                <ul className="mt-5 space-y-3.5">
                  {waitingPeriods.map((w) => (
                    <li
                      key={w.text}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500"
                      />
                      <span>{w.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Small print */}
          <Reveal delay={160}>
            <div className="mt-14 border-t border-ink-900/10 pt-7">
              <p className="max-w-3xl text-[0.875rem] leading-relaxed text-ink-500">
                {packagesSmallPrint}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Questions about the packages ─────────────────────────────────── */}
      <section className="border-t border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Before you sign up"
                title="Questions families ask about the packages."
                lead="Read these before you commit to anything. If a point is still unclear, phone our office and ask."
              />
              <div className="mt-8">
                <Button
                  href="/contact?type=package#enquiry"
                  variant="secondary"
                  withArrow
                >
                  Ask us something else
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-8">
              <FaqList topic="packages" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Closing contact ──────────────────────────────────────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-20 text-ivory-100 sm:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <DoveMark className="mx-auto h-6 w-16 text-gold-400" />
              <h2 className="mt-7 text-3xl sm:text-[2.5rem]">
                Not sure which package suits your family?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ivory-200/80">
                Tell us who you need to cover and we will point you to the right
                one. A customised plan is also welcome.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mx-auto mt-10 max-w-2xl">
              <ContactActions tone="dark" about="your funeral packages" />
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-8 flex justify-center">
              <Button
                href="/contact?type=package#enquiry"
                variant="gold"
                withArrow
              >
                Send a package enquiry
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
