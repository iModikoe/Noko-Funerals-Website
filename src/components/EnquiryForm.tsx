"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  contactMethods,
  enquiryTypes,
  packages,
  privacyNotice,
  proposal,
} from "@/content/site";
import { Button, Unconfirmed } from "./ui";
import { AlertIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { telHref, whatsappHref, whatsappOpener } from "@/lib/contact";
import { primaryPhone } from "@/content/site";

type Values = {
  name: string;
  method: string;
  phone: string;
  email: string;
  enquiryType: string;
  packageName: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: "",
  method: "phone",
  phone: "",
  email: "",
  enquiryType: "service",
  packageName: "",
  message: "",
};

/** Accepts the shapes South Africans actually type: 082…, 27…, +27…, with spaces. */
function isValidZaPhone(raw: string) {
  const digits = raw.replace(/[\s()-]/g, "");
  return /^(\+?27\d{9}|0\d{9})$/.test(digits);
}

function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

function validate(v: Values): Errors {
  const e: Errors = {};

  if (!v.name.trim()) {
    e.name = "Please tell us your name so we know who we are speaking to.";
  }

  if (!v.enquiryType) {
    e.enquiryType = "Please choose what your enquiry is about.";
  }

  if (v.method === "email") {
    if (!v.email.trim()) {
      e.email = "Please give us an email address so we can reply.";
    } else if (!isValidEmail(v.email)) {
      e.email = "That email address does not look complete. Please check it.";
    }
  } else {
    if (!v.phone.trim()) {
      e.phone = "Please give us a number we can reach you on.";
    } else if (!isValidZaPhone(v.phone)) {
      e.phone =
        "Please enter a 10-digit South African number, for example 082 123 4567.";
    }
  }

  return e;
}

export default function EnquiryForm({
  /** Pre-selects a package, e.g. when arriving from /plans?package=platinum */
  initialPackage,
  initialType,
}: {
  initialPackage?: string;
  initialType?: string;
}) {
  const uid = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Values | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const summaryRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  /* Carry a package name in from the plans page. */
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search);
    const pkgSlug = initialPackage ?? fromUrl.get("package") ?? "";
    const type = initialType ?? fromUrl.get("type") ?? "";
    const matched = packages.find((p) => p.slug === pkgSlug);

    if (matched || type) {
      setValues((v) => ({
        ...v,
        packageName: matched ? matched.name : v.packageName,
        enquiryType: matched ? "package" : type || v.enquiryType,
      }));
    }
  }, [initialPackage, initialType]);

  const field = (key: keyof Values) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      /* Once a field has been corrected, clear its error as the user types. */
      if (errors[key]) setErrors(validate(next));
    },
    onBlur: () => {
      setTouched((t) => ({ ...t, [key]: true }));
      setErrors(validate(values));
    },
  });

  const errorFor = (key: keyof Values) =>
    errors[key] && (touched[key] || submitted !== null) ? errors[key] : undefined;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(
      Object.fromEntries(Object.keys(values).map((k) => [k, true])),
    );

    if (Object.keys(found).length > 0) {
      setSubmitted(null);
      /* Move the user to the error summary so nothing is missed. */
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }

    /*
     * DEMO ONLY. Nothing is sent and nothing is stored — the values are held
     * in component state for the duration of this page view and previewed
     * back to the visitor. See docs/IMPLEMENTATION-NOTES.md for how to
     * connect this to a real destination.
     */
    setSubmitted(values);
    requestAnimationFrame(() => {
      previewRef.current?.focus();
    });
  }

  const errorList = Object.entries(errors) as [keyof Values, string][];
  const showErrorSummary =
    errorList.length > 0 && Object.keys(touched).length > 0;

  const selectedType = enquiryTypes.find((t) => t.value === values.enquiryType);
  const tel = telHref();
  const wa = whatsappHref(whatsappOpener());

  /* ── Submitted preview ──────────────────────────────────────────────── */
  if (submitted) {
    const method = contactMethods.find((m) => m.value === submitted.method);
    const type = enquiryTypes.find((t) => t.value === submitted.enquiryType);

    const rows: [string, string][] = [
      ["Name", submitted.name],
      ["Enquiry about", type?.label ?? submitted.enquiryType],
      ...(submitted.packageName
        ? ([["Package", submitted.packageName]] as [string, string][])
        : []),
      ["Preferred contact", method?.label ?? submitted.method],
      submitted.method === "email"
        ? ["Email", submitted.email]
        : ["Phone", submitted.phone],
      ...(submitted.message.trim()
        ? ([["Message", submitted.message.trim()]] as [string, string][])
        : []),
    ];

    return (
      <div
        ref={previewRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-gold-500/35 bg-white/70 p-6 sm:p-8"
      >
        <div className="flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700"
          >
            <CheckIcon className="text-[1rem]" />
          </span>
          <div>
            <h3 className="font-display text-2xl text-ink-900">
              This is what you filled in
            </h3>
            <p className="mt-1.5 text-[0.95rem] text-ink-600">
              <strong className="font-semibold text-ink-900">
                {proposal.formNotice}
              </strong>{" "}
              This preview shows what the business would receive once the form
              is connected.
            </p>
          </div>
        </div>

        <dl className="mt-7 divide-y divide-ink-900/8 border-y border-ink-900/8">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-ink-500">
                {label}
              </dt>
              <dd className="whitespace-pre-wrap text-ink-800">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-600">
          If you need help now, please phone or send a WhatsApp — those reach us
          directly.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {tel ? (
            <a
              href={tel}
              className="inline-flex items-center gap-2.5 rounded-full bg-ink-900 px-6 py-3.5 text-[0.9375rem] font-medium text-ivory-100 transition-colors hover:bg-ink-700"
            >
              <PhoneIcon /> Phone {primaryPhone?.display}
            </a>
          ) : null}
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-ink-900/20 px-6 py-3.5 text-[0.9375rem] font-medium text-ink-900 transition-colors hover:border-gold-500 hover:bg-gold-500/8"
            >
              <WhatsAppIcon /> WhatsApp us
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setSubmitted(null);
              setTouched({});
            }}
            className="inline-flex items-center rounded-full px-4 py-3.5 text-[0.9375rem] text-ink-600 underline decoration-gold-500 underline-offset-[6px] transition-colors hover:text-ink-900"
          >
            Edit these details
          </button>
        </div>
      </div>
    );
  }

  /* ── The form ───────────────────────────────────────────────────────── */
  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-7">
      {/* Error summary — focusable, so submitting with errors lands here */}
      {showErrorSummary ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-800/25 bg-red-50/80 p-4"
        >
          <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-red-900">
            <AlertIcon className="text-[1.1rem]" />
            Please check {errorList.length === 1 ? "this" : "these"}{" "}
            {errorList.length === 1 ? "detail" : "details"}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-9 text-[0.9375rem] text-red-900">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${uid}-${key}`} className="underline underline-offset-2">
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Name */}
      <Field
        label="Your name"
        id={`${uid}-name`}
        error={errorFor("name")}
        required
      >
        <input
          {...field("name")}
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={errorFor("name") ? true : undefined}
          aria-describedby={errorFor("name") ? `${uid}-name-error` : undefined}
          className={inputCls(Boolean(errorFor("name")))}
        />
      </Field>

      {/* Enquiry type */}
      <Field
        label="What is your enquiry about?"
        id={`${uid}-enquiryType`}
        error={errorFor("enquiryType")}
        required
      >
        <select
          {...field("enquiryType")}
          required
          aria-required="true"
          aria-invalid={errorFor("enquiryType") ? true : undefined}
          className={`${inputCls(Boolean(errorFor("enquiryType")))} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-12`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a5a64' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          {enquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      {/* Urgent nudge — phoning is faster than a form */}
      {selectedType && "urgent" in selectedType && selectedType.urgent ? (
        <div className="rounded-xl border border-gold-500/35 bg-gold-500/8 p-4">
          <p className="text-[0.9375rem] leading-relaxed text-ink-800">
            If someone has passed away, please phone us rather than wait for a
            reply to this form. We will answer and guide you from there.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {tel ? (
              <a
                href={tel}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[0.875rem] font-medium text-ivory-100 transition-colors hover:bg-ink-700"
              >
                <PhoneIcon /> {primaryPhone?.display}
              </a>
            ) : (
              <Unconfirmed label="Contact details to be confirmed" />
            )}
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-5 py-2.5 text-[0.875rem] font-medium text-ink-900 transition-colors hover:border-gold-600"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Package (shown when relevant) */}
      {values.enquiryType === "package" ? (
        <Field label="Which package?" id={`${uid}-packageName`}>
          <select
            {...field("packageName")}
            className={`${inputCls(false)} appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-12`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235a5a64' stroke-width='1.8' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="">I am not sure yet</option>
            {packages.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name} — {p.covers.toLowerCase()}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      {/* Preferred contact method */}
      <fieldset>
        <legend className="mb-3 block text-[0.9375rem] font-medium text-ink-900">
          How would you like us to reply?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {contactMethods.map((m) => {
            const checked = values.method === m.value;
            return (
              <label
                key={m.value}
                className={`cursor-pointer rounded-full border px-5 py-2.5 text-[0.9375rem] transition-all duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-gold-500 ${
                  checked
                    ? "border-gold-500 bg-gold-500/12 font-medium text-ink-900"
                    : "border-ink-900/15 text-ink-600 hover:border-ink-900/35"
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-method`}
                  value={m.value}
                  checked={checked}
                  onChange={() => {
                    const next = { ...values, method: m.value };
                    setValues(next);
                    setErrors(validate(next));
                  }}
                  className="sr-only"
                />
                {m.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Phone or email, depending on the chosen method */}
      {values.method === "email" ? (
        <Field
          label="Your email address"
          id={`${uid}-email`}
          error={errorFor("email")}
          required
        >
          <input
            {...field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errorFor("email") ? true : undefined}
            aria-describedby={
              errorFor("email") ? `${uid}-email-error` : undefined
            }
            className={inputCls(Boolean(errorFor("email")))}
          />
        </Field>
      ) : (
        <Field
          label={
            values.method === "whatsapp"
              ? "Your WhatsApp number"
              : "Your phone number"
          }
          id={`${uid}-phone`}
          error={errorFor("phone")}
          hint="For example 082 123 4567"
          required
        >
          <input
            {...field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={errorFor("phone") ? true : undefined}
            aria-describedby={`${
              errorFor("phone") ? `${uid}-phone-error ` : ""
            }${uid}-phone-hint`}
            className={inputCls(Boolean(errorFor("phone")))}
          />
        </Field>
      )}

      {/* Message */}
      <Field label="Anything you would like us to know" id={`${uid}-message`}>
        <textarea
          {...field("message")}
          rows={4}
          className={`${inputCls(false)} resize-y`}
        />
      </Field>

      {/* Privacy notice */}
      <div className="rounded-xl border border-ink-900/10 bg-ivory-200/60 p-4">
        <p className="text-[0.875rem] leading-relaxed text-ink-600">
          {privacyNotice}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" className="w-full sm:w-auto" withArrow>
          Send enquiry
        </Button>
        {proposal.isProposal ? (
          <p className="text-[0.875rem] text-ink-500">
            {proposal.formNotice}
          </p>
        ) : null}
      </div>
    </form>
  );
}

/* ─── Field shell: label, hint, control and error, wired together ─────────── */

function Field({
  label,
  id,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.9375rem] font-medium text-ink-900"
      >
        {label}
        {required ? (
          <span className="ml-1.5 text-gold-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.8125rem] font-normal text-ink-500">
            (optional)
          </span>
        )}
      </label>

      {children}

      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-ink-500">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.875rem] font-medium text-red-800"
        >
          <AlertIcon className="mt-0.5 text-[0.95rem]" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-xl border bg-white/70 px-4 py-3.5 text-[1rem] text-ink-900 transition-colors duration-200 placeholder:text-ink-400 ${
    hasError
      ? "border-red-700/60 bg-red-50/50"
      : "border-ink-900/15 hover:border-ink-900/30 focus:border-gold-500"
  }`;
}
