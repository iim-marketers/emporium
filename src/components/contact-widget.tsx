"use client";

import { MessageCircleIcon, PhoneIcon, XIcon } from "lucide-react";
import * as React from "react";

import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Channel = {
  label: string;
  hint: string;
  href: string;
  /** WhatsApp opens a new tab; a tel: link must not. */
  external?: boolean;
  tint: string;
  icon: React.ReactNode;
};

/** Listed nearest-first: slot 0 sits just above the button. */
const channels: Channel[] = [
  {
    label: "Call us",
    hint: site.phone,
    href: site.phoneHref,
    tint: "bg-royal",
    icon: <PhoneIcon size={19} strokeWidth={1.9} aria-hidden="true" />,
  },
  {
    label: "WhatsApp",
    hint: site.whatsapp,
    href: site.whatsappHref,
    external: true,
    tint: "bg-[#25d366]",
    icon: <WhatsAppIcon size={21} />,
  },
];

const TOGGLE = 56;
const CHANNEL = 48;
const GAP = 10;
const INSET = (TOGGLE - CHANNEL) / 2;
const LIFT = TOGGLE + 12;

const slot = (index: number) => LIFT + index * (CHANNEL + GAP);

/** The pale pill that names a channel, sitting to the right of its button. */
const chip = [
  "pointer-events-none flex-none rounded-[999px] bg-white py-1.5 pr-3.5 pl-3",
  "font-heading text-[13px] font-semibold whitespace-nowrap text-ink",
  "shadow-[0_10px_24px_-12px_rgba(13,22,66,0.55)]",
].join(" ");

const spin = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const springOut = "ease-[cubic-bezier(0.34,1.4,0.64,1)]";

const iconSwap = [
  "col-start-1 row-start-1",
  "transition-[opacity,rotate,scale] duration-560",
  spin,
  "motion-reduce:transition-none",
].join(" ");

/**
 * The floating contact button, pinned to the bottom-left corner of every page.
 *
 */
export function ContactWidget() {
  const [open, setOpen] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  const toggle = () => {
    setTouched(true);
    setOpen((value) => !value);
  };

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "fixed left-6 z-40",
        "pointer-events-none",
        "bottom-[calc(--spacing(6)+env(safe-area-inset-bottom))]",
        "max-phablet:bottom-[calc(--spacing(4)+env(safe-area-inset-bottom))] max-phablet:left-4",
      )}
    >
      <ul
        id="contact-channels"
        className="pointer-events-none absolute inset-0 m-0 p-0"
        /* Hidden from the reader as well as the eye while it is folded away. */
        aria-hidden={!open}
      >
        {channels.map((channel, index) => (
          <li
            key={channel.label}
            className={cn(
              "absolute bottom-0 flex list-none items-center gap-2.5",
              "transition-[opacity,transform] motion-reduce:transition-none",
              open
                ? `opacity-100 duration-520 ${springOut}`
                : "opacity-0 duration-280 ease-in",
            )}
            style={{
              left: INSET,
              transformOrigin: `${CHANNEL / 2}px ${CHANNEL / 2}px`,
              transform: open
                ? `translateY(-${slot(index)}px) scale(1)`
                : "translateY(0) scale(0.35)",
              transitionDelay: open
                ? `${120 + index * 70}ms`
                : `${(channels.length - 1 - index) * 55}ms`,
            }}
          >
            <a
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noreferrer" : undefined}
              tabIndex={open ? undefined : -1}
              aria-label={`${channel.label} — ${channel.hint}`}
              className={cn(
                "grid size-12 flex-none place-items-center rounded-full text-white",
                open ? "pointer-events-auto" : "pointer-events-none",
                channel.tint,
                "shadow-[0_12px_26px_-10px_rgba(13,22,66,0.6)]",
                "transition-transform duration-200 hover:scale-110",
                "motion-reduce:transition-none",
              )}
            >
              {channel.icon}
            </a>
            <span
              className={cn(
                chip,
                "origin-left transition-[opacity,translate] motion-reduce:transition-none",
                open
                  ? `translate-x-0 opacity-100 duration-300 ${springOut}`
                  : "-translate-x-3 opacity-0 duration-150 ease-in",
              )}
              style={{
                transitionDelay: open ? `${300 + index * 70}ms` : "0ms",
              }}
            >
              {channel.label}
            </span>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="contact-channels"
        aria-label={open ? "Close contact options" : "Contact us"}
        className={cn(
          "group pointer-events-auto relative flex cursor-pointer items-center gap-2.5",
          "rounded-full border-0 bg-transparent p-0",
        )}
      >
        <span
          className={cn(
            "grid flex-none place-items-center rounded-full text-white",
            "size-14 shadow-[0_16px_34px_-12px_rgba(196,18,31,0.75)]",
            open ? "bg-crimson-deep" : "bg-crimson-deep",
            "transition-[scale,background-color] duration-560",
            spin,
            "group-hover:scale-105 group-active:scale-95",
            "motion-reduce:animate-none motion-reduce:transition-none",
            !open && !touched && "animate-waggle",
          )}
        >
          {/* A turn and a half out, half a turn in — the mark never just swaps. */}
          <MessageCircleIcon
            size={24}
            strokeWidth={1.9}
            aria-hidden="true"
            className={cn(
              iconSwap,
              open ? "rotate-540 scale-25 opacity-0" : "opacity-100",
            )}
          />
          <XIcon
            size={24}
            strokeWidth={2.1}
            aria-hidden="true"
            className={cn(
              iconSwap,
              open
                ? "rotate-180 opacity-100"
                : "-rotate-180 scale-25 opacity-0",
            )}
          />
        </span>

        {/* Hover-only, so it never sits permanently over the page on touch. */}
        <span
          className={cn(
            chip,
            "opacity-0 transition-opacity duration-200 max-laptop:hidden",
            "motion-reduce:transition-none",
            !open && "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          Contact us
        </span>
      </button>
    </div>
  );
}
