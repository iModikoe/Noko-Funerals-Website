import { faqs, type FaqTopic } from "@/content/site";
import { Unconfirmed } from "./ui";
import { PlusIcon } from "./icons";

/**
 * FAQs built on native <details>/<summary> — keyboard accessible and
 * expandable without JavaScript, which matters on a slow connection.
 *
 * `topic` picks which set to show: the general questions on the home page,
 * the cover and payment questions on the packages page.
 */
export default function FaqList({
  limit,
  topic,
}: {
  limit?: number;
  topic?: FaqTopic;
}) {
  const pool = topic ? faqs.filter((f) => f.topic === topic) : faqs;
  const items = limit ? pool.slice(0, limit) : pool;

  return (
    <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
      {items.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-gold-700">
            <span className="font-display text-xl leading-snug text-ink-900 sm:text-[1.375rem] group-hover:text-gold-700">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-900/15 text-ink-600 transition-all duration-300 group-open:rotate-45 group-open:border-gold-500 group-open:bg-gold-500/10 group-open:text-gold-700"
            >
              <PlusIcon className="text-[0.9rem]" />
            </span>
          </summary>

          <div className="pb-6 pr-12">
            <p className="max-w-2xl leading-relaxed text-ink-600">
              {faq.answer}
            </p>
            {faq.status === "unconfirmed" ? (
              <Unconfirmed label="Answer to be confirmed" className="mt-3" />
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
