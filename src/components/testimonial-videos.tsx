"use client";

import Image from "next/image";
import { PlayIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Marquee, MarqueeRow } from "@/components/marquee";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { testimonialVideos, type TestimonialVideo } from "@/lib/content";

/**
 * Student testimonials, as film.
 *
 * The row is a facade: it shows YouTube's own stills and loads none of
 * YouTube's player code until someone asks for a video. Picking a still opens
 * the single dialog below — one player for the whole row, rather than an
 * iframe per card — and closing it unmounts the iframe, which is what actually
 * stops playback.
 */
export function TestimonialGallery() {
  const [playing, setPlaying] = React.useState<TestimonialVideo | null>(null);

  return (
    <>
      <Marquee
        label="Films from students who trained at Emporium"
        className="gap-0"
      >
        <MarqueeRow duration="66s" gap="gap-5">
          {testimonialVideos.map((video) => (
            <TestimonialCard
              key={video.id}
              video={video}
              onPlay={() => setPlaying(video)}
            />
          ))}
        </MarqueeRow>
      </Marquee>

      <Dialog
        open={playing !== null}
        onOpenChange={(open) => {
          if (!open) setPlaying(null);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-[min(940px,calc(100%-2rem))] max-w-none gap-0 bg-transparent p-0 ring-0 sm:max-w-none"
        >
          {/* The film carries its own title on screen, so this only names the
              dialog for screen readers. */}
          <DialogTitle className="sr-only">
            {playing?.title ?? "Student testimonial"}
          </DialogTitle>

          <DialogClose
            className="ml-auto mb-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-[0_10px_30px_-15px_rgba(13,22,66,0.8)] transition-colors hover:bg-white"
            aria-label="Close video"
          >
            <XIcon className="size-4.5" />
          </DialogClose>

          {playing && (
            <div className="aspect-video overflow-hidden rounded-(--r) bg-black">
              <iframe
                /* Keyed so switching films remounts the player rather than
                   leaving the previous one to autoplay on. */
                key={playing.id}
                src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0&playsinline=1`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function TestimonialCard({
  video,
  onPlay,
}: {
  video: TestimonialVideo;
  onPlay: () => void;
}) {
  return (
    <figure className="w-[clamp(300px,28vw,400px)] flex-none overflow-hidden rounded-(--r) border border-hairline bg-white p-2.5 shadow-[0_10px_30px_-20px_rgba(13,22,66,0.5)]">
      <button
        type="button"
        onClick={onPlay}
        className="group/still relative block aspect-video w-full cursor-pointer overflow-hidden rounded-[10px] bg-cloud"
      >
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
          alt=""
          fill
          sizes="340px"
          className="object-cover transition-transform duration-500 group-hover/still:scale-105"
        />
        <span className="absolute inset-0 bg-ink/15 transition-colors group-hover/still:bg-ink/30" />

        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 scale-90 place-items-center rounded-full bg-white/95 opacity-0 shadow-[0_8px_24px_-10px_rgba(13,22,66,0.9)] transition duration-300 group-hover/still:scale-100 group-hover/still:opacity-100 group-focus-visible/still:scale-100 group-focus-visible/still:opacity-100 pointer-coarse:scale-100 pointer-coarse:opacity-100">
          <PlayIcon className="size-4.5 translate-x-px fill-royal text-royal" />
        </span>
        <span className="sr-only">Play “{video.title}”</span>
      </button>
    </figure>
  );
}
