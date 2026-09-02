"use client";

import * as React from "react";
import { toast } from "sonner";

import { arrow, btn } from "@/lib/btn";
import { cn } from "@/lib/utils";

/**
 * Emporium's two lead forms, reproducing the field set the institute collects:
 *
 *   enquire — Name, Email, Phone Number, Location, Message
 *   apply   — the same, plus a CV upload ("Upload your CV for upcoming Jobs!")
 *
 * Submission is still local: it validates, then hands back a reference. Wire the
 * POST below to the Node API when the backend lands.
 */

const card =
  "rounded-[20px] bg-ticket px-[30px] py-8 text-ink shadow-[var(--shadow)] max-phablet:px-5 max-phablet:py-6";
const cardHead =
  "mb-5 flex items-center justify-between gap-3 font-mono text-[11px] font-bold tracking-[0.24em] text-crimson max-phablet:flex-wrap max-phablet:gap-2.5 max-phablet:text-[10px] max-phablet:tracking-[0.18em]";
const labelCls = "mb-1.5 block text-[13px] font-medium text-slate";
const fieldCls =
  "w-full rounded-[11px] border-[1.5px] border-hairline bg-white px-3.5 py-[13px] font-[inherit] text-[15px] text-ink transition-[border-color,box-shadow] duration-200 focus:border-sky focus:shadow-[0_0_0_4px_rgba(63,91,214,0.14)] focus:outline-none aria-invalid:border-crimson max-tablet:text-[16px]";
const errCls = "mt-1.5 font-mono text-[12.5px] text-crimson-deep";
/** A field inside a two-up row: the row owns the bottom margin, except once it stacks. */
const rowField = "max-narrow:mb-4";

/** What the institute's own upload field accepts. */
export const CV_ACCEPT = ".avif,.heif,.heics,.heifs,.doc,.docx,.pdf";
const CV_MAX_BYTES = 8 * 1024 * 1024;

export type FormVariant = "enquire" | "apply";

type Values = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

type Errors = Partial<Record<keyof Values | "cv", string>>;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  location: "",
  message: "",
};

/** Every field on the institute's form is required; formats are checked too. */
function validate(values: Values, variant: FormVariant, cv: File | null): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name";

  if (!values.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address";

  if (!values.phone.trim()) errors.phone = "Please enter your phone number";
  else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Enter a valid 10-digit mobile number";

  if (!values.location.trim()) errors.location = "Please enter your district and state";
  if (!values.message.trim()) errors.message = "Please enter a message";

  if (variant === "apply") {
    if (!cv) errors.cv = "Please attach your CV";
    else if (cv.size > CV_MAX_BYTES) errors.cv = "File must be 8 MB or smaller";
  }

  return errors;
}

/** Reference shown back to the candidate, e.g. EMP4K2QZ. */
function makeRef() {
  return `EMP${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function EnquiryForm({
  variant = "enquire",
  /** Course the visitor arrived from — shown as context, not a field. */
  subject,
  onDone,
}: {
  variant?: FormVariant;
  subject?: string;
  onDone?: () => void;
}) {
  const isApply = variant === "apply";

  const [values, setValues] = React.useState<Values>(empty);
  const [cv, setCv] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const set =
    (key: keyof Values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  function reset() {
    setRef(null);
    setValues(empty);
    setCv(null);
    setErrors({});
    if (fileInput.current) fileInput.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values, variant, cv);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);

    // TODO: POST to the Node API once the backend is wired up.
    // A multipart body is needed on the apply variant, for the CV.
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitting(false);
    setRef(makeRef());
    toast.success(
      isApply
        ? "Application received — our placement cell will be in touch."
        : "Enquiry received — our admissions team will call you shortly.",
    );
    onDone?.();
  }

  if (ref) {
    return (
      <div className={card}>
        <div className={cardHead}>
          <span>✓ {isApply ? "APPLICATION RECEIVED" : "ENQUIRY RECEIVED"}</span>
          <span>{ref}</span>
        </div>
        <div className="mt-2 rounded-[14px] bg-[#070c28] p-5.5 text-center text-white">
          <div className="font-mono text-[13px] tracking-[0.24em] text-green">
            ✓ {isApply ? "CV RECEIVED" : "SEAT CONFIRMED"}
          </div>
          <p className="mt-2 text-[14.5px] text-[#c8d2f4]">
            Thanks, {values.name.trim().split(" ")[0]}! Your{" "}
            {isApply ? "application" : "enquiry"}
            {subject ? ` for ${subject}` : ""} is logged (ref {ref}). Our{" "}
            {isApply ? "placement cell" : "admissions team"} will be in touch
            shortly.
          </p>
        </div>
        <button
          type="button"
          className={btn({ variant: "outline", block: "always", class: "mt-5" })}
          onClick={reset}
        >
          Send another {isApply ? "application" : "enquiry"}
        </button>
      </div>
    );
  }

  const id = (name: string) => `${variant}-${name}`;

  return (
    <div className={card}>
      <div className={cardHead}>
        <span>
          {isApply ? "⇪ APPLY · UPLOAD YOUR CV" : "✈ ENQUIRY · BOARDING PASS"}
        </span>
        <span className="text-right normal-case">{subject ?? "REF —"}</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor={id("name")} className={labelCls}>
            Name *
          </label>
          <input
            className={fieldCls}
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? id("name-err") : undefined}
          />
          {errors.name ? (
            <p className={errCls} id={id("name-err")}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3.5 max-narrow:mb-0 max-narrow:grid-cols-1 max-narrow:gap-0">
          <div className={rowField}>
            <label htmlFor={id("email")} className={labelCls}>
              Email *
            </label>
            <input
              className={fieldCls}
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? id("email-err") : undefined}
            />
            {errors.email ? (
              <p className={errCls} id={id("email-err")}>
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className={rowField}>
            <label htmlFor={id("phone")} className={labelCls}>
              Phone Number *
            </label>
            <input
              className={fieldCls}
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="Enter your phone"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? id("phone-err") : undefined}
            />
            {errors.phone ? (
              <p className={errCls} id={id("phone-err")}>
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor={id("location")} className={labelCls}>
            Location *
          </label>
          <input
            className={fieldCls}
            id={id("location")}
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="Enter your District, State in India"
            value={values.location}
            onChange={set("location")}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? id("location-err") : undefined}
          />
          {errors.location ? (
            <p className={errCls} id={id("location-err")}>
              {errors.location}
            </p>
          ) : null}
        </div>

        {isApply ? (
          <div className="mb-4">
            <label htmlFor={id("cv")} className={labelCls}>
              Upload your CV *
            </label>
            <div className="flex items-center gap-3 max-narrow:flex-col max-narrow:items-stretch">
              <input
                ref={fileInput}
                id={id("cv")}
                name="cv"
                type="file"
                accept={CV_ACCEPT}
                onChange={(event) => {
                  setCv(event.target.files?.[0] ?? null);
                  setErrors((prev) => ({ ...prev, cv: undefined }));
                }}
                aria-invalid={Boolean(errors.cv)}
                aria-describedby={errors.cv ? id("cv-err") : id("cv-hint")}
                className={cn(
                  fieldCls,
                  "cursor-pointer py-[9px] text-[14px]",
                  "file:mr-3 file:cursor-pointer file:rounded-[8px] file:border-0",
                  "file:bg-cloud file:px-3.5 file:py-2 file:font-heading",
                  "file:text-[13.5px] file:font-semibold file:text-royal",
                )}
              />
              {cv ? (
                <button
                  type="button"
                  className="flex-none font-mono text-[12.5px] text-crimson-deep underline underline-offset-2 max-narrow:text-left"
                  onClick={() => {
                    setCv(null);
                    if (fileInput.current) fileInput.current.value = "";
                  }}
                >
                  Delete uploaded file
                </button>
              ) : null}
            </div>
            {errors.cv ? (
              <p className={errCls} id={id("cv-err")}>
                {errors.cv}
              </p>
            ) : (
              <p className="mt-1.5 text-[12px] text-slate" id={id("cv-hint")}>
                PDF or Word document, up to 8 MB.
              </p>
            )}
          </div>
        ) : null}

        <div className="mb-4">
          <label htmlFor={id("message")} className={labelCls}>
            Message *
          </label>
          <textarea
            className={cn(fieldCls, "min-h-24 resize-y")}
            id={id("message")}
            name="message"
            rows={3}
            placeholder="Enter your message"
            value={values.message}
            onChange={set("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? id("message-err") : undefined}
          />
          {errors.message ? (
            <p className={errCls} id={id("message-err")}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className={btn({ block: "always", class: "mt-1.5" })}
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit"} <span className={arrow}>→</span>
        </button>
        <p className="mt-3.5 text-center text-[12px] text-slate">
          By submitting, you agree to be contacted by Emporium about admissions.
        </p>
      </form>
    </div>
  );
}
