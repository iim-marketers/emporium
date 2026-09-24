import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { PostTile } from "@/components/news";
import { Accent, PageHead, pageBand, pageLabel } from "@/components/page/kit";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { EmptyState } from "@/components/sections";
import { arrow } from "@/lib/btn";
import { formatDate, getPosts, postImage } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { Post } from "@/payload-types";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Careers advice for aspiring cabin crew, ground staff, hotel and cruise professionals — interview preparation, industry news and the skills that get you hired.",
  path: "/blog",
  keywords: ["aviation blog", "cabin crew interview", "hospitality careers"],
});

function Cover({ post, sizes }: { post: Post; sizes: string }) {
  const image = postImage(post);
  return image ? (
    <ImageWithSkeleton
      src={image.src}
      alt=""
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
    />
  ) : (
    <PostTile />
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <Reveal
      as="article"
      className="group relative grid grid-cols-[1.25fr_1fr] overflow-hidden rounded-[6px] bg-navy text-white max-laptop:grid-cols-1"
    >
      <div className="relative min-h-90 bg-navy-2 max-laptop:aspect-video max-laptop:min-h-0">
        <Cover post={post} sizes="(max-width: 960px) 92vw, 55vw" />
      </div>
      <div className="flex flex-col justify-center px-11 py-12 max-laptop:px-7 max-laptop:py-9 max-phablet:px-5">
        <p
          className={cn(
            pageLabel,
            "flex items-center gap-3 text-[10px] text-haze",
          )}
        >
          <span aria-hidden="true" className="size-1.5 bg-crimson" />
          Latest · {formatDate(post.publishedAt)}
        </p>
        <h2 className="mt-5 font-hero text-[clamp(28px,3vw,42px)] leading-[1.08] font-normal tracking-[-0.01em]">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? (
          <p className="mt-4 line-clamp-3 text-[15.5px] leading-relaxed text-white/70">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-white">
          Read article <span className={arrow}>→</span>
        </span>
      </div>
    </Reveal>
  );
}

function PostCard({ post, no }: { post: Post; no: number }) {
  return (
    <Reveal
      as="article"
      className="group relative flex flex-col border-t border-ink/80 pt-5"
    >
      <div className="flex items-center justify-between">
        <span className={cn(pageLabel, "text-[10px] text-crimson")}>
          {formatDate(post.publishedAt)}
        </span>
        <span className="font-mono text-[11px] text-slate/60">
          {String(no).padStart(2, "0")}
        </span>
      </div>
      <div className="relative mt-4 aspect-16/10 overflow-hidden rounded-[6px] bg-cloud">
        <Cover
          post={post}
          sizes="(max-width: 560px) 92vw, (max-width: 960px) 46vw, 30vw"
        />
      </div>
      <h3 className="mt-5 line-clamp-2 font-sans text-[19px] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-royal">
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          className="after:absolute after:inset-0 after:content-['']"
        >
          {post.title}
        </Link>
      </h3>
      {post.excerpt ? (
        <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-relaxed text-slate">
          {post.excerpt}
        </p>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-royal">
        Read <span className={arrow}>→</span>
      </span>
    </Reveal>
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Reading for <Accent onDark>aspirants.</Accent>
          </>
        }
        lede="Interview preparation, industry news and career advice from the team that trains for aviation, hospitality and cruise line careers."
        image="/home/photos/seminar-hall.webp"
      />

      <section className={cn(pageBand, "bg-white")}>
        <div className={wrap}>
          {lead ? (
            <FeaturedPost post={lead} />
          ) : (
            <EmptyState
              title="No articles yet"
              body="Interview preparation, industry news and career advice from our trainers will appear here. Check back soon."
            />
          )}

          {rest.length > 0 ? (
            <>
              <PageHead
                eyebrow="More to read"
                title={
                  <>
                    From the <Accent>training floor.</Accent>
                  </>
                }
                className="mt-20 max-laptop:mt-14"
              />
              <div className="grid grid-cols-3 gap-x-8 gap-y-14 max-laptop:grid-cols-2 max-phone:grid-cols-1 max-phone:gap-y-10">
                {rest.map((post, i) => (
                  <PostCard key={post.slug} post={post} no={i + 2} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
