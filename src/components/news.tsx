import Image from "next/image";

import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { blogPosts, news } from "@/lib/content";
import type { Faq } from "@/lib/programs";
import { faqBody, faqItem, faqTrigger } from "@/lib/styles";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Latest news                                                                */
/* -------------------------------------------------------------------------- */

/** Long press releases, collapsed — the first one opens by default. */
export function NewsList() {
  return (
    <Accordion
      className="border-t border-hairline"
      // defaultValue={[news[0].title]}
    >
      {news.map((item) => (
        <AccordionItem key={item.title} value={item.title} className={faqItem}>
          <AccordionTrigger
            className={cn(faqTrigger, "gap-6 text-[17px] leading-[1.35]")}
          >
            <span className="pr-4">
              {item.title}
              {item.date ? (
                <span className="mt-1.5 block font-mono text-[12px] font-normal tracking-[0.12em] text-crimson uppercase">
                  {item.date}
                </span>
              ) : null}
            </span>
          </AccordionTrigger>
          <AccordionContent className={cn(faqBody)}>
            {item.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-justify font-medium"
              >
                {paragraph}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* -------------------------------------------------------------------------- */
/*  Latest blog                                                                */
/* -------------------------------------------------------------------------- */

export function BlogGrid() {
  return (
    <div className="grid grid-cols-4 gap-5.5 max-laptop:grid-cols-2 max-phone:grid-cols-1">
      {blogPosts.map((post) => (
        <Reveal
          key={post.href}
          as="article"
          className="group flex flex-col overflow-hidden rounded-(--r) border border-hairline bg-white transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-(--shadow)"
        >
          <div className="relative aspect-16/10 bg-cloud">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 560px) 92vw, (max-width: 960px) 45vw, 23vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col px-5.5 py-5">
            <span className="font-mono text-[11px] tracking-[0.16em] text-crimson uppercase">
              {post.date}
            </span>
            <h3 className="mt-2.5 text-[17px] leading-[1.3] text-ink">
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="after:absolute after:inset-0 after:content-['']"
              >
                {post.title}
              </a>
            </h3>
            <p className="mt-2.5 text-[14.5px] text-slate">{post.excerpt}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ accordion — shared by the three course pages                           */
/* -------------------------------------------------------------------------- */

export function FaqList({ items }: { items: readonly Faq[] }) {
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
