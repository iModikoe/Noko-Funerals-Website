import Link from "next/link";
import { ArrowIcon } from "./icons";
import { Unconfirmed } from "./ui";
import type { Service } from "@/content/site";

/**
 * The services list on the home page.
 *
 * A plain editorial list of links. Each row answers on hover with a soft gold
 * wash and a little movement — nothing that competes with the words.
 *
 * No JavaScript: this renders on the server and ships no client code.
 */
export default function ServicesIndex({ services }: { services: Service[] }) {
  return (
    <div className="border-t border-ink-900/12">
      {services.map((service, i) => (
        <Link
          key={service.slug}
          href={`/services#${service.slug}`}
          className="group relative grid items-baseline gap-x-8 gap-y-2 border-b border-ink-900/12 py-7 sm:grid-cols-12 sm:py-8"
        >
          {/* Gold wash that sweeps in behind the row */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -inset-x-4 -z-10 origin-left scale-x-0 rounded-lg bg-gold-500/[0.07] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 sm:-inset-x-6"
          />

          <span
            aria-hidden="true"
            className="font-display text-sm text-gold-600 transition-transform duration-500 group-hover:translate-x-1 sm:col-span-1"
          >
            {String(i + 1).padStart(2, "0")}
          </span>

          <span className="sm:col-span-4">
            <span className="font-display text-2xl text-ink-900 transition-colors duration-500 group-hover:text-gold-700 sm:text-[1.625rem]">
              {service.title}
            </span>
            {service.status === "unconfirmed" ? (
              <Unconfirmed
                label="Service details to be confirmed"
                className="ml-3 align-middle"
              />
            ) : null}
          </span>

          <span className="text-[0.9375rem] leading-relaxed text-ink-600 sm:col-span-6">
            {service.summary}
          </span>

          <span className="hidden justify-self-end text-ink-400 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-gold-600 sm:col-span-1 sm:block">
            <ArrowIcon className="text-xl" />
          </span>
        </Link>
      ))}
    </div>
  );
}
