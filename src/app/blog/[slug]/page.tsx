import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { blogPosts, postBySlug, type BlogBlock } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import {
  checklist,
  checklistItem,
  checklistTick,
  proseBody,
  sectionPad,
  surfaceWhite,
  wrap,
} from "@/lib/styles";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) {
    return pageMetadata({
      title: "Post not found",
      description: "This article is no longer part of the Emporium blog.",
      path: `/blog/${slug}`,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

/** Renders the `**bold**` and `*italic*` runs the posts were published with. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
        if (part.startsWith("**"))
          return (
            <strong key={index} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        if (part.startsWith("*"))
          return (
            <em key={index} className="text-ink">
              {part.slice(1, -1)}
            </em>
          );
        return part;
      })}
    </>
  );
}

/** One block of article content, in the order it was published. */
function Block({ block }: { block: BlogBlock }) {
  if (block.kind === "heading") {
    return block.level === 2 ? (
      <h2 className="mt-6 text-[26px] leading-[1.2] text-ink max-phablet:mt-9 max-phablet:text-[22px]">
        {block.text}
      </h2>
    ) : (
      <h3 className="mt-8 text-[19px] leading-tight text-royal">
        {block.text}
      </h3>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className={cn(checklist, "mt-5")}>
        {block.items.map((item) => (
          <li key={item} className={checklistItem}>
            <span className={checklistTick}>✓</span> <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={cn(proseBody, "mt-3")}>
      <RichText text={block.text} />
    </p>
  );
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = postBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow="Blog" title={post.title} crumbs={[{ label: "Blog" }]}>
        <p className="mt-5 font-mono text-[12px] tracking-[0.16em] text-haze uppercase">
          {post.date}
        </p>
      </PageHero>

      <section className={cn(surfaceWhite, sectionPad, "pt-8!")}>
        <div className={wrap}>
          <Reveal as="article" className="mx-auto">
            {post.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}

            <Link
              href="/blog"
              className="mt-12 inline-flex items-center gap-2 font-heading text-[15px] font-semibold text-royal hover:text-crimson"
            >
              <span aria-hidden="true">←</span> All posts
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
