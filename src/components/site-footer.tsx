import Link from "next/link";

import { ApplyDialog } from "@/components/apply-dialog";
import { BrandMark } from "@/components/brand-mark";
import { footerNav, legalNav, site } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" />
    </>
  ),
  Facebook: (
    <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" />
    </>
  ),
};

const footLink =
  "mb-[11px] block text-[15px] text-[#aab4dd] transition-colors duration-200 hover:text-white";
const footHeading =
  "mb-4.5 font-mono text-[11px] tracking-[0.22em] text-haze uppercase";

export function SiteFooter() {
  const { address } = site;

  return (
    <footer className="bg-[#080d2b] pt-8 lg:pt-16 pb-8 text-white">
      <div className={wrap}>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-10 border-b border-(--line-d) pb-11 max-laptop:grid-cols-2 max-phone:grid-cols-1">
          <div>
            <BrandMark variant="light" />
            <p className="mt-4.5 max-w-[34ch] text-[15px] text-[#9aa6d6]">
              Certificate courses in Aviation, Hospitality &amp; Cruise line —
              training India&apos;s next generation for careers around the
              world.
            </p>
            <div className="mt-5.5 flex gap-3">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-9.5 place-items-center rounded-[10px] border border-(--line-d) text-haze transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/6 hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    {socialIcons[item.label]}
                  </svg>
                </a>
              ))}
            </div>
            <a
              href={site.brochure}
              target="_blank"
              rel="noreferrer"
              className="mt-5.5 inline-flex items-center gap-2 rounded-[999px] border border-(--line-d) px-4 py-2.5 font-heading text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-white/6"
            >
              Download Our Brochure
            </a>
          </div>

          {footerNav.map((column) => (
            <div key={column.heading}>
              <h4 className={footHeading}>{column.heading}</h4>
              {column.items.map((item) => (
                <Link key={item.href} href={item.href} className={footLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <h4 className={footHeading}>Corporate office</h4>
            <a
              href={address.mapHref}
              target="_blank"
              rel="noreferrer"
              className={footLink}
            >
              {address.line1},<br />
              {address.line2}, {address.city}
              <br />
              PIN: {address.pin}
            </a>
            <a href={site.phoneHref} className={cn(footLink, "font-mono")}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={footLink}>
              {site.email}
            </a>
            <p className="mb-2.75 text-[14px] text-[#7f8bbb]">{site.hours}</p>
            <ApplyDialog
              label="Apply Now"
              variant="ghost"
              size="sm"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-6.5 max-phablet:flex-col max-phablet:items-start">
          <p className="max-w-[70ch] text-[13px] text-[#6f7bae]">
            {site.disclaimer}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] text-[#6f7bae] transition-colors duration-200 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <span className="font-mono text-[12px] text-[#6f7bae]">
              {site.copyright}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
