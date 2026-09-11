"use client";

import { Eye, EyeOff } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PASSWORD_INPUT_ID = "field-password";

function applyReveal(input: HTMLInputElement, revealed: boolean) {
  const native = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "type",
  );
  if (!native?.get || !native.set) return;

  if (!revealed) {
    delete (input as Partial<HTMLInputElement>).type;
    native.set.call(input, "password");
    return;
  }

  native.set.call(input, "text");
  Object.defineProperty(input, "type", {
    configurable: true,
    get: () => native.get!.call(input),
    set: () => {},
  });
}

export function EmporiumPasswordEye() {
  const [wrap, setWrap] = useState<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  const findWrap = useCallback((anchor: HTMLElement | null) => {
    setWrap(
      anchor
        ? (document.getElementById(PASSWORD_INPUT_ID)?.parentElement ?? null)
        : null,
    );
  }, []);

  useEffect(() => {
    const input = document.getElementById(PASSWORD_INPUT_ID);
    if (!(input instanceof HTMLInputElement)) return;

    applyReveal(input, revealed);
    return () => applyReveal(input, false);
  }, [revealed]);

  const Icon = revealed ? EyeOff : Eye;

  return (
    <>
      <span hidden ref={findWrap} />
      {wrap
        ? createPortal(
            <button
              aria-label={revealed ? "Hide password" : "Show password"}
              aria-pressed={revealed}
              className="em-password-eye"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setRevealed((shown) => !shown)}
              type="button"
            >
              <Icon aria-hidden="true" />
            </button>,
            wrap,
          )
        : null}
    </>
  );
}
