import { PolicyPage } from "@/components/policy-page";
import { cookiePolicy } from "@/lib/policies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "What cookies this site sets, what they are used for, the third-party cookies you may encounter, and how to disable them.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Cookie Policy"
      lede="What cookies we set, what they do, and how to turn them off."
      sections={cookiePolicy}
    />
  );
}
