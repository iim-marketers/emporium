"use client";

import * as React from "react";
import {
  CircleCheckBigIcon,
  FileTextIcon,
  LoaderCircleIcon,
  PaperclipIcon,
  PlaneIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { arrow, btn } from "@/lib/btn";
import { cn } from "@/lib/utils";

const cardSurface =
  "rounded-[20px] border border-hairline bg-ticket p-7 text-ink shadow-[var(--shadow)] max-phablet:p-5 max-phone:p-4";

const control =
  "bg-white text-ink rounded-xl placeholder:text-slate/55 focus-visible:ring-sky/20 aria-invalid:ring-destructive/15";
const inputCls = cn(control, "h-11 px-3.5");
const textareaCls = cn(control, "px-3.5 py-3");
const labelCls = "gap-1 text-[13.5px] font-medium text-ink";
const fieldCls = "gap-1.5";

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

/** Submit walks this in order to focus the first field that failed. */
const fieldOrder = [
  "name",
  "email",
  "phone",
  "location",
  "cv",
  "message",
] as const;

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  location: "",
  message: "",
};

function validate(
  values: Values,
  variant: FormVariant,
  cv: File | null,
): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name";

  if (!values.email.trim()) errors.email = "Please enter your email";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address";

  if (!values.phone.trim()) errors.phone = "Please enter your phone number";
  else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Enter a valid 10-digit mobile number";

  if (!values.location.trim())
    errors.location = "Please enter your district and state";
  if (!values.message.trim()) errors.message = "Please enter a message";

  if (variant === "apply") {
    if (!cv) errors.cv = "Please attach your CV";
    else if (cv.size > CV_MAX_BYTES) errors.cv = "File must be 8 MB or smaller";
  }

  return errors;
}

function makeRef() {
  return `EMP${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function formatSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1
    ? `${mb.toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function Req() {
  return (
    <span className="text-crimson" title="Required">
      *
    </span>
  );
}

export function EnquiryForm({
  variant = "enquire",
  subject,
  surface = "card",
  onDone,
}: {
  variant?: FormVariant;
  subject?: string;
  surface?: "card" | "bare";
  onDone?: () => void;
}) {
  const isApply = variant === "apply";
  const framed = surface === "card";

  const [values, setValues] = React.useState<Values>(empty);
  const [cv, setCv] = React.useState<File | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});
  const [ref, setRef] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const fileInput = React.useRef<HTMLInputElement>(null);

  const id = (name: string) => `${variant}-${name}`;

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

  function clearCv() {
    setCv(null);
    setErrors((prev) => ({ ...prev, cv: undefined }));
    if (fileInput.current) fileInput.current.value = "";
  }

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
      const first = fieldOrder.find((key) => found[key]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }

    setSubmitting(true);

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

  const fieldProps = (key: keyof Values) => ({
    id: id(key),
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? id(`${key}-err`) : undefined,
  });

  if (ref) {
    return (
      <div className={cn(framed && cardSurface)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-green/15 text-green">
            <CircleCheckBigIcon className="size-7" />
          </span>

          <div>
            <h3 className="font-heading text-[22px] font-semibold text-ink max-phablet:text-[20px]">
              {isApply ? "Application received" : "Enquiry received"}
            </h3>
            <p className="mx-auto mt-2 max-w-[42ch] text-[14.5px] text-slate">
              Thanks, {values.name.trim().split(" ")[0]}! Your{" "}
              {isApply ? "application" : "enquiry"}
              {subject ? ` for ${subject}` : ""} is logged. Our{" "}
              {isApply ? "placement cell" : "admissions team"} will be in touch
              shortly.
            </p>
          </div>

          <p className="flex items-center gap-2 rounded-full border border-hairline bg-white px-3.5 py-1.5">
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-slate uppercase">
              Ref
            </span>
            <span className="font-mono text-[13px] font-bold tracking-widest text-ink">
              {ref}
            </span>
          </p>

          <button
            type="button"
            className={btn({
              variant: "outline",
              size: "sm",
              block: "always",
              class: "mt-1",
            })}
            onClick={reset}
          >
            Send another {isApply ? "application" : "enquiry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(framed && cardSurface)}>
      {framed ? (
        <header className="mb-6 flex items-start gap-3.5 border-b border-hairline pb-5 max-phone:mb-4 max-phone:pb-4">
          <span className="grid size-10 flex-none place-items-center rounded-xl bg-royal/8 text-royal">
            {isApply ? (
              <PaperclipIcon className="size-4.5" />
            ) : (
              <PlaneIcon className="size-4.5" />
            )}
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-[17px] font-semibold text-ink">
              {isApply ? "Apply with your CV" : "Send us an enquiry"}
            </h3>
            <p className="mt-0.5 text-[13.5px] text-slate">
              {isApply
                ? "We shortlist against live drives and call you back."
                : "We reply within one working day. No cost, no obligation."}
            </p>
          </div>
        </header>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup className="gap-4 max-phone:gap-3.5">
          {subject && framed ? (
            <Badge
              variant="secondary"
              className="h-auto max-w-full py-1 pl-2.5 text-[12px] whitespace-normal"
            >
              {isApply ? "Applying for" : "Enquiring about"} · {subject}
            </Badge>
          ) : null}

          <Field className={fieldCls} data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor={id("name")} className={labelCls}>
              Full name <Req />
            </FieldLabel>
            <Input
              {...fieldProps("name")}
              type="text"
              autoComplete="name"
              placeholder="e.g. Ananya Sharma"
              className={inputCls}
            />
            <FieldError id={id("name-err")}>{errors.name}</FieldError>
          </Field>

          {/* Container queries, not media queries: this form renders in a wide
              page column and in a 560px dialog, so the pairing has to follow
              the form's own width rather than the viewport's. */}
          <div className="grid gap-4 max-phone:gap-3.5 @md/field-group:grid-cols-2">
            <Field className={fieldCls} data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor={id("email")} className={labelCls}>
                Email <Req />
              </FieldLabel>
              <Input
                {...fieldProps("email")}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputCls}
              />
              <FieldError id={id("email-err")}>{errors.email}</FieldError>
            </Field>

            <Field className={fieldCls} data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor={id("phone")} className={labelCls}>
                Phone number <Req />
              </FieldLabel>
              <Input
                {...fieldProps("phone")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile"
                className={inputCls}
              />
              <FieldError id={id("phone-err")}>{errors.phone}</FieldError>
            </Field>
          </div>

          <Field className={fieldCls} data-invalid={Boolean(errors.location)}>
            <FieldLabel htmlFor={id("location")} className={labelCls}>
              Location <Req />
            </FieldLabel>
            <Input
              {...fieldProps("location")}
              type="text"
              autoComplete="address-level2"
              placeholder="District, State"
              className={inputCls}
            />
            <FieldError id={id("location-err")}>{errors.location}</FieldError>
          </Field>

          {isApply ? (
            <Field className={fieldCls} data-invalid={Boolean(errors.cv)}>
              <FieldTitle className={labelCls}>
                Upload your CV <Req />
              </FieldTitle>

              <div>
                <input
                  ref={fileInput}
                  id={id("cv")}
                  name="cv"
                  type="file"
                  accept={CV_ACCEPT}
                  aria-label="Upload your CV"
                  aria-invalid={Boolean(errors.cv)}
                  aria-describedby={errors.cv ? id("cv-err") : id("cv-hint")}
                  onChange={(event) => {
                    setCv(event.target.files?.[0] ?? null);
                    setErrors((prev) => ({ ...prev, cv: undefined }));
                  }}
                  className="peer sr-only"
                />

                {cv ? (
                  <div className="flex items-center gap-3 rounded-xl border border-hairline bg-white p-2.5">
                    <span className="grid size-9 flex-none place-items-center rounded-lg bg-cloud text-royal">
                      <FileTextIcon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">
                        {cv.name}
                      </span>
                      <span className="block text-[12px] text-slate">
                        {formatSize(cv.size)}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={clearCv}
                      aria-label={`Remove ${cv.name}`}
                      className="grid size-8 flex-none cursor-pointer place-items-center rounded-lg text-slate transition-colors hover:bg-cloud hover:text-crimson-deep"
                    >
                      <XIcon className="size-4" />
                    </button>
                  </div>
                ) : (
                  /* The input is visually hidden but still focusable, so the ring
                       is mirrored onto this box via `peer-focus-visible`. */
                  <label
                    htmlFor={id("cv")}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-hairline bg-white/60 p-2.5",
                      "transition-colors hover:border-sky hover:bg-white",
                      "peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-sky/20",
                      "peer-aria-invalid:border-destructive",
                    )}
                  >
                    <span className="grid size-9 flex-none place-items-center rounded-lg bg-cloud text-royal">
                      <UploadIcon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-medium text-ink">
                        Choose a file
                      </span>
                      <span className="block text-[12px] text-slate">
                        PDF or Word, up to 8 MB
                      </span>
                    </span>
                  </label>
                )}
                <FieldDescription id={id("cv-hint")} className="sr-only">
                  PDF or Word document, up to 8 MB.
                </FieldDescription>
              </div>

              {errors.cv ? (
                <FieldError id={id("cv-err")}>{errors.cv}</FieldError>
              ) : null}
            </Field>
          ) : null}

          <Field className={fieldCls} data-invalid={Boolean(errors.message)}>
            <FieldLabel htmlFor={id("message")} className={labelCls}>
              Message <Req />
            </FieldLabel>
            <Textarea
              {...fieldProps("message")}
              rows={3}
              className={cn(
                textareaCls,
                isApply ? "min-h-16" : "min-h-24 max-phone:min-h-20",
              )}
              placeholder={
                isApply
                  ? "Tell us about your experience and the roles you are after."
                  : "Which course are you interested in, and when would you like to start?"
              }
            />
            <FieldError id={id("message-err")}>{errors.message}</FieldError>
          </Field>

          <div>
            <button
              type="submit"
              className={btn({ block: "always" })}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <LoaderCircleIcon className="size-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  {isApply ? "Submit application" : "Submit enquiry"}
                  <span className={arrow}>→</span>
                </>
              )}
            </button>
            <p className="mt-3.5 text-center text-[12px] text-slate">
              By submitting, you agree to be contacted by Emporium about
              admissions.
            </p>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
