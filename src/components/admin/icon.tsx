import Image from "next/image";

import { site } from "@/lib/site";

const LOCKUP = { w: 660, h: 270 };

/** Replaces the Payload mark in the admin header. Both lockups ship and CSS
 *  picks one, so the wordmark stays legible whichever theme the panel is set
 *  to. It also gives the header's home link an accessible name, which the
 *  decorative tail fin it replaced did not. */
export function EmporiumIcon() {
  return (
    <>
      <Image
        src="/images/logo-lockup.png"
        alt={site.name}
        width={LOCKUP.w}
        height={LOCKUP.h}
        priority
        className="emporium-icon emporium-icon--on-light"
      />
      <Image
        src="/images/logo-lockup-inverse.png"
        alt={site.name}
        width={LOCKUP.w}
        height={LOCKUP.h}
        priority
        className="emporium-icon emporium-icon--on-dark"
      />
    </>
  );
}
