import Image from "next/image";
import type { Metadata } from "next";

import { Button, Container, SectionHeading, Unconfirmed, Rule } from "@/components/ui";
import { ContactActions, RegionalNumbers } from "@/components/ContactActions";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/motion/SplitText";
import { SlowZoom } from "@/components/motion/Parallax";
import { DoveMark } from "@/components/icons";
import { about, business, regions } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Noko Funerals is a South African funeral services business serving families across North West, Limpopo and Gauteng. Learn who we are and how we work.",
};

/** A labelled placeholder for information the business has not yet supplied. */
function Placeholder({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-gold-600/40 bg-gold-500/[0.04] p-7">
      <Unconfirmed label="Content to be supplied" />
      <h3 className="mt-4 font-display text-xl text-ink-900">{title}</h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
        {children}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const branchCount = regions.reduce((n, r) => n + r.branches.length, 0);

  return (
    <>
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-16 text-ivory-100 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold-500/[0.07] blur-[110px]"
          style={{ animation: "noko-breathe 16s ease-in-out infinite" }}
        />
        <Container>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-8 bg-current opacity-60"
              />
              About us
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.5rem] leading-[1.1] sm:text-[3.25rem]">
              <SplitText text="The people who stand with a family on the day." immediate delay={180} />
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-200/80">
              {business.legalName} — {business.tagline.toLowerCase()}.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Introduction + portrait ──────────────────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <SectionHeading eyebrow="Who we are" title="Our story" />
              <p className="mt-7 text-lg leading-relaxed text-ink-700">
                {about.intro}
              </p>

              <Rule className="my-8 max-w-xl" />

              <div className="max-w-xl rounded-2xl border border-dashed border-gold-600/40 bg-gold-500/[0.04] p-6">
                <Unconfirmed label="Story to be supplied" />
                <p className="mt-3.5 leading-relaxed text-ink-600">
                  {about.storyPlaceholder}
                </p>
              </div>

              {/* Registration — stated as a fact, not dressed up as heritage */}
              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                    Registered company
                  </dt>
                  <dd className="mt-1.5 text-ink-800">
                    {business.legalName}
                    <span className="mt-0.5 block text-[0.9375rem] text-ink-500">
                      Registration {business.registrationNumber}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                    Branches
                  </dt>
                  <dd className="mt-1.5 text-ink-800">
                    {branchCount} branches across North West and Limpopo
                    <span className="mt-0.5 block text-[0.9375rem] text-ink-500">
                      with enquiry lines for Gauteng
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal variant="fade" delay={150} className="lg:col-span-5">
              <figure>
                <div className="overflow-hidden rounded-2xl">
                  <SlowZoom from={1.02} to={1.12}>
                  <Image
                    src="/photos/team-pair.webp"
                    alt="Two Noko Funerals staff members in uniform standing at a service."
                    width={1080}
                    height={1350}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-full w-full object-cover"
                  />
                  </SlowZoom>
                </div>
                <figcaption className="mt-3 text-[0.8125rem] text-ink-500">
                  Noko Funerals staff at a service.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="border-y border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What guides us"
              title="How we want every family to be treated."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-900/12 bg-ink-900/12 sm:grid-cols-2">
            {about.values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 90}
                className="bg-ivory-100 p-7 sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-gold-600"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ink-900">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-600">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Our team ─────────────────────────────────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Our team"
                title="The people you will meet."
                lead="Our staff attend every service in uniform and guide the proceedings on the day."
              />
            </Reveal>

            <Reveal delay={120} className="lg:col-span-7">
              {about.team.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {about.team.map((member) => (
                    <article
                      key={member.name}
                      className="rounded-2xl border border-ink-900/12 bg-white/50 p-6"
                    >
                      <h3 className="font-display text-xl text-ink-900">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-[0.875rem] uppercase tracking-[0.1em] text-gold-600">
                        {member.role}
                      </p>
                      {member.bio ? (
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">
                          {member.bio}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Placeholder title="Team members">
                    Names, roles and short introductions for the people the
                    business would like to feature — to be supplied by the
                    owner, with each person&rsquo;s permission to publish.
                  </Placeholder>
                  <Placeholder title="Qualifications and registrations">
                    Any professional registrations, memberships or
                    qualifications the business holds — to be supplied and
                    verified before they appear on the website.
                  </Placeholder>
                </div>
              )}

              <figure className="mt-8 overflow-hidden rounded-2xl">
                <Image
                  src="/photos/team-service.webp"
                  alt="Noko Funerals staff in uniform kneeling in a line at a graveside service."
                  width={640}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="h-[18rem] w-full object-cover object-top sm:h-[22rem]"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Brand ambassador ─────────────────────────────────────────────── */}
      {business.brandAmbassador ? (
        <section className="border-y border-ink-900/10 bg-ivory-200/50 py-16 sm:py-20">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="eyebrow">
                    {business.brandAmbassador.role}
                  </p>
                  <p className="mt-3 font-display text-3xl text-ink-900 sm:text-[2.25rem]">
                    {business.brandAmbassador.name}
                  </p>
                </div>
                <DoveMark className="h-6 w-16 shrink-0 text-gold-600" />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ── Facilities + reviews placeholders ───────────────────────────── */}
      <section className="bg-ivory-100 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Still to come"
              title="Sections waiting on the business."
              lead="These parts of the page are built and ready. They stay empty until Noko Funerals supplies the content, so that nothing on this website is invented."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal delay={60}>
              <Placeholder title="Our premises">
                Details of the offices, mortuary or chapel the business
                operates, with photographs, so families know where to come.
              </Placeholder>
            </Reveal>
            <Reveal delay={130}>
              <Placeholder title="Families we have served">
                Genuine reviews, published only with the family&rsquo;s written
                permission. No testimonials will be written on the
                business&rsquo;s behalf.
              </Placeholder>
            </Reveal>
            <Reveal delay={200}>
              <Placeholder title="Accreditations">
                Any industry body memberships, insurance underwriter details or
                regulatory registrations that should appear on the site.
              </Placeholder>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Where we are ─────────────────────────────────────────────────── */}
      <section className="border-t border-ink-900/10 bg-ivory-200/50 py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where to find us"
              title="Branches in the communities we serve."
              lead="Phone the office nearest to you."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <RegionalNumbers />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Closing contact ──────────────────────────────────────────────── */}
      <section className="on-ink grain relative overflow-hidden bg-ink-900 py-20 text-ivory-100 sm:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <DoveMark className="mx-auto h-6 w-16 text-gold-400" />
              <h2 className="mt-7 text-3xl sm:text-[2.5rem]">
                Talk to us about your family.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ivory-200/80">
                Whether you need help today or you are planning ahead, we will
                take the time to explain your options.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="mx-auto mt-10 max-w-2xl">
              <ContactActions tone="dark" />
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex justify-center">
              <Button
                href="/contact"
                variant="gold"
                withArrow
              >
                Request Assistance
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
