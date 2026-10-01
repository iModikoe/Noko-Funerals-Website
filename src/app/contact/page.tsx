import type { Metadata } from "next";
import { Suspense } from "react";

import { Container, SectionHeading, Unconfirmed, Rule } from "@/components/ui";
import { ContactActions, RegionalNumbers } from "@/components/ContactActions";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/motion/SplitText";
import { MailIcon, PinIcon } from "@/components/icons";
import { contact } from "@/content/site";
import { mailtoHref, hasAddress, hasMap } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Phone or WhatsApp Noko Funerals for immediate assistance, a service enquiry or a package enquiry. Offices across North West, Limpopo and Gauteng.",
};

export default function ContactPage() {
  const mail = mailtoHref("Website enquiry");

  return (
    <>
      {/* ── Page header, with the fastest routes to a person ─────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-16 text-ivory-100 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.07] blur-[110px]"
          style={{ animation: "noko-breathe 16s ease-in-out infinite" }}
        />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-8 bg-current opacity-60"
                />
                Contact us
              </p>
              <h1 className="mt-6 text-[2.5rem] leading-[1.1] sm:text-[3.25rem]">
              <SplitText text="One call is enough to start." immediate delay={180} />
            </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory-200/80">
                If someone has passed away, phone us rather than fill in a form.
                We will answer and guide you from there.
              </p>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <ContactActions tone="dark" />

              {mail ? (
                <a
                  href={mail}
                  className="mt-3 flex items-center gap-3.5 rounded-2xl border border-ivory-100/18 bg-ivory-100/[.04] px-5 py-4 transition-all duration-300 hover:border-gold-400/55 hover:bg-gold-400/[.08]"
                >
                  <MailIcon className="text-[1.35rem] text-gold-400" />
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-400">
                      Email us
                    </span>
                    <span className="mt-0.5 block text-[1.0625rem] font-medium text-ivory-100">
                      {contact.email.display}
                    </span>
                  </span>
                </a>
              ) : null}

              {/* Operating hours are not claimed — they have not been supplied */}
              {contact.hours ? (
                <p className="mt-4 text-[0.9375rem] text-ivory-200/70">
                  {contact.hours}
                </p>
              ) : (
                <div className="mt-4">
                  <Unconfirmed
                    label="Operating hours to be confirmed"
                    tone="dark"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Numbers by province ──────────────────────────────────────────── */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our offices"
              title="Phone the office nearest to you."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <RegionalNumbers />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Enquiry form ─────────────────────────────────────────────────── */}
      <section
        id="enquiry"
        className="border-y border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Send an enquiry"
                title="Tell us how to reach you."
                lead="Fill in as much as you are able to. We will come back to you on whichever method you prefer."
              />

              <Rule className="my-8" />

              <div className="space-y-5 text-[0.9375rem] leading-relaxed text-ink-600">
                <p>
                  <strong className="font-semibold text-ink-900">
                    If it is urgent,
                  </strong>{" "}
                  please phone instead. A form waits for someone to read it; a
                  phone call does not.
                </p>
                <p>
                  We will only use what you send here to reply to your enquiry.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              <div className="rounded-2xl border border-ink-900/12 bg-ivory-100 p-6 sm:p-9">
                <Suspense
                  fallback={
                    <p className="text-ink-500">Loading the enquiry form…</p>
                  }
                >
                  <EnquiryForm />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Location ─────────────────────────────────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Find us"
                title="Where to come and see us."
              />

              <div className="mt-8">
                {hasAddress ? (
                  <address className="flex gap-3.5 not-italic text-ink-700">
                    <PinIcon className="mt-1 shrink-0 text-[1.25rem] text-gold-600" />
                    <span>
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </address>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gold-600/40 bg-gold-500/[0.04] p-6">
                    <Unconfirmed label="Address to be confirmed" />
                    <p className="mt-3.5 leading-relaxed text-ink-600">
                      A verified street address and map will appear here once
                      Noko Funerals supplies them. We have not placed a
                      placeholder address on the site, so that nobody is
                      directed to the wrong place.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal variant="fade" delay={120} className="lg:col-span-7">
              {hasMap && contact.address.mapEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-ink-900/12">
                  <iframe
                    src={contact.address.mapEmbedUrl}
                    title="Map showing the Noko Funerals office location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[22rem] w-full border-0 sm:h-[26rem]"
                  />
                </div>
              ) : (
                <div className="flex h-[18rem] items-center justify-center rounded-2xl border border-dashed border-ink-900/20 bg-ivory-200/60 p-8 sm:h-[24rem]">
                  <div className="text-center">
                    <PinIcon className="mx-auto text-[2rem] text-ink-400" />
                    <p className="mt-4 font-display text-xl text-ink-700">
                      Map to be added
                    </p>
                    <p className="mx-auto mt-2 max-w-xs text-[0.9375rem] text-ink-500">
                      Ready for a Google Maps embed once the address is
                      confirmed.
                    </p>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
