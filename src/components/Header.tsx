"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoLink } from "./Logo";
import { Button } from "./ui";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { telHref, whatsappHref, whatsappOpener } from "@/lib/contact";
import { contact, primaryPhone } from "@/content/site";
import { navigation } from "./navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const tel = telHref();
  const wa = whatsappHref(whatsappOpener());

  /* Close the menu on navigation. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Shrink / solidify the header once the page scrolls. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes the menu and returns focus to the toggle. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-no-print
      className={`sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.22,.61,.36,1)] ${
        scrolled
          ? "border-b border-ink-900/8 bg-ivory-100/92 backdrop-blur-md"
          : "border-b border-transparent bg-ivory-100"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
        <div
          className={`transition-all duration-500 ${scrolled ? "py-3" : "py-4"}`}
        >
          <LogoLink width={scrolled ? 132 : 152} priority />
        </div>

        {/* ── Desktop navigation ─────────────────────────────────────────── */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.9375rem] tracking-wide transition-colors duration-300 ${
                      active
                        ? "text-ink-900"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-300 ${
                        active ? "w-full" : "w-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {tel ? (
            <a
              href={tel}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] text-ink-700 transition-colors duration-300 hover:text-gold-700"
            >
              <PhoneIcon className="text-gold-600" />
              <span className="sr-only">Phone us on </span>
              {primaryPhone?.display}
            </a>
          ) : null}
          <Button href="/contact" className="px-5 py-3">
            Request Assistance
          </Button>
        </div>

        {/* ── Mobile toggle ──────────────────────────────────────────────── */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 inline-flex items-center gap-2.5 rounded-full px-3 py-2.5 text-ink-900 lg:hidden"
        >
          <span className="text-[0.8125rem] font-medium uppercase tracking-[0.14em]">
            {open ? "Close" : "Menu"}
          </span>
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-ink-900 transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-5 bg-ink-900 transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-ink-900 transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
          <span className="sr-only">
            {open ? "Close main menu" : "Open main menu"}
          </span>
        </button>
      </div>

      {/* ── Mobile panel ─────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-ink-900/8 bg-ivory-100 lg:hidden"
      >
        <nav aria-label="Main" className="px-5 pb-7 pt-4 sm:px-8">
          <ul className="divide-y divide-ink-900/8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 font-display text-2xl transition-colors ${
                      active ? "text-gold-700" : "text-ink-900"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid gap-2.5">
            <Button href="/contact" className="w-full">
              Request Assistance
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              {tel ? (
                <a
                  href={tel}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 py-3 text-[0.9375rem] text-ink-900"
                >
                  <PhoneIcon className="text-gold-600" /> Call
                </a>
              ) : null}
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 py-3 text-[0.9375rem] text-ink-900"
                >
                  <WhatsAppIcon className="text-gold-600" /> WhatsApp
                </a>
              ) : null}
            </div>
            {contact.whatsapp.status === "confirmed" ? (
              <p className="pt-1 text-center text-sm text-ink-500">
                {contact.whatsapp.display}
              </p>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
