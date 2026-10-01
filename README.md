# Noko Funerals — website proposal

A complete, working website built as a proposal for **Noko Funerals (Pty) Ltd**.
It is a real implementation, not a mock-up: every page, link, form and layout works.

> **This build is a proposal preview.** It carries a site-wide label, its enquiry
> form does not send anything, and it is blocked from search engines. See
> [Before it goes live](#before-it-goes-live).

> **Two different things, often confused:**
>
> - **The deployed site is public.** Anyone with the link can open it, with no
>   login. That is the point — the owner clicks a link and sees the proposal.
>   It stays out of Google because every page sends `noindex`, so in practice
>   only the people you send the link to will ever find it.
> - **The source repository should be private.** That is a separate setting and
>   has no effect on the link. Making the repo private costs nothing and keeps
>   the source, the raw photographs and the original video out of public view.

---

## Running it

Requires Node 18.18 or newer (built and tested on Node 24).

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run typecheck    # TypeScript, no emit
npm run lint         # ESLint
npm run check        # all three — run this before you push
```

> Do not run `npm run dev` and `npm run build` at the same time in this folder.
> They share `.next`, and the dev server will fail with
> `Cannot find module './<n>.js'`. If that happens: stop the server, delete
> `.next`, start again.

---

## Putting it on GitHub

The repository is initialised with an initial commit on `main`. To push it:

```bash
gh repo create noko-funerals --private --source=. --remote=origin --push
```

Or without the GitHub CLI:

```bash
git remote add origin git@github.com:<you>/noko-funerals.git
git push -u origin main
```

**Create it as private.** See the warning at the top.

`.github/workflows/ci.yml` runs typecheck, lint and build on every push and
pull request. It needs no secrets and no network beyond npm — the fonts are
committed, so the build cannot be broken by a Google Fonts outage.

---

## Deploying to Vercel — getting a link to send

The goal is one link the business owner can open on their phone, with no
account, no login and nothing to install.

```bash
npx vercel login
npx vercel --prod
```

That prints a URL like `https://noko-funerals.vercel.app`. **Send that one.**

### Use `--prod`, not a preview

This matters. On Vercel's free plan, *preview* deployments sit behind
**Deployment Protection**, which asks the visitor to sign in to Vercel. A
business owner will hit a login wall and give up.

Production deployments are public by default. So either deploy with `--prod`,
or turn protection off at
**Project → Settings → Deployment Protection → Vercel Authentication →
Disabled**.

After deploying, open the link in a private browsing window. If it loads
without asking you to sign in, the owner will see the same thing.

### Sharing it

The link is designed to be sent on WhatsApp, which is how most people in South
Africa will receive it. It previews with the Noko Funerals wordmark over their
fleet (`src/app/opengraph-image.jpg`) and the site's own title and description,
so the message looks like something considered rather than a bare URL.

Every page carries the "Website proposal preview — business details subject to
confirmation" label, so nobody who opens the link can mistake it for the live
business site.

### Later, if the business says yes

Import the repository at [vercel.com/new](https://vercel.com/new) so that every
push to `main` deploys automatically, then add the real domain under
**Project → Settings → Domains**. Confirm who controls `nokofunerals.co.za`
first — checklist item 5.1.

### Environment variables

None are required. The site builds and runs with none set.

| Variable | When you need it |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Once the real domain is live. Without it the site uses the Vercel deployment URL, which is correct for previews. |
| `ENQUIRY_TO_EMAIL`, `RESEND_API_KEY` | Only once the enquiry form is connected to something — see the implementation notes. |

Copy `.env.example` to `.env.local` for local work. Never commit `.env.local`.

### What is already handled

- **It stays out of search.** Every page sends `noindex, nofollow` while
  `proposal.isProposal` is true, so no deployment can turn up in results beside
  the real business. `robots.txt` deliberately *allows* crawling: a blocked
  crawler never reads the `noindex`, and link previews would stop working. See
  the comments in `src/app/robots.ts`.
- **Metadata follows the deployment.** `src/lib/site-url.ts` resolves the base
  URL from `NEXT_PUBLIC_SITE_URL`, then Vercel's own environment variables, so
  a preview build never advertises the live domain.
- **Security headers** are set in `next.config.ts`.
- **Media caching** — `/photos`, `/brand` and `/video` get a day of freshness
  and a week of stale-while-revalidate.
- Every page is statically prerendered, so there are no serverless functions
  and nothing to keep warm.

### Adding the domain

In the Vercel dashboard: Project → Settings → Domains → add
`nokofunerals.co.za`. Confirm who controls the domain first — checklist item
5.1.

---

## What is where

```
src/
  content/site.ts        ← ALL business content lives here. Start here.
  app/
    layout.tsx           shared shell: header, footer, mobile bar, metadata
    page.tsx             Home
    about/page.tsx       About
    services/page.tsx    Services
    plans/page.tsx       Plans & Packages
    contact/page.tsx     Contact (enquiry form, location)
    not-found.tsx        404
    robots.ts            search-engine rules
    globals.css          design tokens, base styles, motion
  components/            header, footer, form, cards, icons…
  lib/contact.ts         builds tel:/wa.me/mailto links safely
public/
  brand/                 logo and icon files
  photos/                optimised photography (WebP)
docs/
  LAUNCH-CHECKLIST.md    ← what the business must supply before launch
  IMPLEMENTATION-NOTES.md  technical decisions and how to extend
```

### Editing content

**`src/content/site.ts` is the only file you need for day-to-day changes.**
Phone numbers, branches, services, packages, FAQs, page copy and the proposal
settings all live there, each with comments explaining what it drives.

Every content item carries a `status`:

| `status` | Meaning | How the site renders it |
| --- | --- | --- |
| `"confirmed"` | Supplied by the business | Normally |
| `"unconfirmed"` | Proposed, not yet verified | With a visible "to be confirmed" marker |

Flip an item to `"confirmed"` once the owner verifies it, or delete it if the
business does not offer it.

---

## Where the content came from

Nothing on this site was invented. It was taken from material supplied with the
brief:

- **Logo** — extracted from the supplied artwork and rebuilt as transparent PNGs
  in `public/brand/` (a dark version for light backgrounds, a light version for
  dark, plus the porcupine mark and favicons).
- **Phone numbers, email, company registration, packages, waiting periods and
  optional extras** — from the supplied packages flyer.
- **Branch towns and the WhatsApp number** — from the supplied "Find us in your
  community" graphic.
- **Photography** — from the supplied photographs. Only dignified,
  non-distressing images were used; close-ups of caskets were deliberately left
  out.
- **The hero video** — cut from the supplied `.mov`. Cropped clear of the
  TikTok watermark and promotional bars, trimmed, made to loop seamlessly, and
  stripped of audio. 1.3 MB, silent, and it never plays for anyone who has
  asked for reduced motion or is on a metered connection.

Anything **not** supplied — street address, operating hours, founding story,
staff names, qualifications, reviews — is shown as a clearly labelled
placeholder rather than guessed at. See [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md).

---

## Before it goes live

1. Work through [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md) with the
   business owner and confirm every detail.
2. In `src/content/site.ts`, set `proposal.isProposal` to `false`.
   This removes the preview banner and opens `robots.txt`.
3. In `src/app/layout.tsx`, delete the `robots: { index: false … }` block so the
   site can be indexed.
4. Connect the enquiry form to a real destination — see
   [`docs/IMPLEMENTATION-NOTES.md`](docs/IMPLEMENTATION-NOTES.md#connecting-the-enquiry-form).
5. Rebuild and redeploy.

Until step 2 and 3 are done the site will not appear in Google, which is
deliberate: the proposal must not compete with the business's real presence.
