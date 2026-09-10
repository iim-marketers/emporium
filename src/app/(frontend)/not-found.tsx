import { NotFoundPanel } from "@/components/not-found-panel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "This route is not on the Emporium departure board.",
  path: "/404",
});

export default function NotFound() {
  return <NotFoundPanel />;
}
