import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { Reveal } from "@/components/reveal";
import { NewsBody } from "@/components/rich-text";
import { EmptyState } from "@/components/sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate, postImage } from "@/lib/cms";
import type { Faq } from "@/lib/programs";
import { faqBody, faqItem, faqTrigger, heroSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { News, Post } from "@/payload-types";

export function NewsList({ items }: { items: News[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No news just yet"
        body="Announcements from Emporium and the wider industry land here. Check back soon."
      />
    );
  }

  return (
    <Accordion
      className="border-t border-hairline"
      // defaultValue={[String(items[0].id)]}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={String(item.id)}
          className={faqItem}
        >
          <AccordionTrigger
            className={cn(faqTrigger, "gap-6 text-[17px] leading-[1.35]")}
          >
            <span className="pr-4">{item.title}</span>
          </AccordionTrigger>
          <AccordionContent className={cn(faqBody)}>
            <NewsBody data={item.body} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function PostTile() {
  return (
    <div className={cn("grid h-full place-items-center", heroSurface)}>
      <span className="font-mono text-[11px] tracking-[0.24em] text-haze uppercase">
        Emporium · Blog
      </span>
    </div>
  );
}

function span(i: number, n: number) {
  const rest = n - 1;
  if (i === 0)
    return n === 1
      ? "col-span-4 row-span-2 max-laptop:col-span-2"
      : "col-span-2 row-span-2";
  const tablet =
    rest % 2 === 1 && i === n - 1
      ? "max-laptop:col-span-2 max-laptop:row-span-1"
      : "max-laptop:col-span-1 max-laptop:row-span-1";
  if (rest === 1) return cn("col-span-2 row-span-2", tablet);
  if (rest === 2 || (rest === 3 && i === 1)) return cn("col-span-2", tablet);
  return tablet;
}

function PostCard({
  post,
  lead = false,
  className,
}: {
  post: Post;
  lead?: boolean;
  className?: string;
}) {
  const image = postImage(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      target="_blank"
      className={cn(
        "group relative isolate block overflow-hidden rounded-(--r) bg-navy",
        className,
      )}
    >
      {image ? (
        <ImageWithSkeleton
          src={image.src}
          alt=""
          fill
          sizes={
            lead
              ? "(max-width: 640px) 80vw, (max-width: 960px) 92vw, 50vw"
              : "(max-width: 640px) 80vw, (max-width: 960px) 46vw, 25vw"
          }
          className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 -z-10">
          <PostTile />
        </div>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_30%,rgba(13,22,66,0.55)_60%,rgba(13,22,66,0.92)_100%)]"
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 text-white",
          lead ? "p-7 max-phablet:p-5" : "p-5",
        )}
      >
        <span className="font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
          {formatDate(post.publishedAt)}
        </span>
        <h3
          className={cn(
            "mt-2 leading-[1.25] font-medium text-white",
            lead
              ? "line-clamp-3 text-[clamp(21px,2.3vw,30px)] max-phablet:text-[19px]"
              : "line-clamp-2 text-[17px]",
          )}
        >
          {post.title}
        </h3>
        {lead && post.excerpt ? (
          <p className="mt-3 line-clamp-2 max-w-[56ch] text-[15px] text-white/75 max-phablet:hidden">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

const slide =
  "h-[380px] w-[78%] max-w-[320px] flex-none snap-start max-mini:h-[340px]";

export function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No articles yet"
        body="Interview preparation and career advice from our trainers will appear here. Check back soon."
      />
    );
  }

  const grid = posts.slice(0, 5);
  const slides = posts.slice(0, 3);

  return (
    <>
      <Reveal className="grid auto-rows-[250px] grid-cols-4 gap-4 max-laptop:auto-rows-[230px] max-laptop:grid-cols-2 max-phablet:hidden">
        {grid.map((post, i) => (
          <PostCard
            key={post.slug}
            post={post}
            lead={i === 0}
            className={span(i, grid.length)}
          />
        ))}
      </Reveal>

      <div className="-mx-[4vw] hidden snap-x snap-mandatory scroll-px-[4vw] gap-3 overflow-x-auto px-[4vw] pb-1 [scrollbar-width:none] max-phablet:flex">
        {slides.map((post, i) => (
          <PostCard
            key={post.slug}
            post={post}
            lead={i === 0}
            className={slide}
          />
        ))}
        {posts.length > slides.length ? (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/blog"
            className={cn(
              slide,
              "flex flex-col items-center justify-center gap-4 rounded-(--r) border border-hairline bg-white text-center",
            )}
          >
            <span className="grid size-14 place-items-center rounded-full bg-crimson text-white">
              <ArrowRightIcon className="size-5" />
            </span>
            <span className="text-[17px] font-semibold text-ink">
              Show more
            </span>
          </a>
        ) : null}
      </div>
    </>
  );
}

export function FaqList({ items }: { items: readonly Faq[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No questions listed yet"
        body="Ask us anything about this course and our counsellors will get back to you."
      />
    );
  }

  return (
    <Accordion className="border-t border-hairline">
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q} className={faqItem}>
          <AccordionTrigger className={cn(faqTrigger, "gap-6")}>
            <span className="pr-4">{item.q}</span>
          </AccordionTrigger>
          <AccordionContent className={cn(faqBody, "")}>
            <p className="text-[15px] text-justify">{item.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
