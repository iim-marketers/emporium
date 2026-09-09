/**
 * Publishing writes to Postgres, but the public pages are prerendered, so a
 * saved document has to invalidate the routes that print it. Calls are guarded
 * because the same hooks run from the seed script, outside any request scope.
 */
import { revalidatePath } from "next/cache";
import type { Payload } from "payload";

export function revalidate(paths: string[], payload?: Payload) {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch (error) {
      payload?.logger.warn(
        { err: error, path },
        "Skipped revalidation outside a request scope",
      );
    }
  }
}
