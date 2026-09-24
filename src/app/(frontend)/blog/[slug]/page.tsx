import Link from "next/link";
import { notFound } from "next/navigation";

import { pageBand, pageLabel } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArticleBody } from "@/components/rich-text";
import { formatDate, getPostBySlug, getPostSlugs, postImage } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

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

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const date = formatDate(post.publishedAt);

  return (
    <>
      <PageHero
        eyebrow={`Blog · ${date}`}
        title={post.title}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: "Article" }]}
        image={postImage(post)?.src}
        compact
      />

      <section className={cn(pageBand, "bg-white")}>
        <div
          className={cn(
            wrap,
            "grid grid-cols-[200px_minmax(0,1fr)] items-start gap-16",
            "max-laptop:grid-cols-1 max-laptop:gap-8",
          )}
        >
          <aside className="grid gap-6 border-t border-ink/80 pt-5 laptop:sticky laptop:top-28 max-laptop:flex max-laptop:flex-wrap max-laptop:items-center max-laptop:justify-between">
            <div>
              <p className={cn(pageLabel, "text-[10px] text-slate/70")}>
                Published
              </p>
              <p className="mt-1.5 text-[15px] font-semibold text-ink">
                {date}
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-royal hover:text-crimson"
            >
              <span aria-hidden="true">←</span> All posts
            </Link>
          </aside>

          <Reveal as="article" className="max-w-190">
            <ArticleBody data={post.content} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
