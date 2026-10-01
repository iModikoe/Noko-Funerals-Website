import Link from "next/link";
import type { Metadata } from "next";

import { Button, Container } from "@/components/ui";
import { ContactActions } from "@/components/ContactActions";
import { Mark } from "@/components/Logo";
import { navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for could not be found. Here is how to reach Noko Funerals.",
};

export default function NotFound() {
  return (
    <section className="on-ink bg-ink-900 py-20 text-ivory-100 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Mark tone="gold" width={64} className="mx-auto" />

          <p className="eyebrow mt-8">Page not found</p>

          <h1 className="mt-5 text-[2.25rem] leading-[1.12] sm:text-[3rem]">
            We could not find that page.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ivory-200/80">
            The link may have changed, or the page may have moved. If you need
            help urgently, please phone us — we would rather you spoke to
            someone than kept searching.
          </p>

          <div className="mt-10">
            <ContactActions tone="dark" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href="/"
                variant="gold"
              withArrow
            >
              Back to the home page
            </Button>
            <Button href="/contact" variant="onInk">
              Request Assistance
            </Button>
          </div>

          <nav aria-label="All pages" className="mt-14">
            <p className="eyebrow mb-5">Or try one of these</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-ivory-200/80 underline decoration-gold-500/60 underline-offset-[6px] transition-colors duration-200 hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
