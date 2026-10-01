import { contact, primaryPhone, regions } from "@/content/site";
import {
  telHref,
  whatsappHref,
  whatsappOpener,
  hasPhone,
  hasWhatsApp,
} from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { Unconfirmed } from "./ui";

/**
 * The call / WhatsApp pair used on the home page and in the contact sections.
 * If a detail is missing from the content file, the action is disabled and
 * labelled rather than rendered with a placeholder number.
 */
export function ContactActions({
  tone = "light",
  about,
  className = "",
}: {
  tone?: "light" | "dark";
  /** What the enquiry is about — carried into the WhatsApp message. */
  about?: string;
  className?: string;
}) {
  const tel = telHref();
  const wa = whatsappHref(whatsappOpener(about));

  const shell =
    "group flex items-center gap-3.5 rounded-2xl border px-5 py-4 transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]";
  const active =
    tone === "dark"
      ? "border-ivory-100/18 bg-ivory-100/[.04] hover:border-gold-400/55 hover:bg-gold-400/[.08]"
      : "border-ink-900/12 bg-white/60 hover:border-gold-500/55 hover:bg-gold-500/[.06] hover:shadow-md hover:shadow-ink-900/5";
  const muted =
    tone === "dark"
      ? "border-ivory-100/10 bg-ivory-100/[.02] opacity-60"
      : "border-ink-900/8 bg-white/30 opacity-60";

  const labelCls =
    tone === "dark"
      ? "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-400"
      : "text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-600";
  const valueCls =
    tone === "dark"
      ? "mt-0.5 text-[1.0625rem] font-medium text-ivory-100"
      : "mt-0.5 text-[1.0625rem] font-medium text-ink-900";
  const iconCls =
    tone === "dark"
      ? "text-[1.35rem] text-gold-400"
      : "text-[1.35rem] text-gold-600";

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {/* ── Phone ──────────────────────────────────────────────────────── */}
      {hasPhone && tel && primaryPhone ? (
        <a href={tel} className={`${shell} ${active}`}>
          <PhoneIcon className={iconCls} />
          <span className="min-w-0">
            <span className={`block ${labelCls}`}>Phone us</span>
            <span className={`block ${valueCls}`}>{primaryPhone.display}</span>
          </span>
        </a>
      ) : (
        <div className={`${shell} ${muted}`}>
          <PhoneIcon className={iconCls} />
          <span className="min-w-0">
            <span className={`block ${labelCls}`}>Phone us</span>
            <Unconfirmed
              label="Contact details to be confirmed"
              tone={tone === "dark" ? "dark" : "light"}
              className="mt-1"
            />
          </span>
        </div>
      )}

      {/* ── WhatsApp ───────────────────────────────────────────────────── */}
      {hasWhatsApp && wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={`${shell} ${active}`}
        >
          <WhatsAppIcon className={iconCls} />
          <span className="min-w-0">
            <span className={`block ${labelCls}`}>WhatsApp us</span>
            <span className={`block ${valueCls}`}>
              {contact.whatsapp.display}
            </span>
          </span>
        </a>
      ) : (
        <div className={`${shell} ${muted}`}>
          <WhatsAppIcon className={iconCls} />
          <span className="min-w-0">
            <span className={`block ${labelCls}`}>WhatsApp us</span>
            <Unconfirmed
              label="Contact details to be confirmed"
              tone={tone === "dark" ? "dark" : "light"}
              className="mt-1"
            />
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Every phone line, grouped by province — used on the contact page and
 * in the footer. Families ring the office nearest to them.
 */
export function RegionalNumbers({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {regions.map((region) => (
        <div key={region.region}>
          <h3
            className={`font-display text-xl ${dark ? "text-ivory-100" : "text-ink-900"}`}
          >
            {region.region}
          </h3>

          <ul className="mt-3 space-y-1.5">
            {region.lines.map((line) => {
              const href = telHref(line.tel);
              return (
                <li key={line.tel}>
                  {href ? (
                    <a
                      href={href}
                      className={`inline-flex items-center gap-2.5 text-[0.95rem] transition-colors duration-200 ${
                        dark
                          ? "text-ivory-200 hover:text-gold-300"
                          : "text-ink-700 hover:text-gold-700"
                      }`}
                    >
                      <PhoneIcon
                        className={dark ? "text-gold-400/80" : "text-gold-600/80"}
                      />
                      {line.display}
                    </a>
                  ) : (
                    <Unconfirmed
                      label="Number to be confirmed"
                      tone={dark ? "dark" : "light"}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {region.branches.length > 0 ? (
            <p
              className={`mt-3 text-sm leading-relaxed ${
                dark ? "text-ink-400" : "text-ink-500"
              }`}
            >
              {region.branches.join(" · ")}
            </p>
          ) : (
            <div className="mt-3">
              <Unconfirmed
                label={region.note ?? "Branches to be confirmed"}
                tone={dark ? "dark" : "light"}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
