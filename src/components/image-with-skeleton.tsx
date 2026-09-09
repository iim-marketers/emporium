"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
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
    <Skeleton
      aria-hidden="true"
      className={cn("absolute inset-0 rounded-[inherit]", skeletonClassName)}
    />
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
