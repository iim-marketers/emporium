import Image from "next/image";

import { site } from "@/lib/site";

const LOCKUP = { w: 660, h: 270 };

/** Replaces the Payload wordmark on the login and create-first-user screens.
 *  Both lockups ship and CSS picks one, so the mark stays legible whichever
 *  theme the panel is set to. */
export function EmporiumLogo() {
  return (
    <div className="emporium-logo">
      <Image
        src="/images/logo-lockup.png"
        alt={`${site.name} — ${site.tagline}`}
        width={LOCKUP.w}
        height={LOCKUP.h}
        priority
        className="emporium-logo__mark emporium-logo__mark--on-light"
      />
      <Image
        src="/images/logo-lockup-inverse.png"
        alt={`${site.name} — ${site.tagline}`}
        width={LOCKUP.w}
        height={LOCKUP.h}
        priority
        className="emporium-logo__mark emporium-logo__mark--on-dark"
      />
      <span className="emporium-logo__caption">Content Studio</span>
    </div>
  );
}
