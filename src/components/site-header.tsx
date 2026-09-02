"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandMark } from "@/components/brand-mark";
import { scrollToId } from "@/components/hash-scroll";
import { btn } from "@/lib/btn";
import { primaryNav, site, type NavItem } from "@/lib/site";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Underline grows from the left on hover and for the current section. */
const navLink = [
  "relative text-[14.5px] font-medium text-slate transition-colors duration-200",
  "hover:text-royal data-[active=true]:text-royal",
  "after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-crimson",
  "after:transition-[width] after:duration-[250ms]",
  "hover:after:w-full data-[active=true]:after:w-full",
  "max-wide:text-[15px]",
  "data-[active=true]:font-semibold",
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

/** Nested course links inside the mobile panel. */
const panelSubLink = [
  "relative flex min-h-12 items-center px-[4vw] pl-[7vw]",
  "text-[15.5px] font-medium text-slate",
  "hover:text-royal data-[active=true]:font-semibold data-[active=true]:text-royal",
].join(" ");

/** The form sits partway down /enquire, so the CTA aims at it, not the page. */
const enquireHref = "/enquire#enquire";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = React.useState(false);
  const coursesRef = React.useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /** Navigating is the usual way out of the menu, so every link dismisses it. */
  const close = React.useCallback(() => {
    setOpen(false);
    setCourses(false);
  }, []);

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

  /* The Courses menu closes on Escape and on any click outside it. */
  React.useEffect(() => {
    if (!courses) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCourses(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!coursesRef.current?.contains(event.target as Node))
        setCourses(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [courses]);

  return (
    <header className="sticky top-0 z-50 [--header-h:72px] max-mini:[--header-h:64px]">
      <div className="relative z-10 border-b border-hairline bg-[rgba(255,255,255,0.86)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
        <div className={cn(wrap, "flex h-(--header-h) items-center justify-between gap-3")}>
          <BrandMark variant="dark" preload onClick={close} />

          <nav
            className="flex items-center gap-7.5 max-wide:gap-5 max-laptop:hidden"
            aria-label="Primary"
          >
            {primaryNav.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  ref={coursesRef}
                  className="relative"
                  onPointerEnter={() => setCourses(true)}
                  onPointerLeave={() => setCourses(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      navLink,
                      "flex cursor-pointer items-center gap-1.5",
                    )}
                    data-active={isActive(item.href)}
                    aria-expanded={courses}
                    aria-haspopup="true"
                    onClick={() => setCourses((value) => !value)}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                      className={cn(
                        "transition-transform duration-200",
                        courses && "rotate-180",
                      )}
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" />
                    </svg>
                  </button>

                  <div
                    className={cn(
                      "absolute top-full left-1/2 z-20 -translate-x-1/2 pt-3",
                      "transition-[opacity,transform,visibility] duration-200 ease-out",
                      "motion-reduce:transition-none",
                      courses
                        ? "translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="min-w-56 overflow-hidden rounded-[14px] border border-hairline bg-white py-2 shadow-(--shadow)">
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block px-4.5 py-2.5 font-heading text-[14.5px] font-semibold text-royal hover:bg-cloud"
                      >
                        All courses
                      </Link>
                      <span className="my-1 block h-px bg-hairline" />
                      {item.children.map((child: NavItem) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={close}
                          data-active={isActive(child.href)}
                          className="block px-4.5 py-2.5 text-[14.5px] text-slate hover:bg-cloud hover:text-royal data-[active=true]:font-semibold data-[active=true]:text-royal"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLink}
                  data-active={isActive(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-none items-center gap-3.5 max-mini:gap-1.5">
            {/* <a
              href={site.phoneHref}
              className="font-mono text-[14px] text-royal max-navfit:hidden"
            >
              {site.phone}
            </a> */}
            <a
              href={site.studentLogin}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] font-semibold text-slate transition-colors duration-200 hover:text-royal max-wide:hidden"
            >
              Student Login
            </a>
            <Link
              href={enquireHref}
              scroll={false}
              onClick={onEnquire}
              className={btn({ size: "sm" })}
            >
              Enquire
            </Link>

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
          {primaryNav.map((item) => (
            <div key={item.href} className="border-b border-hairline">
              <Link
                href={item.href}
                className={panelLink}
                data-active={isActive(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={panelSubLink}
                  data-active={isActive(child.href)}
                  onClick={close}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}

          <Link
            href={enquireHref}
            className={cn(panelLink, "border-b border-hairline")}
            scroll={false}
            onClick={onEnquire}
          >
            Enquire
          </Link>
          <a
            href={site.studentLogin}
            target="_blank"
            rel="noreferrer"
            className={panelLink}
            onClick={close}
          >
            Student Login
          </a>
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
