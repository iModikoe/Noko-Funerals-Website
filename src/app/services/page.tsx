import Image from "next/image";
import type { Metadata } from "next";

import { Button, Container, SectionHeading, Unconfirmed, Rule } from "@/components/ui";
import { ContactActions } from "@/components/ContactActions";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/motion/SplitText";
import { SlowZoom } from "@/components/motion/Parallax";
import { CheckIcon, DoveMark } from "@/components/icons";
import { extraServices, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Funeral arrangements, caskets, hearse and family transport, burial services and practical support at the family home. See what Noko Funerals can arrange for your family.",
};

export default function ServicesPage() {
  const confirmed = services.filter((s) => s.status === "confirmed");
  const proposed = services.filter((s) => s.status === "unconfirmed");

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
              Our services
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.1] sm:text-[3.25rem]">
              <SplitText text="What we carry, so your family does not have to." immediate delay={180} />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-200/80">
              Each service below is part of how we look after a family. Ask us
              about any of them — there is no obligation in a phone call.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Confirmed services ───────────────────────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <div className="space-y-20 sm:space-y-24">
            {confirmed.map((service, i) => {
              const flipped = i % 2 === 1;
              return (
                <Reveal key={service.slug}>
                  <article
                    id={service.slug}
                    className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14"
                  >
                    {/* Text */}
                    <div
                      className={`lg:col-span-7 ${
                        flipped && service.image ? "lg:order-2 lg:col-start-6" : ""
                      }`}
                    >
                      <p
                        aria-hidden="true"
                        className="font-display text-sm text-gold-600"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-3 text-3xl text-ink-900 sm:text-[2.25rem]">
                        {service.title}
                      </h2>

                      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
                        {service.summary}
                      </p>

                      <p className="mt-4 max-w-xl leading-relaxed text-ink-600">
                        {service.detail}
                      </p>

                      {service.includes.length > 0 ? (
                        <>
                          <Rule className="my-7 max-w-xl" />
                          <ul className="grid max-w-xl gap-2.5 sm:grid-cols-2">
                            {service.includes.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-[0.9375rem] text-ink-700"
                              >
                                <CheckIcon className="mt-1.5 shrink-0 text-[0.8rem] text-gold-600" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      <div className="mt-8">
                        <Button
                          href={`/contact?type=service#enquiry`}
                          variant="secondary"
                          withArrow
                        >
                          Enquire about {service.title.toLowerCase()}
                        </Button>
                      </div>
                    </div>

                    {/* Image */}
                    {service.image ? (
                      <div
                        className={`lg:col-span-5 ${
                          flipped ? "lg:order-1 lg:col-start-1" : ""
                        }`}
                      >
                        <figure className="overflow-hidden rounded-2xl">
                          <SlowZoom from={1.02} to={1.12}>
                            <Image
                              src={service.image.src}
                              alt={service.image.alt}
                              width={service.image.width}
                              height={service.image.height}
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="h-full w-full object-cover"
                            />
                          </SlowZoom>
                        </figure>
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Additional services ──────────────────────────────────────────── */}
      <section className="border-y border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Also available"
                title="Extras that families often ask for."
                lead="These are not included in a package. We arrange them on request and quote separately."
              />
              <div className="mt-8">
                <Button
                  href="/contact?type=service#enquiry"
                  variant="secondary"
                  withArrow
                >
                  Ask for a quote
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {extraServices.map((extra) => (
                  <li
                    key={extra.label}
                    className="flex items-center gap-3 border-b border-ink-900/10 py-3.5 text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 shrink-0 rounded-full bg-gold-500"
                    />
                    {extra.label}
                    {extra.status === "unconfirmed" ? (
                      <Unconfirmed label="To be confirmed" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Proposed services, clearly marked ────────────────────────────── */}
      {proposed.length > 0 ? (
        <section className="bg-ivory-100 py-20 sm:py-24">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Awaiting confirmation"
                title="Services we have not yet confirmed."
                lead="These are proposed sections for the website. Noko Funerals has not confirmed that it offers them, so nothing here is presented as available. Each will either be completed or removed before the site goes live."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {proposed.map((service, i) => (
                <Reveal key={service.slug} delay={i * 90}>
                  <article
                    id={service.slug}
                    className="h-full rounded-2xl border border-dashed border-gold-600/40 bg-gold-500/[0.04] p-7"
                  >
                    <Unconfirmed label="Service details to be confirmed" />
                    <h2 className="mt-4 font-display text-2xl text-ink-900">
                      {service.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-ink-600">
                      {service.summary}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Closing contact ──────────────────────────────────────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-20 text-ivory-100 sm:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <DoveMark className="mx-auto h-6 w-16 text-gold-400" />
              <h2 className="mt-7 text-3xl sm:text-[2.5rem]">
                Not sure what you need?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ivory-200/80">
                Phone us and describe your situation. We will tell you plainly
                what we can do and what it involves.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mx-auto mt-10 max-w-2xl">
              <ContactActions tone="dark" about="your services" />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
