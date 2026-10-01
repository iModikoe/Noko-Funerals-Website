# Implementation notes

Technical decisions, and how to extend the site. Not customer-facing.

---

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

No other runtime dependencies. No UI kit, no icon package, no animation
library, no form library — icons are inline SVG in `src/components/icons.tsx`,
and the reveal animation is about 30 lines of `IntersectionObserver`.

Every page is statically prerendered. Shared JavaScript is ~102 kB, and the
only page with meaningful page-level JS is `/contact` (the enquiry form).

---

## Content architecture

`src/content/site.ts` is the single source of truth. The pages contain layout
and prose framing; every business fact is imported from that file.

The one idea worth keeping is the `status` field:

```ts
export type Status = "confirmed" | "unconfirmed";
```

Components read it and render a `<Unconfirmed />` marker automatically, so an
unverified item can never be presented as fact by accident. This is what keeps
the proposal honest while still looking finished.

**When adding content, do not bypass this.** If a detail has not been supplied
in writing, add it with `status: "unconfirmed"` or leave it out.

### Contact links degrade safely

`src/lib/contact.ts` builds every `tel:`, `wa.me` and `mailto:` link, and
returns `null` when the underlying detail is missing or unconfirmed. Callers
treat `null` as "show 'Contact details to be confirmed' and disable the
action". There is no fallback to a placeholder number anywhere.

---

## Connecting the enquiry form

`src/components/EnquiryForm.tsx` currently validates input and then previews it
back to the visitor with "Demo only — your enquiry has not been sent." Nothing
is transmitted and nothing is stored.

To connect it, replace the block marked `DEMO ONLY` in `handleSubmit`:

```tsx
// Current — demo behaviour
setSubmitted(values);

// Replace with, for example:
const res = await fetch("/api/enquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
if (!res.ok) { /* show an error and keep the form filled in */ }
```

Then:

1. Add a route handler at `src/app/api/enquiry/route.ts` that posts to email
   (Resend, Postmark) or a CRM. Keep API keys in environment variables.
2. Add spam protection — a honeypot field and rate limiting are usually enough
   at this volume.
3. Change `proposal.formNotice` in `src/content/site.ts`, and update the
   preview screen copy to a genuine confirmation.
4. Add a POPIA-compliant privacy notice and a retention policy before
   collecting real personal information.

**Keep the privacy notice above the form.** It asks visitors not to send
identity numbers, medical details or death certificates, which keeps sensitive
personal information out of the enquiry pipeline entirely.

---

## Design system

Tokens are defined in the `@theme` block of `src/app/globals.css`.

| Token group | Use |
| --- | --- |
| `ink-*` | Charcoal surfaces and body text |
| `ivory-*` | Warm off-white page surfaces |
| `gold-*` | Accent only — hairlines, eyebrows, key numbers, the primary CTA |

Two colours have measured constraints, noted in comments in the CSS. Do not
lighten them:

- `gold-600` (`#8a6120`) — the small-caps eyebrows. 5.1:1 on `ivory-100`.
- Footer legal text uses `ink-400`, not `ink-500`; `ink-500` measures 2.6:1 on
  charcoal and fails AA.

Type is Cormorant Garamond for display and Inter for body.

**The font files are committed to the repository** at `src/fonts` and loaded
with `next/font/local`, not `next/font/google`. The Google loader downloads at
*build* time, so a dropped connection produces a build silently set in Times New
Roman — which is exactly what happened once during development. Vendoring the
latin subsets means builds work offline and are byte-identical every time.

All three faces are variable (one file covers weights 400–600): 125 KB in total,
less than the separate static weights would have been. To change a typeface,
drop new `.woff2` files into `src/fonts` and update the `localFont` calls in
`layout.tsx`.

Cormorant defaults to old-style figures, which made prices like "R249" bounce up
and down, so the display face is set to `lining-nums` in the base layer.

### Buttons

Use the `variant` prop — do **not** pass a colour through `className`. Tailwind
emits `.bg-ink-900` after `.bg-gold-500`, so an override in the class string
silently loses the cascade. That bug turned the gold CTA into a dark pill on
dark until `variant="gold"` was added.

---

## The hero video

`public/video/procession.mp4` — 15 seconds, 436×696, 1.3 MB, **no audio track
at all**, so it can never make a sound in a quiet room.

It was cut from the supplied `.mov` (a 66-second vertical clip, HEVC, with
TikTok interface furniture burned into the picture):

1. **Cropped** to `436×696` from offset `140,72`, which lies clear of every
   overlay — the "follow us" bar, the logo band, the yellow web-address strip,
   and both resting positions of the bouncing TikTok watermark. Frames were
   sampled across the whole clip to confirm the crop stays clean.
2. **Trimmed** to 27s–43s, before the end cards.
3. **Looped seamlessly**: the body runs 1s–15s, then a one-second cross-blend
   carries the tail back into the head, so the loop point does not jump.
4. **Re-encoded** to H.264 at CRF 28, audio dropped.

VP9/WebM was tried and came out *larger* than H.264 on this source, so it is
not shipped.

`src/components/HeroVideo.tsx` decides whether to play at all:

| Condition | Behaviour |
| --- | --- |
| `prefers-reduced-motion` | Poster frame only. No `<video>` element is rendered. |
| `navigator.connection.saveData`, or a 2G connection | Poster frame only |
| Scrolled out of view | Paused, so it costs no battery |
| Autoplay refused by the browser | Poster frame plus a visible Play control |

> If the business can supply the **original footage** — before it was uploaded
> to TikTok — re-cut from that instead. It will be higher resolution and will
> not need the crop. See the launch checklist.

---

## Motion

`src/components/Reveal.tsx` fades content up as it scrolls into view.

Content is only hidden while `.reveal-ready` is on `<html>`. That class is added
by a small inline script in `<head>` (so nothing is painted and then hidden),
and a 4-second failsafe in the same script removes it again if the app has not
hydrated. The result:

- JavaScript disabled → class never added → everything visible
- Hydration fails or stalls → failsafe fires → everything visible
- Normal load → reveals animate on scroll

`prefers-reduced-motion: reduce` disables all of it with `!important`, including
smooth scrolling.

This matters more than usual here: a grieving family must never land on a blank
page because an animation did not run.

### The rest of the motion layer

All of it is hand-rolled in `src/lib/motion.ts` and `src/components/motion/`.
No animation library — the whole layer adds nothing to the shared bundle, which
is still 102 kB.

| Piece | What it does | Where |
| --- | --- | --- |
| `SplitText` | Headline rises word by word from behind a mask | Every page's `<h1>` |
| `Parallax` / `SlowZoom` | Gentle drift and Ken Burns on photographs | Hero, services, about |
| `ScrollProgress` | Hairline gold reading bar | Global, in the layout |
| `CountUp` | Counts real figures up on scroll | Home stats band |
| `Marquee` | Slow band of the towns served | Home stats band |
| `ServicesIndex` | Cursor-following photograph on the services list | Home |
| `.grain` | CSS-only film grain over charcoal sections | Global utility |
| `.lift` | Weighted card hover | Package and step cards |
| `template.tsx` | Short fade on every route change | Global |

Rules followed throughout, and worth keeping to:

- **Only `transform` and `opacity` animate.** Nothing triggers layout.
- **Slow and weighted.** Durations sit between 500 ms and 1.4 s on
  `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing bounces, springs or overshoots —
  this is a funeral business, not a product launch.
- **Every effect degrades to its resting state**, not to nothing. Reduced
  motion shows the finished text, the still frame and the plain list.
- **`CountUp` only ever animates supplied figures** — branches, provinces,
  package count. No invented statistics anywhere.
- **The cursor-following preview is suppressed** for touch, keyboard and
  reduced-motion users, who get a plain list of links that works identically.

---

## Images

Source photographs live in `Images/` (not served). Optimised WebP copies are in
`public/photos/`, referenced with explicit `width`/`height` so nothing shifts
during load. The hero image is `priority`; everything else lazy-loads.

**Only dignified, non-distressing photographs were selected.** Close-ups of
caskets from the supplied set were deliberately excluded. If the business wants
them used, that is their call to make.

Two optimised images are included but not yet placed, as spares for the About
or Services pages: `fleet-cars.webp` (branded vehicles) and `blanket.webp` (a
traditional blanket being laid, shown respectfully). Delete them if unwanted.

### Logo

`public/brand/` holds PNGs extracted from the supplied artwork by removing the
flat background and recovering the true colours:

| File | Use |
| --- | --- |
| `logo-dark.png` | Full lockup for ivory backgrounds |
| `logo-light.png` | Full lockup for charcoal backgrounds |
| `mark-{dark,light,gold}.png` | The porcupine mark on its own |
| `icon.png`, `apple-icon.png` | App icons |

To replace the logo, drop in new files at the same paths and roughly the same
aspect ratio (16:9 for the lockups). Nothing else changes —
`src/components/Logo.tsx` reads only those paths. Ask the business for vector
artwork if it exists; these were rebuilt from a raster image.

---

## Accessibility

Verified in a headless browser across all six pages:

- One `<h1>` per page, no heading-level skips
- Every image has an `alt`; decorative images have `alt=""`
- Every form control has an associated `<label>`
- No unnamed links
- All text passes WCAG AA contrast (4.5:1 body, 3:1 large)
- Visible gold focus ring on everything focusable, brightened on dark surfaces
- Skip-to-content link
- FAQs use native `<details>`, so they work without JavaScript

The enquiry form specifically:

- Errors appear in a focusable `role="alert"` summary that links to each field
- Invalid fields get `aria-invalid` and `aria-describedby`
- The submitted preview is a `role="status"` region and receives focus
- Validation messages say what to do, not just what is wrong

---

## Known gaps

- **No sitemap.xml.** Deliberate while the site is `noindex`. Add
  `src/app/sitemap.ts` when it goes live; `robots.ts` already points at it
  once `proposal.isProposal` is false.
- **Link previews** come from `src/app/opengraph-image.jpg` — the wordmark
  over the fleet photograph, generated from the supplied assets. Replace that
  file to change how a shared link looks.
- **No analytics.** Add a privacy-respecting option if the business wants it.
- **`metadataBase` points at `nokofunerals.co.za`.** Update if the domain differs.
- **No Open Graph image.** Worth adding before the link is shared on social
  media — the logo on charcoal would do.
- **No structured data.** `LocalBusiness` / `FuneralHome` JSON-LD would help
  local search, but needs the confirmed address and hours first.
