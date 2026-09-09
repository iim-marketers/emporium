import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { PostTile } from "@/components/news";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/sections";
import { blogPosts } from "@/lib/blog";
import { arrow } from "@/lib/btn";
import { pageMetadata } from "@/lib/seo";
import { sectionPad, surfaceWhite, wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Careers advice for aspiring cabin crew, ground staff, hotel and cruise professionals — interview preparation, industry news and the skills that get you hired.",
  path: "/blog",
  keywords: ["aviation blog", "cabin crew interview", "hospitality careers"],
});

/** The archive: every post, newest first, with room for the opening line. */
export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Reading for aspirants."
        lede="Interview preparation, industry news and career advice from the team that trains for aviation, hospitality and cruise line careers."
        crumbs={[{ label: "Blog" }]}
      />

      <section className={cn(surfaceWhite, sectionPad)}>
        <div className={cn(wrap, "grid gap-6")}>
          {blogPosts.length === 0 ? (
            <EmptyState
              title="No articles yet"
              body="Interview preparation, industry news and career advice from our trainers will appear here. Check back soon."
            />
          ) : null}

          {blogPosts.map((post) => (
            <Reveal
              key={post.slug}
              as="article"
              className={cn(
                "group relative grid grid-cols-[300px_1fr] items-center gap-8",
                "rounded-(--r) border border-hairline bg-white p-5",
                "transition-[transform,box-shadow] duration-250",
                "hover:-translate-y-1 hover:shadow-(--shadow)",
                "max-tablet:grid-cols-1 max-tablet:gap-5",
              )}
            >
              <div className="relative aspect-16/10 overflow-hidden rounded-[14px] bg-cloud">
                {post.image ? (
                  <ImageWithSkeleton
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 92vw, 300px"
                    className="object-cover"
                  />
                ) : (
                  <PostTile />
                )}
              </div>

              <div>
                <span className="font-mono text-[11px] tracking-[0.16em] text-crimson uppercase">
                  {post.date}
                </span>
                <h2 className="mt-2.5 text-[22px] leading-tight text-ink max-phablet:text-[19px]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                    target="_blank"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 line-clamp-3 max-w-[68ch] text-[15.5px] text-slate">
                  {post.excerpt}
                </p>
                <span className="mt-4.5 inline-flex items-center gap-2 font-heading text-[14.5px] font-semibold text-royal">
                  Read article <span className={arrow}>→</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
