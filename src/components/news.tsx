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

export function BlogGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No articles yet"
        body="Interview preparation and career advice from our trainers will appear here. Check back soon."
      />
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5.5 max-laptop:grid-cols-2 max-phone:grid-cols-1">
      {posts.map((post) => {
        const image = postImage(post);

        return (
          <Reveal
            key={post.slug}
            as="article"
            className="group max-h-150 flex flex-col overflow-hidden rounded-(--r) border border-hairline bg-white transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
          >
            <div className="relative aspect-16/10 bg-cloud">
              {image ? (
                <ImageWithSkeleton
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 23vw"
                  className="object-cover"
                />
              ) : (
                <PostTile />
              )}
            </div>
            <div className="flex flex-1 flex-col px-5.5 py-5">
              <span className="font-mono text-[11px] tracking-[0.16em] text-crimson uppercase">
                {formatDate(post.publishedAt)}
              </span>
              <h3 className="mt-2.5 text-[17px] leading-[1.3] text-ink">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                  target="_blank"
                >
                  {post.title}
                </Link>
              </h3>
            </div>
          </Reveal>
        );
      })}
    </div>
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
