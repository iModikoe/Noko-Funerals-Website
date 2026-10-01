import { contact, primaryPhone } from "@/content/site";

/**
 * Link builders for the contact actions.
 *
 * Each returns `null` when the underlying detail has not been confirmed.
 * Callers must treat null as "show 'Contact details to be confirmed' and
 * disable the action" — never as "fall back to something invented".
 */

export function telHref(tel?: string | null): string | null {
  const number = tel ?? primaryPhone?.tel ?? null;
  if (!number) return null;
  return `tel:${number.replace(/\s+/g, "")}`;
}

export function whatsappHref(message?: string): string | null {
  const { waNumber, status } = contact.whatsapp;
  if (!waNumber || status !== "confirmed") return null;
  const base = `https://wa.me/${waNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoHref(subject?: string): string | null {
  const { display, status } = contact.email;
  if (!display || status !== "confirmed") return null;
  return subject
    ? `mailto:${display}?subject=${encodeURIComponent(subject)}`
    : `mailto:${display}`;
}

export const hasPhone = Boolean(primaryPhone);
export const hasWhatsApp = Boolean(whatsappHref());
export const hasEmail = Boolean(mailtoHref());
export const hasAddress =
  contact.address.status === "confirmed" && contact.address.lines.length > 0;
export const hasMap = Boolean(contact.address.mapEmbedUrl);

/** A gentle opening line for a WhatsApp enquiry, so a family need not start cold. */
export function whatsappOpener(about?: string): string {
  return about
    ? `Good day. I would like to enquire about ${about}.`
    : "Good day. I would like to enquire about your services.";
}
