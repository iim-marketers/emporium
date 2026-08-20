"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandMark } from "@/components/brand-mark";
import { scrollToId } from "@/components/hash-scroll";
import { btn } from "@/lib/btn";
import { primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLink = [
  "relative inline-flex flex-col items-center text-[14.5px] font-medium text-slate",
  "hover:text-royal",
  "max-wide:text-[15px]",
  "before:invisible before:h-0 before:overflow-hidden before:font-semibold",
  "before:content-[attr(data-label)]",
  "after:absolute after:-bottom-2 after:h-[2px] after:w-full after:rounded-full",
  "after:bg-transparent",
  "hover:after:bg-royal/35",
  "data-[active=true]:font-semibold data-[active=true]:text-royal",
  "data-[active=true]:after:bg-crimson",
].join(" ");

const panelLink = [
  "relative flex min-h-14 items-center gap-4 px-[4vw]",
  "font-heading text-[16.5px] font-semibold text-ink",
  "before:absolute before:top-1/2 before:left-0 before:h-7 before:w-[3px]",
  "before:-translate-y-1/2 before:rounded-full before:bg-transparent",
  "hover:text-royal",
  "data-[active=true]:bg-royal/[0.06] data-[active=true]:text-royal",
  "data-[active=true]:before:bg-crimson",
].join(" ");

/** The form sits partway down /enquire, so the CTA aims at it, not the page. */
const enquireHref = "/enquire#enquire";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /** Navigating is the usual way out of the menu, so every link dismisses it. */
  const close = React.useCallback(() => setOpen(false), []);

  /**
   * Already on /enquire there is nothing to navigate to — Next ignores the
   * click — so glide to the form here. From anywhere else the link navigates
   * with `scroll={false}` and <HashScroll> glides once the page has landed.
   */
  const onEnquire = (event: React.MouseEvent<HTMLAnchorElement>) => {
    close();

    const modified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (modified || event.button !== 0) return;
    if (pathname !== "/enquire") return;

    event.preventDefault();
    window.history.replaceState(null, "", enquireHref);
    scrollToId("enquire");
  };

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = () => desktop.matches && setOpen(false);

    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const panelItems = [...primaryNav, { label: "Enquire", href: enquireHref }];

  return (
    <header className="sticky top-0 z-50 [--header-h:72px] max-mini:[--header-h:64px]">
      <div className="relative z-10 border-b border-hairline bg-[rgba(255,255,255,0.86)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
        <div className="mx-auto flex h-(--header-h) w-[min(1180px,92vw)] items-center justify-between gap-3">
          <BrandMark variant="dark" preload onClick={close} />

          <nav
            className="flex items-center gap-7.5 max-wide:gap-5 max-laptop:hidden"
            aria-label="Primary"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLink}
                data-label={item.label}
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
            <Link
              href={enquireHref}
              scroll={false}
              onClick={onEnquire}
              className={btn({ size: "sm" })}
            >
              Enquire
            </Link>

            {/* 44px minimum: on phones the icon is all that is left of the nav */}
            <button
              type="button"
              className="hidden min-h-11 min-w-11 flex-none cursor-pointer flex-col items-center justify-center gap-1.25 border-0 bg-none p-2 max-laptop:flex max-mini:px-1 max-mini:py-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className={cn(
                  "h-0.5 w-6 origin-center rounded-full bg-royal",
                  "transition-transform duration-200 ease-out motion-reduce:transition-none",
                  open && "translate-y-1.75 rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 rounded-full bg-royal",
                  "transition duration-200 ease-out motion-reduce:transition-none",
                  open && "scale-x-0 opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 origin-center rounded-full bg-royal",
                  "transition-transform duration-200 ease-out motion-reduce:transition-none",
                  open && "-translate-y-1.75 -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "absolute inset-x-0 top-full z-10 hidden max-laptop:block",
          "border-b border-hairline bg-white shadow-[0_18px_30px_rgb(0_0_0/0.08)]",
          "transition-[opacity,transform,visibility] duration-200 ease-out",
          "motion-reduce:transition-none",
          open
            ? "translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav
          className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain"
          aria-label="Mobile"
        >
          {panelItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                panelLink,
                "border-b border-hairline last:border-b-0",
              )}
              data-active={isActive(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              scroll={item.href === enquireHref ? false : undefined}
              onClick={item.href === enquireHref ? onEnquire : close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Dimmed page behind the panel; tapping it is the quickest way out. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        className={cn(
          "fixed inset-x-0 top-(--header-h) bottom-0 hidden max-laptop:block",
          "bg-navy/35 backdrop-blur-[2px]",
          "transition-[opacity,visibility] duration-200 ease-out",
          "motion-reduce:transition-none",
          open ? "opacity-100" : "invisible opacity-0",
        )}
      />
    </header>
  );
}
