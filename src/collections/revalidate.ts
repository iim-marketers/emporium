/** Guarded because the same hooks run from the seed script, outside any
 *  request scope, where `revalidatePath` throws. */
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
