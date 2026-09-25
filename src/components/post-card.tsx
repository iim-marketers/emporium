import Link from "next/link";

import { ImageWithSkeleton } from "@/components/image-with-skeleton";
import { PostTile } from "@/components/news";
import { pageLabel } from "@/components/page/kit";
import { Reveal } from "@/components/reveal";
import { arrow } from "@/lib/btn";
import { formatDate, postImage } from "@/lib/cms";
import { cn } from "@/lib/utils";
import type { Post } from "@/payload-types";

export function PostCard({
  post,
  lead = false,
}: {
  post: Post;
  lead?: boolean;
}) {
  const image = postImage(post);

  return (
    <Reveal
      as="article"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[8px] border border-hairline bg-white transition-shadow duration-300 hover:shadow-(--shadow)",
        lead && "laptop:col-span-2 laptop:grid laptop:grid-cols-[1.2fr_1fr]",
      )}
    >
      <div
        className={cn(
          "relative aspect-16/10 overflow-hidden bg-cloud",
          lead && "laptop:aspect-auto laptop:min-h-80",
        )}
      >
        {image ? (
          <ImageWithSkeleton
            src={image.src}
            alt=""
            fill
            sizes={
              lead
                ? "(max-width: 960px) 92vw, 40vw"
                : "(max-width: 560px) 92vw, (max-width: 960px) 46vw, 30vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <PostTile />
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col p-6 max-phablet:p-5",
          lead && "laptop:justify-center laptop:p-9",
        )}
      >
        <p className={cn(pageLabel, "text-[10px] text-crimson")}>
          {formatDate(post.publishedAt)}
        </p>
        <h2
          className={cn(
            "mt-3 font-sans leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-royal",
            lead ? "text-[clamp(20px,2vw,26px)]" : "line-clamp-2 text-[18px]",
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt ? (
          <p
            className={cn(
              "mt-3 text-[14.5px] leading-relaxed text-slate",
              lead ? "line-clamp-4" : "line-clamp-3",
            )}
          >
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold text-royal">
          Read article <span className={arrow}>→</span>
        </span>
      </div>
    </Reveal>
  );
}
