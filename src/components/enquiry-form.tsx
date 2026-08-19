"use client";

import * as React from "react";
import { toast } from "sonner";

import { arrow, btn } from "@/lib/btn";
import { programs } from "@/lib/programs";

const card =
  "rounded-[20px] bg-ticket px-[30px] py-8 text-ink shadow-[var(--shadow)] max-phablet:px-5 max-phablet:py-6";
const cardHead =
  "mb-5 flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.24em] text-crimson max-phablet:flex-wrap max-phablet:gap-2.5 max-phablet:text-[10px] max-phablet:tracking-[0.18em]";
const labelCls = "mb-1.5 block text-[13px] font-medium text-slate";
const fieldCls =
  "w-full rounded-[11px] border-[1.5px] border-hairline bg-white px-3.5 py-[13px] font-[inherit] text-[15px] text-ink transition-[border-color,box-shadow] duration-200 focus:border-sky focus:shadow-[0_0_0_4px_rgba(63,91,214,0.14)] focus:outline-none aria-invalid:border-crimson max-tablet:text-[16px]";
const errCls = "mt-1.5 font-mono text-[12.5px] text-crimson-deep";
/** A field inside a two-up row: the row owns the bottom margin, except once it stacks. */
const rowField = "max-narrow:mb-4";

const qualifications = [
  "12th pursuing",
  "12th pass",
  "Graduate",
  "Post graduate",
];

type Values = {
  name: string;
  phone: string;
  email: string;
  program: string;
  qualification: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = {
  name: "",
  phone: "",
  email: "",
  program: "",
  qualification: "",
};

/** Name, phone and program are required; format checks only fire on filled fields. */
function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Please enter your full name";
  if (!values.phone.trim()) errors.phone = "Please enter your phone number";
  else if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\D/g, "")))
    errors.phone = "Enter a valid 10-digit mobile number";
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address";
  if (!values.program) errors.program = "Choose a program";

  return errors;
}

/** Booking reference, e.g. EMP4K2QZ. */
function makePnr() {
  return `EMP${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export function EnquiryForm({ defaultProgram }: { defaultProgram?: string }) {
  const [values, setValues] = React.useState<Values>({
    ...empty,
    program: defaultProgram ?? "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [pnr, setPnr] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const set = (key: keyof Values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setSubmitting(true);

    // TODO: POST to the Node API once the backend is wired up.
    // await fetch("/api/enquiries", { method: "POST", body: JSON.stringify(values) })
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitting(false);
    setPnr(makePnr());
    toast.success("Seat reserved — our admissions team will call you shortly.");
  }

  if (pnr) {
    return (
      <div className={card}>
        <div className={cardHead}>
          <span>✓ ENQUIRY RECEIVED</span>
          <span>{pnr}</span>
        </div>
        <div className="mt-2 rounded-[14px] bg-[#070c28] p-5.5 text-center text-white">
          <div className="font-mono text-[13px] tracking-[0.24em] text-green">
            ✓ SEAT CONFIRMED
          </div>
          <p className="mt-2 text-[14.5px] text-[#c8d2f4]">
            Thanks, {values.name.trim().split(" ")[0]}! Your enquiry for{" "}
            {values.program} is logged (ref {pnr}). Our admissions team will call
            you shortly.
          </p>
        </div>
        <button
          type="button"
          className={btn({ variant: "outline", block: "always", class: "mt-5" })}
          onClick={() => {
            setPnr(null);
            setValues({ ...empty, program: defaultProgram ?? "" });
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={card}>
      <div className={cardHead}>
        <span>✈ ENQUIRY · BOARDING PASS</span>
        <span>PNR —</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="nm" className={labelCls}>Full name</label>
          <input
            className={fieldCls}

            id="nm"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "nm-err" : undefined}
          />
          {errors.name ? (
            <p className={errCls} id="nm-err">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3.5 max-narrow:mb-0 max-narrow:grid-cols-1 max-narrow:gap-0">
          <div className={rowField}>
            <label htmlFor="ph" className={labelCls}>Phone</label>
            <input
              className={fieldCls}

              id="ph"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              value={values.phone}
              onChange={set("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "ph-err" : undefined}
            />
            {errors.phone ? (
              <p className={errCls} id="ph-err">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className={rowField}>
            <label htmlFor="em" className={labelCls}>Email</label>
            <input
              className={fieldCls}

              id="em"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={values.email}
              onChange={set("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "em-err" : undefined}
            />
            {errors.email ? (
              <p className={errCls} id="em-err">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3.5 max-narrow:mb-0 max-narrow:grid-cols-1 max-narrow:gap-0">
          <div className={rowField}>
            <label htmlFor="prog" className={labelCls}>Program</label>
            <select
              className={fieldCls}
              id="prog"
              name="program"
              value={values.program}
              onChange={set("program")}
              aria-invalid={Boolean(errors.program)}
              aria-describedby={errors.program ? "prog-err" : undefined}
            >
              <option value="" disabled>
                Select a program
              </option>
              {programs.map((program) => (
                <option key={program.slug} value={program.title}>
                  {program.title}
                </option>
              ))}
            </select>
            {errors.program ? (
              <p className={errCls} id="prog-err">
                {errors.program}
              </p>
            ) : null}
          </div>

          <div className={rowField}>
            <label htmlFor="qual" className={labelCls}>Qualification</label>
            <select
              className={fieldCls}
              id="qual"
              name="qualification"
              value={values.qualification}
              onChange={set("qualification")}
            >
              <option value="" disabled>
                Select
              </option>
              {qualifications.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={btn({ block: "always", class: "mt-1.5" })}
          disabled={submitting}
        >
          {submitting ? "Reserving…" : "Reserve my seat"}{" "}
          <span className={arrow}>→</span>
        </button>
        <p className="mt-3.5 text-center text-[12px] text-slate">
          By submitting, you agree to be contacted by Emporium about admissions.
        </p>
      </form>
    </div>
  );
}
