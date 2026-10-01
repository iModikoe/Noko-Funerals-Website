/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NOKO FUNERALS — SINGLE SOURCE OF TRUTH FOR ALL BUSINESS CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Everything the business owns — contact numbers, branches, services,
 *  packages, FAQs and page copy — lives in this one file. Edit here and the
 *  whole website updates. No other file needs to be touched to correct a
 *  phone number, add a branch or change a package.
 *
 *  ── HOW `status` WORKS ───────────────────────────────────────────────────
 *  Every item carries a status:
 *
 *    "confirmed"   Taken from material the business supplied (the packages
 *                  flyer and the branch-locations graphic). Rendered normally.
 *
 *    "unconfirmed" A proposed item we have NOT verified with the business.
 *                  The site automatically renders a visible
 *                  "details to be confirmed" marker. Nothing is claimed.
 *
 *  Change a status to "confirmed" once the owner has verified the detail.
 *  Delete any proposed item the business does not actually offer.
 *
 *  ── WHAT MUST NOT HAPPEN HERE ────────────────────────────────────────────
 *  Never add a phone number, address, price, waiting period, statistic,
 *  qualification, award or testimonial that the business has not supplied
 *  in writing. Placeholders are safer than guesses.
 */

export type Status = "confirmed" | "unconfirmed";

/* ═══════════════════════════════════════════════════════════════════════════
   1. BUSINESS IDENTITY
   ═══════════════════════════════════════════════════════════════════════════ */

export const business = {
  name: "Noko Funerals",
  legalName: "Noko Funerals (Pty) Ltd",
  /** Company registration number — from the supplied packages flyer. */
  registrationNumber: "2020/444179/07",
  tagline: "For a Dignified Send Off",
  /** Used for page titles and the canonical domain. */
  domain: "nokofunerals.co.za",
  /**
   * The brand ambassador named on the supplied flyer. Set to null to remove
   * this from the site entirely.
   */
  brandAmbassador: {
    name: "Dr Winnie Mashaba",
    role: "Brand Ambassador",
    status: "confirmed" as Status,
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   2. CONTACT DETAILS
   ═══════════════════════════════════════════════════════════════════════════

   Phone numbers come from the supplied flyer, grouped by province.
   `tel` must be the E.164 form (no spaces) — it powers click-to-call.
   `display` is what visitors read.

   To disable a contact action, set its value to null. The site will show
   "Contact details to be confirmed" and disable the button rather than
   render a broken or invented link.
   ═══════════════════════════════════════════════════════════════════════════ */

export type PhoneLine = {
  display: string;
  tel: string;
  status: Status;
};

export type RegionContact = {
  region: string;
  /** Towns where the business has said it operates. */
  branches: string[];
  lines: PhoneLine[];
  status: Status;
  /** Shown when a region has enquiry lines but no confirmed branch list. */
  note?: string;
};

export const regions: RegionContact[] = [
  {
    region: "North West",
    branches: ["Mabeskraal", "Mmatau", "Delareyville", "Tantanana"],
    status: "confirmed",
    lines: [
      { display: "+27 64 525 6577", tel: "+27645256577", status: "confirmed" },
      { display: "+27 61 503 3226", tel: "+27615033226", status: "confirmed" },
    ],
  },
  {
    region: "Limpopo",
    branches: ["Botlokwa", "Mokopane", "Ga-Mashashane", "Ga-Mphahlele"],
    status: "confirmed",
    lines: [
      { display: "+27 64 525 3982", tel: "+27645253982", status: "confirmed" },
      { display: "+27 64 507 1318", tel: "+27645071318", status: "confirmed" },
    ],
  },
  {
    region: "Gauteng",
    branches: [],
    status: "confirmed",
    note: "Branch locations to be confirmed",
    lines: [
      { display: "+27 61 323 1696", tel: "+27613231696", status: "confirmed" },
      { display: "+27 64 507 0544", tel: "+27645070544", status: "confirmed" },
    ],
  },
];

export const contact = {
  /** The number used by the WhatsApp buttons across the site. */
  whatsapp: {
    display: "+27 64 525 5956",
    /** wa.me format: country code + number, digits only. */
    waNumber: "27645255956",
    status: "confirmed" as Status,
  },
  email: {
    display: "info@nokofunerals.co.za",
    status: "confirmed" as Status,
  },
  /**
   * Head-office street address. The business has not supplied one, so the
   * site shows a placeholder and no map. Fill `lines` and set status to
   * "confirmed" to switch the location section on.
   */
  address: {
    lines: [] as string[],
    /** Paste a Google Maps embed URL here to enable the map. */
    mapEmbedUrl: null as string | null,
    status: "unconfirmed" as Status,
  },
  /**
   * Operating hours have NOT been supplied. Leave as null — do not guess.
   * Many funeral businesses operate a 24-hour line, but we will not claim
   * that until the owner confirms it.
   */
  hours: null as string | null,
  socials: [] as { label: string; href: string }[],
};

/** Every confirmed phone line, flattened — used by the "call now" lists. */
export const allPhoneLines = regions.flatMap((r) =>
  r.lines.map((l) => ({ ...l, region: r.region })),
);

export const primaryPhone = allPhoneLines[0] ?? null;

/* ═══════════════════════════════════════════════════════════════════════════
   3. SERVICES
   ═══════════════════════════════════════════════════════════════════════════

   "confirmed" services are those itemised in the packages flyer.
   "unconfirmed" services are proposals for the business to approve.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  includes: string[];
  status: Status;
  image?: { src: string; width: number; height: number; alt: string };
};

export const services: Service[] = [
  {
    slug: "funeral-arrangements",
    title: "Funeral arrangements",
    summary:
      "We handle the arrangements from start to finish, so your family can be together instead of running between offices.",
    detail:
      "Our team takes care of the planning and the paperwork that a funeral requires. We will talk you through each decision, explain what it involves, and keep you updated as things are confirmed.",
    includes: [
      "Full funeral arrangement",
      "Grave marker",
      "Grave decor",
      "Programme printing",
    ],
    status: "confirmed",
    image: {
      src: "/photos/team-care.webp",
      width: 1080,
      height: 1350,
      alt: "A Noko Funerals staff member standing quietly with a hand placed over her heart.",
    },
  },
  {
    slug: "caskets",
    title: "Caskets and casket spread",
    summary:
      "A casket and casket spread are included in every package, with options to choose from.",
    detail:
      "You are welcome to see what is available and choose what feels right for your loved one. A member of our team will show you the options included in your package and anything you may wish to add.",
    includes: ["Casket", "Casket spread"],
    status: "confirmed",
    image: {
      src: "/photos/blanket.webp",
      width: 1080,
      height: 1350,
      alt: "A traditional blanket being laid over a polished wooden casket by a Noko Funerals staff member.",
    },
  },
  {
    slug: "transport",
    title: "Hearse and family transport",
    summary:
      "A hearse and a family car are included, along with collection and transport to the burial.",
    detail:
      "We collect your loved one and carry them with care. On the day, the hearse and family car travel together so that your family arrives without worrying about arrangements.",
    includes: [
      "Hearse",
      "One family car",
      "Collection transport",
      "Burial transport",
    ],
    status: "confirmed",
    image: {
      src: "/photos/fleet-road.webp",
      width: 1440,
      height: 1078,
      alt: "Noko Funerals branded vehicles travelling together on a road.",
    },
  },
  {
    slug: "burial-services",
    title: "Burial services",
    summary:
      "Support on the day itself — the grave, the service at the graveside and the people who guide it.",
    detail:
      "Our staff are present on the day to guide the proceedings with care and order, so that the service runs the way your family intends it to.",
    includes: ["Grave marker", "Grave decor", "Graveside support"],
    status: "confirmed",
    image: {
      src: "/photos/team-umbrellas.webp",
      width: 640,
      height: 800,
      alt: "Noko Funerals staff in uniform walking together holding branded umbrellas.",
    },
  },
  {
    slug: "home-support",
    title: "Support at the family home",
    summary:
      "A payout toward a tent and chairs, groceries and condolences, so the home is ready to receive people.",
    detail:
      "Families gather at the home in the days before a funeral. Each package includes a contribution toward a tent and seating, a grocery voucher and a condolence payout, to ease some of the cost of hosting.",
    includes: [
      "Payout toward a home tent and 50 chairs",
      "Grocery voucher",
      "Condolence payout",
    ],
    status: "confirmed",
    image: {
      src: "/photos/team-service.webp",
      width: 640,
      height: 800,
      alt: "Noko Funerals staff in uniform kneeling in a line on a red carpet at a service.",
    },
  },
  {
    slug: "memorial-services",
    title: "Memorial services",
    summary:
      "A separate memorial or remembrance gathering, held apart from the burial.",
    detail:
      "Some families choose to hold a memorial service in addition to the burial. Speak to us about what you have in mind and we will tell you what we can arrange.",
    includes: [],
    status: "unconfirmed",
  },
  {
    slug: "repatriation",
    title: "Transport between provinces",
    summary:
      "Bringing a loved one home when they have passed away far from where they will be buried.",
    detail:
      "Families are often spread across provinces. Ask us what is possible for the route you need.",
    includes: [],
    status: "unconfirmed",
  },
];

/* ─── Additional services, charged separately ─────────────────────────────
   Listed on the supplied flyer under "Other Services Rendered at a Price".
   These are not included in a package — they are quoted on request.        */

export type ExtraService = { label: string; status: Status };

export const extraServices: ExtraService[] = [
  { label: "Mobile toilets", status: "confirmed" },
  { label: "Mobile freezer", status: "confirmed" },
  { label: "Brass band", status: "confirmed" },
  { label: "Releasing of doves", status: "confirmed" },
  { label: "Videographer and photography", status: "confirmed" },
  { label: "Video live streaming and recording", status: "confirmed" },
  { label: "Horses and bikes", status: "confirmed" },
  { label: "Gas stove", status: "confirmed" },
  { label: "Lithium balloons", status: "confirmed" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   4. PACKAGES
   ═══════════════════════════════════════════════════════════════════════════

   Taken directly from the packages flyer supplied by the business.

   IMPORTANT: The flyer itself carries the note "Prices are subject to change.
   Ts & Cs Apply", and it is undated. Every price and term below is therefore
   presented on the site as subject to confirmation. Verify with the owner
   before the site goes live.
   ═══════════════════════════════════════════════════════════════════════════ */

export type Package = {
  slug: string;
  name: string;
  /** How many people the package covers. */
  covers: string;
  /** Monthly contribution, or null to render "Request pricing". */
  price: { amount: string; period: string } | null;
  /** A short line to help a family pick. */
  suitedTo: string;
  includes: string[];
  /** Package-specific terms, shown in the small print of the card. */
  note?: string;
  featured?: boolean;
  status: Status;
};

export const packages: Package[] = [
  {
    slug: "solo",
    name: "Solo Package",
    covers: "Covers 1 member",
    price: { amount: "R50", period: "per month" },
    suitedTo: "For one person on their own.",
    status: "confirmed",
    includes: [
      "Casket and casket spread",
      "Hearse",
      "One family car",
      "R1 000 payout for a home tent and 50 chairs",
      "70 colour programmes",
      "Collection and burial transport",
      "All funeral arrangements, including grave marker and grave decor",
      "R1 000 condolences",
      "R100 airtime",
      "R1 000 grocery voucher",
    ],
    note: "A cash payout of R4 000 applies if the service is not rendered by Noko Funerals.",
  },
  {
    slug: "platinum",
    name: "Platinum Package",
    covers: "Covers 5 members",
    price: { amount: "R249", period: "per month" },
    suitedTo: "For a household of up to five.",
    featured: true,
    status: "confirmed",
    includes: [
      "Casket and casket spread",
      "Hearse",
      "One family car",
      "R1 000 payout for a home tent and 50 chairs",
      "60 colour programmes",
      "Collection and burial transport",
      "All funeral arrangements, including grave marker and grave decor",
      "R1 000 condolences",
      "R1 000 grocery voucher",
    ],
    note: "A cash payout of R3 500 applies if the service is not rendered by Noko Funerals.",
  },
  {
    slug: "diamond",
    name: "Diamond Package",
    covers: "Covers 8 members",
    price: { amount: "R349", period: "per month" },
    suitedTo: "For a larger extended family.",
    status: "confirmed",
    includes: [
      "Casket and casket spread",
      "Hearse",
      "One family car",
      "R1 000 payout for a home tent and 50 chairs",
      "70 colour programmes",
      "Collection and burial transport",
      "All funeral arrangements, including grave marker and grave decor",
      "R1 000 condolences",
      "R100 airtime",
      "R1 000 grocery voucher",
    ],
    note: "A cash payout of R4 000 applies if the service is not rendered by Noko Funerals.",
  },
];

/** Membership points the flyer highlights as badges. */
export const membershipHighlights: { label: string; status: Status }[] = [
  { label: "No joining fee", status: "confirmed" },
  { label: "No age limit", status: "confirmed" },
  { label: "Different surnames welcome", status: "confirmed" },
  { label: "Customised plans on request", status: "confirmed" },
];

/**
 * Waiting periods, exactly as stated on the supplied flyer.
 * Do not paraphrase these in a way that changes their meaning.
 */
export const waitingPeriods: { text: string; status: Status }[] = [
  {
    text: "Cover for the death benefit is subject to a six-month waiting period for new members.",
    status: "confirmed",
  },
  {
    text: "There is no waiting period for a member with an existing policy that is up to date.",
    status: "confirmed",
  },
  {
    text: "A 24-month waiting period applies in the case of suicide.",
    status: "confirmed",
  },
];

export const packagesSmallPrint =
  "Prices are subject to change and terms and conditions apply. The figures above are taken from the current Noko Funerals packages flyer and must be confirmed with the office before you sign up.";

/* ═══════════════════════════════════════════════════════════════════════════
   5. ABOUT — story, values and team
   ═══════════════════════════════════════════════════════════════════════════

   Only what the business has supplied appears here. Founding dates, staff
   names, qualifications, awards, customer numbers and testimonials have NOT
   been supplied and are deliberately left as placeholders.
   ═══════════════════════════════════════════════════════════════════════════ */

export const about = {
  /**
   * Registration year is inferred ONLY from the company registration number
   * (2020/444179/07), which encodes the year of registration. Confirm before
   * presenting it as a founding date.
   */
  registeredYear: { value: "2020", status: "unconfirmed" as Status },

  intro:
    "Noko Funerals is a South African funeral services business serving families across North West, Limpopo and Gauteng. We carry a family through the days between a death and a burial — the arrangements, the transport, the paperwork and the practical help at home — so that they are free to grieve together.",

  storyPlaceholder:
    "The full story of how Noko Funerals began — who started it, why, and what the business set out to do differently — is to be supplied by the owner.",

  values: [
    {
      title: "Dignity",
      body: "Every family is received the same way and every service is carried out with the same care, whatever package they are on.",
    },
    {
      title: "Presence",
      body: "Our staff are there on the day, in uniform, guiding the proceedings so that a family does not have to manage the details themselves.",
    },
    {
      title: "Clarity",
      body: "We explain what is included and what is not, before you commit to anything. You should never be uncertain about what you have arranged.",
    },
    {
      title: "Community",
      body: "We work out of the towns we serve, so the people arranging a funeral for your family are people from your area.",
    },
  ],

  /**
   * No staff names, roles or qualifications have been supplied.
   * Add entries here once the owner provides them, with permission to publish.
   */
  team: [] as { name: string; role: string; bio?: string }[],

  /**
   * No facility details (premises, mortuary, chapel) have been supplied.
   */
  facilities: [] as { title: string; body: string }[],

  /**
   * Reviews stay empty until the business supplies genuine, approved
   * testimonials with the family's permission to publish.
   */
  testimonials: [] as { quote: string; attribution: string }[],
};

/* ═══════════════════════════════════════════════════════════════════════════
   6. FAQs
   ═══════════════════════════════════════════════════════════════════════════ */

export type FaqTopic = "general" | "packages";

export type Faq = {
  question: string;
  answer: string;
  status: Status;
  /** Which page the question belongs on. */
  topic: FaqTopic;
};

export const faqs: Faq[] = [
  /* ── General ────────────────────────────────────────────────────────── */
  {
    topic: "general",
    question: "Someone has just passed away. What should I do first?",
    answer:
      "Phone us on the number for your province, or send us a WhatsApp. Tell us where your loved one is and we will explain what happens next and what we need from you. You do not need to have anything prepared before you call.",
    status: "confirmed",
  },
  {
    topic: "general",
    question: "What should I have ready when I phone?",
    answer:
      "Nothing in particular. It helps if you know where your loved one is and have a number we can reach you on. We will tell you what else is needed once we are speaking.",
    status: "unconfirmed",
  },
  {
    topic: "general",
    question: "Do I have to be a member to use Noko Funerals?",
    answer:
      "Speak to us about what you need. We arrange funerals for families on one of our packages, and we can also quote for a funeral arranged on its own. Phone or WhatsApp us and we will talk it through.",
    status: "unconfirmed",
  },
  {
    topic: "general",
    question: "Which areas do you serve?",
    answer:
      "We have branches in Mabeskraal, Mmatau, Delareyville and Tantanana in North West, and in Botlokwa, Mokopane, Ga-Mashashane and Ga-Mphahlele in Limpopo. We also have enquiry lines for Gauteng.",
    status: "confirmed",
  },
  {
    topic: "general",
    question: "Can you help if we are outside those towns?",
    answer:
      "Phone us and tell us where you are. We will be straight with you about what we can and cannot do for that area.",
    status: "unconfirmed",
  },
  {
    topic: "general",
    question: "Can we come and see you in person?",
    answer:
      "Yes. Phone the office nearest to you first so that someone is expecting you and can give you the directions.",
    status: "unconfirmed",
  },
  {
    topic: "general",
    question: "What else can be arranged on the day?",
    answer:
      "Beyond what is in a package, we can arrange mobile toilets, a mobile freezer, a brass band, the releasing of doves, photography and videography, live streaming, horses and bikes, a gas stove and balloons. These are quoted separately.",
    status: "confirmed",
  },
  {
    topic: "general",
    question: "What does a funeral with Noko Funerals cost?",
    answer:
      "Our monthly packages start at R50 a month for one member. What a funeral costs beyond a package depends on what you choose. Phone or WhatsApp us and we will give you a clear answer for your situation.",
    status: "confirmed",
  },

  /* ── Packages and cover ─────────────────────────────────────────────── */
  {
    topic: "packages",
    question: "Is there a waiting period before the cover pays out?",
    answer:
      "Yes. Cover for the death benefit is subject to a six-month waiting period for new members. There is no waiting period for a member with an existing policy that is up to date, and a 24-month waiting period applies in the case of suicide. Confirm the current terms with our office before you sign up.",
    status: "confirmed",
  },
  {
    topic: "packages",
    question: "Is there a joining fee, or an age limit?",
    answer:
      "No to both. There is no joining fee, and there is no age limit on our packages.",
    status: "confirmed",
  },
  {
    topic: "packages",
    question: "Can I put family members with different surnames on one package?",
    answer:
      "Yes. Our packages allow members with different surnames.",
    status: "confirmed",
  },
  {
    topic: "packages",
    question: "Can a package be adjusted for my family?",
    answer:
      "Yes. A customised plan is welcome. Tell us who you need to cover and what matters to you, and we will put something together.",
    status: "confirmed",
  },
  {
    topic: "packages",
    question: "What is the cash payout listed on each package?",
    answer:
      "If the funeral service is not rendered by Noko Funerals, a cash amount is paid out instead: R4 000 on the Solo and Diamond packages, and R3 500 on the Platinum package.",
    status: "confirmed",
  },
  {
    topic: "packages",
    question: "How do I sign up, and how are the monthly payments made?",
    answer:
      "Phone or WhatsApp the office nearest to you and we will take you through it.",
    status: "unconfirmed",
  },
  {
    topic: "packages",
    question: "What happens if I miss a monthly payment?",
    answer:
      "Please ask our office about this before you sign up, so that you know exactly where you stand.",
    status: "unconfirmed",
  },
  {
    topic: "packages",
    question: "Can I add someone to my package later on?",
    answer:
      "Speak to our office about adding a member. They will tell you what it means for your contribution and whether a waiting period applies to that person.",
    status: "unconfirmed",
  },
  {
    topic: "packages",
    question: "Does a package include a tombstone?",
    answer:
      "A grave marker and grave decor are included in every package. A tombstone is a separate thing — ask our office what they can arrange and what it would cost.",
    status: "unconfirmed",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   7. ENQUIRY FORM OPTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

export const enquiryTypes = [
  {
    value: "immediate",
    label: "Immediate assistance — someone has passed away",
    urgent: true,
  },
  { value: "service", label: "Service enquiry" },
  { value: "package", label: "Package enquiry" },
  { value: "other", label: "Something else" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   8. PROPOSAL SETTINGS
   ═══════════════════════════════════════════════════════════════════════════

   These control the demo-only behaviour. Before handing the site over:
     • set `isProposal` to false to remove the preview banner
     • remove the noindex flag in src/app/layout.tsx
     • connect the enquiry form to a real destination
   ═══════════════════════════════════════════════════════════════════════════ */

export const proposal = {
  /*
   * Turns off the site-wide preview strip and the footer line. The honest
   * parts of the proposal do NOT depend on this: the per-item
   * "to be confirmed" markers are driven by each item's own `status`, the
   * enquiry form still states plainly that it sends nothing, and the pages
   * are still `noindex` (see src/app/layout.tsx).
   */
  isProposal: false,
  banner: "Website proposal preview — business details subject to confirmation.",
  formNotice: "Demo only — your enquiry has not been sent.",
};

/** Shown above the enquiry form, and anywhere personal detail is invited. */
export const privacyNotice =
  "Please do not send identity numbers, medical details, death certificates or other sensitive documents through this form. We will tell you what is needed once we are in contact with you.";
