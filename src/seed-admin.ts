/** Runs on every Payload boot. Rehashes only when ADMIN_PASSWORD changes,
 *  tracked by a digest so there is no stored password to compare against. */
import { createHash } from "crypto";
import type { Payload } from "payload";

export async function seedAdmin(payload: Payload) {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    payload.logger.warn(
      "ADMIN_EMAIL and ADMIN_PASSWORD are unset, so no admin account was created.",
    );
    return;
  }

  const envPasswordDigest = createHash("sha256").update(password).digest("hex");
  const existing = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: email } },
  });
  const account = existing.docs[0];

  if (!account) {
    await payload.create({
      collection: "users",
      data: { email, password, envPasswordDigest },
      overrideAccess: true,
    });
    payload.logger.info(`Created the admin account for ${email}.`);
    return;
  }

  if (account.envPasswordDigest !== envPasswordDigest) {
    await payload.update({
      collection: "users",
      id: account.id,
      data: { password, envPasswordDigest },
      overrideAccess: true,
    });
    payload.logger.info(`Updated the admin password for ${email}.`);
  }
}
