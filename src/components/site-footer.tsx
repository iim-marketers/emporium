import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { footerNav, site } from "@/lib/site";
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
  return (
    <footer className="bg-[#080d2b] pt-8 lg:pt-16 pb-8 text-white">
      <div className={wrap}>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 border-b border-[var(--line-d)] pb-11 max-laptop:grid-cols-2 max-phone:grid-cols-1">
          <div>
            <BrandMark variant="light" />
            <p className="mt-4.5 max-w-[32ch] text-[15px] text-[#9aa6d6]">
              Training India&apos;s next generation for the world&apos;s biggest
              industries — aviation, hospitality and travel.
            </p>
            <div className="mt-5.5 flex gap-3">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-[38px] place-items-center rounded-[10px] border border-[var(--line-d)] text-haze transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.06] hover:text-white"
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
            <h4 className={footHeading}>Reach us</h4>
            <p className={footLink}>
              {site.address.line1},<br />
              {site.address.city}, {site.address.state}
            </p>
            <a href={site.phoneHref} className={cn(footLink, "font-mono")}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={footLink}>
              {site.email}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 pt-6.5 max-phablet:flex-col max-phablet:items-start">
          <p className="max-w-[70ch] text-[13px] text-[#6f7bae]">
            {site.disclaimer}
          </p>
          <span className="font-mono text-[12px] text-[#6f7bae]">
            © 2026 EMPORIUM · BUILDING A NEW NATION
          </span>
        </div>
      </div>
    </footer>
  );
}
