export type FormVariant = "enquire" | "apply";

export type Values = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

export type Errors = Partial<Record<keyof Values | "cv", string>>;

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; message: string; errors?: Errors };

export const CV_ACCEPT = ".avif,.heif,.heics,.heifs,.doc,.docx,.pdf";

// Vercel caps function request bodies at 4.5 MB, including the rest of the form.
export const CV_MAX_BYTES = 4 * 1024 * 1024;

export const CV_MAX_LABEL = "4 MB";

export function validate(
  values: Values,
  variant: FormVariant,
  cv: { name: string; size: number } | null,
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
    const extension = cv?.name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
    if (!cv || cv.size === 0) errors.cv = "Please attach your CV";
    else if (!extension || !CV_ACCEPT.split(",").includes(extension))
      errors.cv = "Attach a PDF or Word document";
    else if (cv.size > CV_MAX_BYTES)
      errors.cv = `File must be ${CV_MAX_LABEL} or smaller`;
  }

  return errors;
}
