"use server";

import { randomBytes } from "crypto";

import config from "@payload-config";
import { getPayload } from "payload";

import {
  type FormVariant,
  type SubmitResult,
  type Values,
  validate,
} from "@/lib/submissions";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, 5000) : "";
}

function makeRef() {
  const id = randomBytes(4).readUInt32BE().toString(36).padStart(6, "0");
  return `EMP${id.slice(-6).toUpperCase()}`;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function submitForm(formData: FormData): Promise<SubmitResult> {
  const variant: FormVariant =
    formData.get("variant") === "apply" ? "apply" : "enquire";

  /** Hidden from people, so only bots fill it. They get a normal-looking
   *  success and nothing is stored. */
  if (text(formData, "website")) return { ok: true, reference: makeRef() };

  const values: Values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    location: text(formData, "location"),
    message: text(formData, "message"),
  };
  const cvEntry = formData.get("cv");
  const cv = cvEntry instanceof File ? cvEntry : null;

  const errors = validate(values, variant, cv);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please check the highlighted fields.", errors };
  }

  const payload = await getPayload({ config });
  const reference = makeRef();
  const data = {
    ...values,
    phone: values.phone.replace(/\D/g, ""),
    reference,
    status: "new" as const,
    source: text(formData, "source") || undefined,
  };

  try {
    if (variant === "enquire") {
      await payload.create({ collection: "enquiries", data, overrideAccess: true });
      return { ok: true, reference };
    }

    const extension = cv!.name.toLowerCase().match(/\.[a-z0-9]+$/)![0];
    /** The blob store is public, so the random tail keeps the file's URL
     *  from being guessed from the reference and name. */
    const filename = `${reference}-${slug(values.name)}-${randomBytes(8).toString("hex")}${extension}`;
    const upload = await payload.create({
      collection: "cvs",
      data: {},
      file: {
        data: Buffer.from(await cv!.arrayBuffer()),
        mimetype: cv!.type || "application/octet-stream",
        name: filename,
        size: cv!.size,
      },
      overrideAccess: true,
    });

    try {
      await payload.create({
        collection: "applications",
        data: {
          ...data,
          cv: upload.id,
          subject: text(formData, "subject") || undefined,
        },
        overrideAccess: true,
      });
    } catch (error) {
      await payload.delete({ collection: "cvs", id: upload.id, overrideAccess: true });
      throw error;
    }
    return { ok: true, reference };
  } catch (error) {
    payload.logger.error({ err: error, variant }, "Form submission failed");
    const fileRejected = (
      error as { data?: { errors?: { path?: string }[] } }
    ).data?.errors?.some((issue) => issue.path === "file");
    return fileRejected
      ? {
          ok: false,
          message: "We couldn't read that file. Please attach a PDF or Word document.",
          errors: { cv: "Attach a valid PDF or Word document" },
        }
      : { ok: false, message: "Something went wrong. Please try again in a moment." };
  }
}
