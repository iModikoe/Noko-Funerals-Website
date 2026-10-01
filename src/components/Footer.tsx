import Link from "next/link";
import { Logo } from "./Logo";
import { RegionalNumbers } from "./ContactActions";
import { Container, Unconfirmed } from "./ui";
import { MailIcon, PinIcon, WhatsAppIcon } from "./icons";
import { business, contact, proposal } from "@/content/site";
import { mailtoHref, whatsappHref, whatsappOpener, hasAddress } from "@/lib/contact";
import { navigation } from "./navigation";

export default function Footer() {
  const mail = mailtoHref("Website enquiry");
  const wa = whatsappHref(whatsappOpener());
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink relative mt-px bg-ink-900 text-ivory-200">
      {/* Gold hairline across the top edge */}
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />

      <Container wide className="py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          {/* ── Brand ──────────────────────────────────────────────────── */}
          <div>
            <Logo tone="light" width={188} />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-400">
              Funeral arrangements and practical support for families across
              North West, Limpopo and Gauteng.
            </p>

            <div className="mt-7 space-y-2.5 text-[0.95rem]">
              {mail ? (
                <a
                  href={mail}
                  className="inline-flex items-center gap-2.5 text-ivory-200 transition-colors duration-200 hover:text-gold-300"
                >
                  <MailIcon className="text-gold-400" />
                  {contact.email.display}
                </a>
              ) : null}

              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-ivory-200 transition-colors duration-200 hover:text-gold-300"
                >
                  <WhatsAppIcon className="text-gold-400" />
                  {contact.whatsapp.display}
                </a>
              ) : null}

              <div className="flex items-start gap-2.5 text-ink-400">
                <PinIcon className="mt-1 shrink-0 text-gold-400" />
                {hasAddress ? (
                  <span className="not-italic">
                    {contact.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                ) : (
                  <Unconfirmed label="Address to be confirmed" tone="dark" />
                )}
              </div>
            </div>
          </div>

          {/* ── Numbers by province ────────────────────────────────────── */}
          <div>
            <h2 className="eyebrow mb-7">Phone your nearest office</h2>
            <RegionalNumbers tone="dark" />
          </div>
        </div>

        {/* ── Navigation + legal ───────────────────────────────────────── */}
        <div className="mt-16 border-t border-ink-700 pt-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-ink-400 transition-colors duration-200 hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ink-400 rather than ink-500: ink-500 measures only 2.6:1 on the
              charcoal footer, which fails AA at this size. */}
          <div className="mt-8 flex flex-col gap-3 text-[0.8125rem] leading-relaxed text-ink-400 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p>
                © {year} {business.legalName}. Registration number{" "}
                {business.registrationNumber}.
              </p>
              {proposal.isProposal ? (
                <p className="mt-1.5">{proposal.banner}</p>
              ) : null}
            </div>
            <p className="font-display text-base italic text-gold-400/80">
              {business.tagline}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
