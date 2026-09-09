"use client";

import * as React from "react";

import { EnquiryForm } from "@/components/enquiry-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { btn, type BtnProps } from "@/lib/btn";
import { cn } from "@/lib/utils";

export function ApplyDialog({
  label = "Apply Now",
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
          "max-h-[calc(100dvh-2rem)] w-[min(560px,calc(100%-2rem))] max-w-none gap-0",
          "overflow-y-auto overscroll-contain bg-white p-0 sm:max-w-none",
        )}
      >
        <div className="px-6 pt-5 pb-4 max-phablet:px-4">
          <DialogTitle className="font-heading text-[21px] font-semibold text-ink">
            Apply Now
          </DialogTitle>
        </div>

        <div className="px-6 pb-6 max-phablet:px-4">
          <EnquiryForm
            variant="apply"
            surface="bare"
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
