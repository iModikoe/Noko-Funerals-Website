# Pre-launch checklist — information needed from Noko Funerals

Everything below is either **missing** or **taken from an undated flyer and needs
confirming**. The website is built and working; these are the gaps to close
before it goes live.

Each item says where it goes in `src/content/site.ts` so the change is a
one-line edit.

---

## 1. Must confirm — already on the site, needs verifying

These are live on the demo because the business supplied them, but they come
from marketing material with no date on it. Confirm each is still current.

| # | Item | Currently showing | Where |
| --- | --- | --- | --- |
| 1.1 | Six phone numbers across three provinces | North West `064 525 6577`, `061 503 3226` · Limpopo `064 525 3982`, `064 507 1318` · Gauteng `061 323 1696`, `064 507 0544` | `regions` |
| 1.2 | WhatsApp number | `+27 64 525 5956` | `contact.whatsapp` |
| 1.3 | Email address | `info@nokofunerals.co.za` | `contact.email` |
| 1.4 | Company registration number | `2020/444179/07` | `business.registrationNumber` |
| 1.5 | Package prices | Solo R50 · Platinum R249 · Diamond R349 per month | `packages` |
| 1.6 | What each package includes | 9–10 items per package | `packages[].includes` |
| 1.7 | Cash payout if service not rendered | R4 000 / R3 500 / R4 000 | `packages[].note` |
| 1.8 | Waiting periods | 6 months for new members · none for existing up-to-date policies · 24 months for suicide | `waitingPeriods` |
| 1.9 | Membership terms | No joining fee · no age limit · different surnames welcome | `membershipHighlights` |
| 1.10 | Branch towns | Mabeskraal, Mmatau, Delareyville, Tantanana (NW) · Botlokwa, Mokopane, Ga-Mashashane, Ga-Mphahlele (Limpopo) | `regions[].branches` |
| 1.11 | Optional extras list | Mobile toilets, freezer, brass band, doves, photography, live streaming, horses and bikes, gas stove, balloons | `extraServices` |
| 1.12 | Brand ambassador | Dr Winnie Mashaba — confirm the arrangement is current and that she may appear on the website | `business.brandAmbassador` |

**Ask specifically:**

- Is each phone number answered, and by whom?
- Which number should be the *main* one? The site currently leads with the first
  North West number everywhere.
- Are the prices still correct?

---

## 2. Missing — the site shows a placeholder until supplied

| # | Item | What the site shows now | Where |
| --- | --- | --- | --- |
| 2.1 | **Street address** for the head office or main branch | "Address to be confirmed", map section disabled | `contact.address.lines` |
| 2.2 | **Google Maps embed URL** for that address | A "Map to be added" panel | `contact.address.mapEmbedUrl` |
| 2.3 | **Operating hours** — and whether there is a 24-hour line | "Operating hours to be confirmed" | `contact.hours` |
| 2.4 | **Gauteng branch locations** — there are Gauteng numbers but no towns listed | "Branch locations to be confirmed" | `regions[2].branches` |
| 2.5 | **The business story** — who started it, when, and why | A labelled placeholder on the About page | `about.storyPlaceholder` |
| 2.6 | **Team members** — names, roles, short introductions | "Content to be supplied" cards | `about.team` |
| 2.7 | **Premises** — offices, mortuary, chapel, with photos | "Content to be supplied" card | `about.facilities` |
| 2.8 | **Reviews** — genuine, with each family's written permission | Nothing. No testimonials have been written | `about.testimonials` |
| 2.9 | **Social media links** — Facebook, Instagram, TikTok, X | Not shown | `contact.socials` |
| 2.10 | **Founding year** — the registration number suggests 2020, but that is the registration date, not necessarily when trading began | Not presented as a founding date | `about.registeredYear` |

---

## 3. Services to confirm or remove

Two services were included as *proposals* and are marked "Service details to be
confirmed" on the site. Confirm, complete or delete each.

| # | Proposed service | Action |
| --- | --- | --- |
| 3.1 | Memorial services (separate from the burial) | Confirm whether offered, and what it involves |
| 3.2 | Transport between provinces / repatriation | Confirm whether offered, and any limits |

One FAQ is also marked unconfirmed:

| # | Question | Needs |
| --- | --- | --- |
| 3.3 | "Do I have to be a member to use Noko Funerals?" | A definite answer — can a family arrange a once-off funeral without a package, and roughly what does that cost? |

---

## 4. Regulatory and legal — please check before launch

The packages are funeral **cover** products: monthly contributions, waiting
periods and a cash payout. In South Africa that is regulated. Before publishing,
confirm with the business (and, if needed, their compliance adviser):

| # | Item |
| --- | --- |
| 4.1 | Who **underwrites** the cover, and must the underwriter be named on the website? |
| 4.2 | Is the business an authorised **Financial Services Provider**, and must an FSP number appear on the site? |
| 4.3 | Are there **required disclosures** that must appear alongside the prices? |
| 4.4 | Full **terms and conditions** — the site currently states only what the flyer states |
| 4.5 | A **privacy / POPIA notice** — required once the enquiry form collects real personal information |
| 4.6 | Confirmation that the **supplied photographs** may be published on a public website, including any showing mourners |
| 4.7 | Confirmation that the **video clip** in the hero may be published, and that the staff and families visible in it consented. It was cut from a clip supplied with the brief that had been posted to TikTok |
| 4.8 | Any **music rights** issue is avoided — the audio track was removed entirely, so nothing from the original post is reused |

> The site deliberately does not claim anything beyond what the flyer says. It
> does not state the business is licensed, insured, accredited or a member of
> any association, because none of that was supplied.

---

## 5. Technical, at handover

| # | Item |
| --- | --- |
| 5.1 | Domain — `nokofunerals.co.za` appears on the flyer. Confirm who controls it |
| 5.2 | Where the enquiry form should send to: an email address, a WhatsApp number, or a CRM |
| 5.3 | Who receives enquiries, and how quickly can they respond? |
| 5.4 | Google Business Profile — link it to the site once live |
| 5.5 | Higher-resolution logo artwork, ideally vector (`.ai`, `.eps` or `.svg`), to replace the extracted PNGs |
| 5.6 | **The original video footage**, before it was uploaded to TikTok. The hero clip currently has to be cropped to 436×696 to clear the TikTok watermark and the promotional bars. Original footage would be sharper and could fill more of the screen |
| 5.7 | Any further footage worth using — a fleet departing, staff preparing, the premises |

---

## Quick sign-off

Once the above is done:

- [ ] Every item in section 1 confirmed by the owner
- [ ] Every item in section 2 supplied, or agreed to stay off the site
- [ ] Section 3 services confirmed or removed
- [ ] Section 4 checked with the business
- [ ] `proposal.isProposal` set to `false` in `src/content/site.ts`
- [ ] `robots` block removed from `src/app/layout.tsx`
- [ ] Enquiry form connected to a real destination and tested end to end
- [ ] Final read-through of every page by the owner
