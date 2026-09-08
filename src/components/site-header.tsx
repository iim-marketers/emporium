"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  ConciergeBellIcon,
  GraduationCapIcon,
  PlaneIcon,
  ShipIcon,
  type LucideIcon,
} from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { ScrollLink } from "@/components/hash-scroll";
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

const panelSurface =
  "bg-[radial-gradient(900px_420px_at_86%_-12%,rgba(63,91,214,0.55),transparent_62%),radial-gradient(620px_380px_at_2%_104%,rgba(217,31,42,0.2),transparent_62%),linear-gradient(180deg,var(--navy)_0%,var(--navy-2)_55%,#0c1440_100%)]";

/** Desktop Courses menu: one course row, then the "all courses" footer link. */
const menuRow = [
  "group/row relative flex items-center gap-3.5 rounded-[12px] px-3 py-2.5",
  "transition-colors duration-200 hover:bg-cloud data-[active=true]:bg-cloud",
  /* Crimson tick on the current course, as on the mobile gate rows. */
  "before:absolute before:top-1/2 before:left-0 before:h-6 before:w-[3px]",
  "before:-translate-y-1/2 before:rounded-full before:bg-transparent",
  "data-[active=true]:before:bg-crimson",
].join(" ");

const menuIcon = [
  "grid size-9.5 flex-none place-items-center rounded-[11px]",
  "bg-cloud text-royal transition-colors duration-200",
  "group-hover/row:bg-royal group-hover/row:text-white",
  "group-data-[active=true]/row:bg-royal group-data-[active=true]/row:text-white",
].join(" ");

const menuFoot = [
  "mt-1 flex items-center justify-between gap-3 rounded-[12px] bg-paper px-3.5 py-3",
  "font-heading text-[13.5px] font-semibold text-royal",
  "transition-colors duration-200 hover:bg-cloud",
].join(" ");

/** Slides in from the left edge of the row on hover. */
const menuArrow = [
  "flex-none text-royal opacity-0 transition-[opacity,transform] duration-200",
  "-translate-x-1 group-hover/row:translate-x-0 group-hover/row:opacity-100",
  "motion-reduce:transition-none",
].join(" ");

/** A course reads faster with its own mark than as one more line of text. */
const courseIcons: Record<string, LucideIcon> = {
  "/programs/aviation": PlaneIcon,
  "/programs/hospitality": ConciergeBellIcon,
  "/programs/cruise": ShipIcon,
};

function CourseIcon({ href }: { href: string }) {
  const Icon = courseIcons[href] ?? GraduationCapIcon;
  return <Icon size={19} strokeWidth={1.6} aria-hidden="true" />;
}

/** One gate row: mono gate code, destination, chevron. */
const gateRow = [
  "group relative flex min-h-14 flex-1 items-center gap-4 py-3",
  "text-white transition-colors duration-200",
  "before:absolute before:top-1/2 before:-left-[4vw] before:h-8 before:w-[3px]",
  "before:-translate-y-1/2 before:rounded-full before:bg-transparent",
  "before:transition-colors before:duration-200",
  "data-[active=true]:before:bg-crimson",
].join(" ");

const gateCode = [
  "flex-none font-mono text-[11px] tracking-[0.2em] text-haze/70",
  "transition-colors duration-200",
  "group-data-[active=true]:text-crimson",
].join(" ");

const gateLabel = [
  "font-heading text-[18px] leading-none font-semibold tracking-[-0.01em]",
  "max-mini:text-[16px]",
].join(" ");

/** Nested course links inside the mobile panel. */
const gateSubLink = [
  "group flex min-h-10 items-center gap-3 pl-[24px]",
  "text-[15.5px] font-medium text-[#c2cdf0] transition-colors duration-200",
  "hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white",
].join(" ");

/** Gate codes read like a real board — 01, 02, … — rather than list indices. */
const gateNo = (index: number) => String(index + 1).padStart(2, "0");

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [courses, setCourses] = React.useState(false);
  /** Which mobile group is expanded, by href. Only one opens at a time. */
  const [group, setGroup] = React.useState<string | null>(null);
  const coursesRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  /** The group holding the current page, so the panel opens already unfolded. */
  const activeGroup =
    primaryNav.find((item) => item.children && isActive(item.href))?.href ??
    null;

  /** Navigating is the usual way out of the menu, so every link dismisses it. */
  const close = React.useCallback(() => {
    setOpen(false);
    setCourses(false);
  }, []);

  const toggleMenu = () => {
    if (!open) setGroup(activeGroup);
    setOpen(!open);
  };

  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setCourses(false);
  }

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
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

  /** Rows fan in one after another once the panel lands. */
  const stagger = (index: number) => ({
    transitionDelay: open ? `${110 + index * 45}ms` : "0ms",
  });
  const rowIn = [
    "transition-[opacity,transform] duration-[380ms] ease-out",
    "motion-reduce:transition-none",
  ].join(" ");

  return (
    <header className="sticky top-0 z-50 [--header-h:72px] max-mini:[--header-h:64px]">
      <div className="relative z-10 border-b border-hairline bg-[rgba(255,255,255,0.86)] backdrop-blur-[14px] backdrop-saturate-[1.4]">
        <div
          className={cn(
            wrap,
            "flex h-(--header-h) items-center justify-between gap-3",
          )}
        >
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
                      "absolute top-full left-1/2 z-20 w-91.5 -translate-x-1/2 pt-3",
                      "transition-[opacity,transform,visibility] duration-200 ease-out",
                      "motion-reduce:transition-none",
                      courses
                        ? "translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-[6.5px] left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-xs border-t border-l border-hairline bg-white"
                    />
                    <div className="relative rounded-[16px] border border-hairline bg-white p-1.5 shadow-(--shadow)">
                      {item.children.map((child: NavItem) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={close}
                          data-active={isActive(child.href)}
                          aria-current={
                            isActive(child.href) ? "page" : undefined
                          }
                          className={menuRow}
                        >
                          <span className={menuIcon}>
                            <CourseIcon href={child.href} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-heading text-[14.5px] font-semibold text-ink group-data-[active=true]/row:text-royal">
                              {child.label}
                            </span>
                            {child.blurb ? (
                              <span className="mt-0.5 block truncate text-[12.5px] text-slate">
                                {child.blurb}
                              </span>
                            ) : null}
                          </span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className={menuArrow}
                          >
                            <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                          </svg>
                        </Link>
                      ))}

                      <Link
                        href={item.href}
                        onClick={close}
                        className={cn(menuFoot, "group/row")}
                      >
                        All courses
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="flex-none transition-transform duration-200 group-hover/row:translate-x-1 motion-reduce:transition-none"
                        >
                          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                        </svg>
                      </Link>
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

          <div className="flex flex-none items-center gap-3.5 max-mini:gap-0.5">
            <a
              href={site.studentLogin}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] font-semibold text-slate transition-colors duration-200 hover:text-royal max-wide:hidden"
            >
              Student Login
            </a>
            {/* The form sits partway down /enquire, so the CTA aims at it. */}
            <ScrollLink
              href="/enquire"
              to="enquire"
              onClick={close}
              className={btn({ size: "sm" })}
            >
              Enquire
            </ScrollLink>

            <button
              ref={toggleRef}
              type="button"
              className="hidden min-h-11 min-w-11 flex-none cursor-pointer flex-col items-end justify-center gap-1.25 border-0 bg-none p-2 max-laptop:flex max-mini:px-1 max-mini:py-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={toggleMenu}
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
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-x-0 top-(--header-h) bottom-0 z-0 hidden max-laptop:block",
          "overflow-y-auto overscroll-contain",
          panelSurface,
          "border-t-2 border-crimson text-white",
          "transition-[opacity,transform,visibility] duration-300 ease-out",
          "motion-reduce:transition-none",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1.5 opacity-0",
        )}
      >
        <div className={cn(wrap, "flex min-h-full flex-col pt-0.5 pb-6")}>
          <nav aria-label="Mobile">
            {primaryNav.map((item, index) => {
              const expanded = group === item.href;

              return (
                <div
                  key={item.href}
                  className={cn(
                    "mx-[-4vw] border-b border-(--line-d) px-[4vw]",
                    rowIn,
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2.5 opacity-0",
                  )}
                  style={stagger(index + 1)}
                >
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={gateRow}
                      data-active={isActive(item.href)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={close}
                    >
                      <span className={gateCode}>{gateNo(index)}</span>
                      <span className={gateLabel}>{item.label}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={cn(
                          "ml-auto flex-none text-haze/50",
                          "transition-transform duration-200 group-hover:translate-x-1",
                          "motion-reduce:transition-none",
                          item.children && "hidden",
                        )}
                      >
                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                      </svg>
                    </Link>

                    {item.children ? (
                      <button
                        type="button"
                        className="-mr-2 flex min-h-11 min-w-11 flex-none cursor-pointer items-center justify-center rounded-full text-haze"
                        aria-expanded={expanded}
                        aria-controls={`gate-${gateNo(index)}`}
                        aria-label={`${expanded ? "Hide" : "Show"} ${item.label.toLowerCase()}`}
                        onClick={() => setGroup(expanded ? null : item.href)}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          aria-hidden="true"
                          className={cn(
                            "transition-transform duration-250 ease-out",
                            "motion-reduce:transition-none",
                            expanded && "rotate-180",
                          )}
                        >
                          <path d="M2.5 4.5 6 8l3.5-3.5" />
                        </svg>
                      </button>
                    ) : null}
                  </div>

                  {item.children ? (
                    <div
                      id={`gate-${gateNo(index)}`}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-out",
                        "motion-reduce:transition-none",
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={gateSubLink}
                              data-active={isActive(child.href)}
                              tabIndex={expanded ? undefined : -1}
                              onClick={close}
                            >
                              <span
                                className="h-px w-2.5 flex-none bg-haze/40 transition-[width] duration-200 group-hover:w-6"
                                aria-hidden="true"
                              />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Boarding-pass stub: the panel's one call to action, plus contact. */}
          <div
            className={cn(
              "mt-auto pt-6",
              rowIn,
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={stagger(primaryNav.length + 1)}
          >
            <div className="px-2">
              <Link
                href={site.studentLogin}
                scroll={false}
                onClick={close}
                className={btn({ size: "base", block: "always" })}
              >
                Student Login
              </Link>
            </div>

            <p className="mt-3.5 text-center font-mono text-[10px] tracking-[0.2em] text-haze/45 uppercase">
              {site.hours}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
