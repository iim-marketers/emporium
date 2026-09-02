"use client";

import * as React from "react";

import { EnquiryForm } from "@/components/enquiry-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { btn, type BtnProps } from "@/lib/btn";
import { cn } from "@/lib/utils";

/**
 * "Apply Now" — the CV-upload form, in a modal.
 *
 * Mirrors the institute's own Apply popup: the same trigger appears on every job
 * drive and in the site footer, and opens one form that takes a CV.
 */
export function ApplyDialog({
  label = "Apply Now",
  /** Named so the confirmation can say what was applied for. */
  subject,
  variant = "primary",
  size,
  block,
  className,
}: {
  label?: string;
  subject?: string;
} & BtnProps & { className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(btn({ variant, size, block }), className)}>
        {label}
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-h-[calc(100dvh-2rem)] w-[min(560px,calc(100%-2rem))] max-w-none",
          "overflow-y-auto overscroll-contain bg-white p-0 sm:max-w-none",
        )}
      >
        <div className="px-6 pt-6 pb-1 max-phablet:px-4">
          <DialogTitle className="font-heading text-[24px] font-semibold text-ink">
            Apply Now
          </DialogTitle>
          <DialogDescription className="mt-1 text-[15px] text-slate">
            Upload your CV for upcoming Jobs!
          </DialogDescription>
        </div>

        <div className="px-6 pb-6 max-phablet:px-4">
          <EnquiryForm
            variant="apply"
            subject={subject}
            onDone={() => {
              /* leave the confirmation on screen; the visitor closes it */
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
