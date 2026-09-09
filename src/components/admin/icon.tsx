import Image from "next/image";

/** Replaces the Payload mark in the admin navigation header. */
export function EmporiumIcon() {
  return (
    <Image
      src="/images/logo-fin.png"
      alt=""
      width={172}
      height={109}
      aria-hidden="true"
      className="emporium-icon"
    />
  );
}
