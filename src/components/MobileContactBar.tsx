import { primaryPhone } from "@/content/site";
import { telHref, whatsappHref, whatsappOpener } from "@/lib/contact";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import Link from "next/link";

/**
 * A fixed contact bar for phones.
 *
 * It must never cover content: <body> carries bottom padding on small screens
 * (see layout.tsx) exactly the height of this bar, so the end of every page
 * remains reachable and readable above it.
 *
 * Actions that have no confirmed detail behind them are not rendered at all,
 * rather than shown as dead buttons.
 */
export default function MobileContactBar() {
  const tel = telHref();
  const wa = whatsappHref(whatsappOpener());

  const actions = [
    tel
      ? {
          key: "call",
          href: tel,
          external: false,
          icon: <PhoneIcon className="text-[1.125rem]" />,
          label: "Call",
          sr: `Phone us on ${primaryPhone?.display ?? ""}`,
        }
      : null,
    wa
      ? {
          key: "whatsapp",
          href: wa,
          external: true,
          icon: <WhatsAppIcon className="text-[1.125rem]" />,
          label: "WhatsApp",
          sr: "Message us on WhatsApp",
        }
      : null,
  ].filter(Boolean) as {
    key: string;
    href: string;
    external: boolean;
    icon: React.ReactNode;
    label: string;
    sr: string;
  }[];

  return (
    <div
      data-no-print
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory-100/10 bg-ink-900/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav aria-label="Quick contact" className="flex items-stretch">
        {actions.map((action) => (
          <a
            key={action.key}
            href={action.href}
            {...(action.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex flex-1 items-center justify-center gap-2 py-3.5 text-[0.9375rem] font-medium text-ivory-100 transition-colors duration-200 active:bg-ivory-100/10"
          >
            <span aria-hidden="true" className="text-gold-400">
              {action.icon}
            </span>
            {action.label}
            <span className="sr-only">— {action.sr}</span>
          </a>
        ))}

        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 border-l border-ivory-100/10 bg-gold-500 py-3.5 text-[0.9375rem] font-semibold text-ink-900 transition-colors duration-200 active:bg-gold-400"
        >
          Request help
        </Link>
      </nav>
    </div>
  );
}
