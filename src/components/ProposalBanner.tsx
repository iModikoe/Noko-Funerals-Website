import { proposal } from "@/content/site";

/**
 * The site-wide proposal label.
 *
 * Discreet but always present, so nobody mistakes the demo for the live
 * business site. Set `proposal.isProposal` to false in src/content/site.ts
 * to remove it everywhere.
 */
export default function ProposalBanner() {
  if (!proposal.isProposal) return null;

  return (
    <div
      data-no-print
      className="border-b border-ink-700/60 bg-ink-950 text-ivory-200"
    >
      <p className="mx-auto flex max-w-[88rem] items-center justify-center gap-2.5 px-5 py-2 text-center text-[0.75rem] leading-snug tracking-wide sm:px-8">
        <span
          aria-hidden="true"
          className="hidden h-1 w-1 shrink-0 rounded-full bg-gold-400 sm:inline-block"
        />
        {proposal.banner}
      </p>
    </div>
  );
}
