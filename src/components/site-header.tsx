"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandMark } from "@/components/brand-mark";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { btn } from "@/lib/btn";
import { primaryNav, site } from "@/lib/site";

/** Underline grows from the left on hover and for the current section. */
const navLink = [
  "relative text-[15.5px] font-medium text-slate transition-colors duration-200",
  "hover:text-royal data-[active=true]:text-royal",
  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-crimson",
  "after:transition-[width] after:duration-[250ms]",
  "hover:after:w-full data-[active=true]:after:w-full",
  "max-wide:text-[15px]",
].join(" ");

const mobileNavLink =
  "block border-b border-hairline px-6 py-4 font-heading font-semibold text-royal";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-[rgba(255,255,255,0.86)] backdrop-blur-[14px] backdrop-saturate-[1.4] transition-transform duration-300">
      <div className="mx-auto flex h-18 w-[min(1180px,92vw)] items-center justify-between gap-3 max-mini:h-16">
        <BrandMark variant="dark" />

        <nav
          className="flex items-center gap-7.5 max-wide:gap-5 max-laptop:hidden"
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLink}
              data-active={isActive(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-3.5 max-mini:gap-1.5">
          <span className="text-[14px] text-slate max-navfit:hidden">
            Admissions <b className="font-mono text-royal">{site.phone}</b>
          </span>
          <Link href="/enquire" className={btn({ size: "sm" })}>
            Enquire
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            {/* 44px minimum: on phones the icon is all that is left of the nav */}
            <SheetTrigger
              className="hidden min-h-11 min-w-11 flex-none cursor-pointer flex-col items-center justify-center gap-1.25 border-0 bg-none p-2 max-laptop:flex max-mini:px-1 max-mini:py-2"
              aria-label="Menu"
            >
              <span className="h-0.5 w-6 bg-royal transition-all duration-300" />
              <span className="h-0.5 w-6 bg-royal transition-all duration-300" />
              <span className="h-0.5 w-6 bg-royal transition-all duration-300" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white p-0 gap-0">
              <SheetHeader className="border-b border-hairline px-6 py-5">
                <SheetTitle className="font-heading text-royal">
                  Menu
                </SheetTitle>
                <SheetDescription className="text-slate">
                  Programs, admissions and placement support.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={mobileNavLink}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/enquire"
                  className={mobileNavLink}
                  onClick={() => setOpen(false)}
                >
                  Enquire now
                </Link>
              </nav>
              <div className="mt-auto border-t border-hairline px-6 py-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-slate uppercase">
                  Admissions
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-1 block font-mono text-lg text-royal"
                >
                  {site.phone}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
