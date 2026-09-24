import Link from "next/link";
import { notFound } from "next/navigation";

import { PlainHero } from "@/components/page/kit";
import { PostCard } from "@/components/post-card";
import { ArticleBody } from "@/components/rich-text";
import {
  formatDate,
  getPostBySlug,
  getPostSlugs,
  getPosts,
  postImage,
} from "@/lib/cms";
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
  const [post, posts] = await Promise.all([getPostBySlug(slug), getPosts(4)]);

  if (!post) notFound();

  const image = postImage(post);
  const more = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PlainHero
        narrow
        label={
          <Link href="/blog" className="transition-colors hover:text-white">
            ← Blog
          </Link>
        }
        title={post.title}
        image={image?.src}
      >
        <p className="mt-5 font-mono text-[12px] tracking-[0.16em] text-white/60 uppercase">
          {formatDate(post.publishedAt)}
        </p>
      </PlainHero>

      <section className="bg-white pb-20 max-phablet:pb-12">
        <div className={cn(wrap)}>
          <article className="pt-12">
            <ArticleBody data={post.content} />
          </article>
        </div>
      </section>
    </>
  );
}
