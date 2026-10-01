/**
 * Inline SVG icons. Kept as local components so the site ships no icon
 * dependency. All are decorative by default (aria-hidden); pass a title
 * through the parent element's accessible name instead.
 */

type IconProps = { className?: string };

const base = "h-[1em] w-[1em] shrink-0";

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M6.6 3.5h-.9A2.2 2.2 0 0 0 3.5 5.9c.4 6.6 5.9 12.2 12.6 12.6a2.2 2.2 0 0 0 2.4-2.2v-.9a1.4 1.4 0 0 0-1-1.4l-2.6-.8a1.4 1.4 0 0 0-1.5.5l-.7.9a11 11 0 0 1-5.1-5.1l.9-.7a1.4 1.4 0 0 0 .5-1.5l-.8-2.6a1.4 1.4 0 0 0-1.4-1Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.97L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06a6.73 6.73 0 0 1-3.37-2.95c-.25-.44.25-.4.72-1.35.08-.16.04-.3-.02-.42-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42-.14 0-.3-.03-.47-.03a.9.9 0 0 0-.65.3c-.22.25-.85.83-.85 2.02 0 1.2.87 2.35.99 2.51.12.16 1.71 2.62 4.15 3.67 1.54.67 2.15.72 2.92.61.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" />
    </svg>
  );
}

export function CheckIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function PlusIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function AlertIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${base} ${className}`}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </svg>
  );
}

/**
 * A restrained editorial divider: a gold hairline either side of a small
 * diamond. Used to open the closing section on each page.
 *
 * It is drawn rather than borrowed from the wordmark because the dove in the
 * logo is too finely detailed to stay legible at this size.
 */
export function DoveMark({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 96 12"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M0 6h36M60 6h36"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".45"
      />
      <path d="M48 1.5 52.5 6 48 10.5 43.5 6 48 1.5Z" fill="currentColor" />
      <path
        d="M41 6h-2M57 6h-2"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".7"
      />
    </svg>
  );
}
