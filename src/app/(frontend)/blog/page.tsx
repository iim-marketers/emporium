import { PlainHero } from "@/components/page/kit";
import { PostCard } from "@/components/post-card";
import { EmptyState } from "@/components/sections";
import { getPosts } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { wrap } from "@/lib/styles";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Careers advice for aspiring cabin crew, ground staff, hotel and cruise professionals — interview preparation, industry news and the skills that get you hired.",
  path: "/blog",
  keywords: ["aviation blog", "cabin crew interview", "hospitality careers"],
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PlainHero
        label="Blog"
        title="Reading for aspirants."
        lede="Interview preparation, industry news and career advice from the team that trains for aviation, hospitality and cruise line careers."
      />

      <section className="bg-paper py-16 max-phablet:py-10">
        <div className={wrap}>
          {posts.length === 0 ? (
            <EmptyState
              title="No articles yet"
              body="Interview preparation, industry news and career advice from our trainers will appear here. Check back soon."
            />
          ) : (
            <div className="grid grid-cols-3 gap-6 max-laptop:grid-cols-2 max-phone:grid-cols-1">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} lead={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
