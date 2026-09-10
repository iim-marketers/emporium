import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ArticleBody } from "@/components/rich-text";
import { formatDate, getPostBySlug, getPostSlugs } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { sectionPad, surfaceWhite, wrap } from "@/lib/styles";
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

  return (
    <>
      <PageHero eyebrow="Blog" title={post.title} crumbs={[{ label: "Blog" }]}>
        <p className="mt-5 font-mono text-[12px] tracking-[0.16em] text-haze uppercase">
          {formatDate(post.publishedAt)}
        </p>
      </PageHero>

      <section className={cn(surfaceWhite, sectionPad, "pt-8!")}>
        <div className={wrap}>
          <Reveal as="article" className="mx-auto">
            <ArticleBody data={post.content} />

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
