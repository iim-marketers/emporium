"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

type ImageWithSkeletonProps = ImageProps & {
  /** Tweaks the placeholder — a lighter tint over dark sections, say. */
  skeletonClassName?: string;
  /** Only read for non-`fill` images, where we supply the sizing wrapper. */
  wrapperClassName?: string;
};

export function ImageWithSkeleton({
  className,
  skeletonClassName,
  wrapperClassName,
  onLoad,
  onError,
  ...props
}: ImageWithSkeletonProps) {
  const [settled, setSettled] = React.useState(false);

  const measure = React.useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) setSettled(true);
  }, []);

  const skeleton = settled ? null : (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[inherit] bg-skeleton",
        "text-white/75",
        skeletonClassName,
      )}
    >
      <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-current to-transparent motion-reduce:animate-none" />
    </span>
  );

  const image = (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...props}
      ref={measure}
      className={cn(props.fill ? undefined : "relative", className)}
      onLoad={(event) => {
        setSettled(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setSettled(true);
        onError?.(event);
      }}
    />
  );

  if (props.fill) {
    return (
      <>
        {skeleton}
        {image}
      </>
    );
  }

  return (
    <span className={cn("relative inline-flex", wrapperClassName)}>
      {skeleton}
      {image}
    </span>
  );
}
